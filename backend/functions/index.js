/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
admin.initializeApp();

require("dotenv").config();


const reportVerificationThreshold = 30;

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}


const { onDocumentCreated } = require("firebase-functions/v2/firestore");
exports.handleVote = onDocumentCreated("votes/{voteId}", async (event) => {
  const voteSnap = event.data;
  const vote = voteSnap.data();
  const reportId = vote.reportId;
  const userId = vote.userId;
  const voteValue = vote.vote;
  const voterLocation = vote.voterLocation;

  if (!reportId || !userId || voteValue === undefined) {
    logger.error("Invalid vote data:", vote);
    return null;
  }

  try {
    const reportRef = admin.firestore().collection("reports").doc(reportId);
    const reportSnap = await reportRef.get();

    if (!reportSnap.exists) {
      logger.error("Report not found:", reportId);
      return null;
    }

    const reportData = reportSnap.data();
    let currentCredibility = reportData.credibilityScore || 0;
    const voteCount = reportData.votes || 0;
    const reportLocation = reportData.location;
    const reportTimestamp = reportData.timestamp;

    const kmDistance = Math.abs(distanceInKmBetweenEarthCoordinates(voterLocation.latitude, voterLocation.longitude, reportLocation.latitude, reportLocation.longitude));
    const proximityWeight = 1 / (1 + kmDistance);
    const now = new Date().getTime();
    const reportPostDate = reportTimestamp.toDate();
    const hoursSinceReport = (now - reportPostDate) / (1000 * 60 * 60);
    const temporalDecay = Math.exp(-0.1 * hoursSinceReport); // Older reports decay


    // Fetch user data to weigh the vote
    const userRef = admin.firestore().collection("users").doc(userId);
    const userSnap = await userRef.get();
    const userData = userSnap.data();
    const voterCredibility = userData?.reputation || 0.5; // Default to 0.5 if user has no credibility


    // Simple algorithm: weighted vote
    const weightedVote = voteValue * voterCredibility * proximityWeight * temporalDecay;
    const newCredibility = currentCredibility + weightedVote;
    const newVoteCount = voteCount + voteValue; // will decrement by 1 or increment by 1 depending on if it's an upvote or downvote

    await reportRef.update({
      credibility: newCredibility,
      voteCount: newVoteCount,
      verified: newVoteCount >= reportVerificationThreshold,
    });

    logger.log(`Report ${reportId} credibility updated to ${newCredibility} by user ${userId}`);
    return null;

  } catch (error) {
    logger.error("Error handling vote:", error);
    return null;
  }

  
});

const VOICEFLOW_API_URL = "https://api.voiceflow.com/v1/knowledge-base/docs/upload";
const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;


exports.syncVerifiedReportsToVoiceflow = onDocumentUpdated(
  "reports/{reportId}",
  async (event) => {
    const report = event.data.after.data();

    // Only process verified reports
    if (!report.verified) return;

    // Prepare the report content as a text file
    const reportContent = `
      Report: ${report.text}
      Location: Latitude ${report.location.latitude}, Longitude ${report.location.longitude}
      Timestamp: ${report.timestamp.toDate().toISOString()}
      Credibility Score: ${report.credibilityScore}
    `;

    // Create a temporary text file
    const filePath = `/tmp/report_${event.params.reportId}.txt`;
    fs.writeFileSync(filePath, reportContent);

    // Prepare form-data for Voiceflow API
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath), {
      filename: `report_${event.params.reportId}.txt`,
      contentType: "text/plain",
    });

    // Upload to Voiceflow Knowledge Base
    try {
      const response = await axios.post(VOICEFLOW_API_URL, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: VOICEFLOW_API_KEY,
        },
        params: {
          maxChunkSize: 1000, // Adjust chunk size as needed
          overwrite: true, // Overwrite existing documents with the same name
        },
      });

      logger.log("Report uploaded to Voiceflow:", response.data);
    } catch (error) {
      logger.error("Error uploading report to Voiceflow:", error.response?.data || error.message);
    } finally {
      // Clean up the temporary file
      fs.unlinkSync(filePath);
    }
  }
);