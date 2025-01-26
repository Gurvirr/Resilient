"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Add these styles to ensure the map container is visible and centered
const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative",
  zIndex: 0,
  margin: "0 auto",  // Center the map horizontally
  display: "flex",   // Use flexbox
  justifyContent: "center", // Center horizontally
  alignItems: "center"      // Center vertically
};

// Initialize leaflet map icons
const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

function Map() {
  const [reports, setReports] = useState([
    { id: 1, lat: 34.0522, lng: -118.2437, description: "Fire spotted in this area" },
    { id: 2, lat: 34.0622, lng: -118.2537, description: "Road blocked due to fallen trees" },
  ]);
  const [newReport, setNewReport] = useState({ lat: "", lng: "", description: "" });

  useEffect(() => {
    // Fix for map container not being properly sized
    window.dispatchEvent(new Event('resize'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lat = Number.parseFloat(newReport.lat);
    const lng = Number.parseFloat(newReport.lng);
    if (isNaN(lat) || isNaN(lng) || !newReport.description) return;

    setReports([...reports, { id: reports.length + 1, lat, lng, description: newReport.description }]);
    setNewReport({ lat: "", lng: "", description: "" });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mx-auto max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Report Map</h2>
      <div style={{ height: "400px", width: "100%" }}>
        <MapContainer 
          center={[34.0522, -118.2437]} 
          zoom={13} 
          style={mapStyles}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {reports.map((report) => (
            <Marker 
              key={report.id} 
              position={[report.lat, report.lng]}
              icon={icon}
            >
              <Popup>{report.description}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2 mt-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newReport.lat}
            onChange={(e) => setNewReport({ ...newReport, lat: e.target.value })}
            className="flex-grow p-2 border rounded"
            placeholder="Latitude"
          />
          <input
            type="text"
            value={newReport.lng}
            onChange={(e) => setNewReport({ ...newReport, lng: e.target.value })}
            className="flex-grow p-2 border rounded"
            placeholder="Longitude"
          />
        </div>
        <input
          type="text"
          value={newReport.description}
          onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Report
        </button>
      </form>
    </div>
  );
}

export default Map;
