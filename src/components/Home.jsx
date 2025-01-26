import React, { useState } from 'react';

function Home() {
  const reports = [
    { location: "Downtown", report: "Fire spotted near Downtown. Stay cautious!" },
    { location: "Maple Street", report: "Flooding reported on Maple Street. Avoid if possible." },
    { location: "Central Park", report: "Air quality is poor in Central Park. Consider wearing a mask." },
    { location: "Westside", report: "Power outage in Westside." },
    { location: "Hillside Road", report: "Road blocked due to landslide at Hillside Road." },
    { location: "Route 66", report: "Heavy snowfall causing road closures on Route 66." },
    { location: "Green Valley", report: "Earthquake felt in Green Valley. Check for updates!" },
    { location: "East Lake", report: "Tornado sighted near East Lake. Seek shelter immediately!" },
    { location: "Sunset Trail", report: "Wildlife spotted near Sunset Trail. Stay safe!" },
    { location: "City Center", report: "Extreme heat warning in City Center. Stay hydrated!" },
    { location: "Windy Avenue", report: "Strong winds causing debris in Windy Avenue. Drive carefully." },
    { location: "Northside", report: "Hailstorm reported in Northside." },
    { location: "Riverbank", report: "Water contamination advisory for Riverbank." },
    { location: "Bayview", report: "Evacuation recommended for Bayview due to flooding." },
    { location: "Forest Ridge", report: "Smoke from wildfires affecting Forest Ridge. Air quality hazardous." }
  ];

  const [currentReportIndex, setCurrentReportIndex] = useState(0);

  const handleNextReport = () => {
    setCurrentReportIndex((prevIndex) => 
      prevIndex === reports.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousReport = () => {
    setCurrentReportIndex((prevIndex) => 
      prevIndex === 0 ? reports.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="new-rectangle">
        <p className="recent-reports-title">RECENT REPORTS</p>
        <div className="custom-rectangle">
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            {reports[currentReportIndex].location}
          </div>
          {reports[currentReportIndex].report}
        </div>
        <div className="additional-box">
          <button className="icon previous-icon" onClick={handlePreviousReport}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M15 7.5L7.5 15L15 22.5" stroke="#F8F8F8" stroke-width="2.5" />
              <path d="M22.5 7.5L15 15L22.5 22.5" stroke="#F8F8F8" stroke-width="2.5" />
            </svg>
          </button>
          <button className="icon thumbs-up-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M17.3958 36.4583H11.4583C10.3077 36.4583 9.375 35.5256 9.375 34.375V23.9583C9.375 22.8077 10.3077 21.875 11.4583 21.875H17.3958C17.5684 21.875 17.7083 22.0149 17.7083 22.1875V36.1458C17.7083 36.3184 17.5684 36.4583 17.3958 36.4583Z" stroke="#F8F8F8" stroke-width="2.08333" stroke-linecap="round" />
              <path d="M17.7083 23.9583L21.6551 16.0649C21.7997 15.7756 21.875 15.4566 21.875 15.1332V11.4583C21.875 10.3077 22.8078 9.375 23.9583 9.375V9.375C26.2595 9.375 28.125 11.2405 28.125 13.5417V21.875" stroke="#F8F8F8" stroke-width="2.08333" stroke-linecap="round" />
              <path d="M23.9583 21.875H36.4525C37.8411 21.875 38.841 23.2077 38.4527 24.5409L34.8121 37.0409C34.5531 37.9302 33.7381 38.5417 32.8119 38.5417H24.8213C24.2688 38.5417 23.7388 38.3222 23.3481 37.9315L22.4852 37.0685C22.0945 36.6778 21.5646 36.4583 21.0121 36.4583H17.7083" stroke="#F8F8F8" stroke-width="2.08333" stroke-linecap="round" />
            </svg>
          </button>
          <button className="icon thumbs-down-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M32.6042 13.5417L38.5417 13.5417C39.6923 13.5417 40.625 14.4744 40.625 15.625L40.625 26.0417C40.625 27.1923 39.6923 28.125 38.5417 28.125L32.6042 28.125C32.4316 28.125 32.2917 27.9851 32.2917 27.8125L32.2917 13.8542C32.2917 13.6816 32.4316 13.5417 32.6042 13.5417Z" stroke="#F8F8F8" stroke-width="2.08333" stroke-linecap="round" />
              <path d="M32.2917 26.0417L28.3449 33.9351C28.2003 34.2244 28.125 34.5434 28.125 34.8668L28.125 38.5417C28.125 39.6923 27.1922 40.625 26.0417 40.625V40.625C23.7405 40.625 21.875 38.7595 21.875 36.4583L21.875 28.125" stroke="#F8F8F8" stroke-width="2.08333" stroke-linecap="round" />
              <path d="M26.0417 28.125L13.5475 28.125C12.1589 28.125 11.159 26.7923 11.5473 25.4591L15.1879 12.9591C15.4469 12.0698 16.2619 11.4583 17.1881 11.4583L25.1787 11.4583C25.7312 11.4583 26.2612 11.6778 26.6519 12.0685L27.5148 12.9315C27.9055 13.3222 28.4354 13.5417 28.9879 13.5417L32.2917 13.5417" stroke="#F8F8F8" stroke-width="2.08333" stroke-linecap="round" />
            </svg>
          </button>
          <button className="icon next-icon" onClick={handleNextReport}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M15 22.5L22.5 15L15 7.5" stroke="#F8F8F8" stroke-width="2.5" />
              <path d="M7.5 22.5L15 15L7.5 7.5" stroke="#F8F8F8" stroke-width="2.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="new-rectangle" style={{width: '350px', height: '160px', marginTop: '20px'}}>
        <p className="recent-reports-title">SUPPORT</p>
        <a 
          href="tel:289-401-8339" 
          className="custom-rectangle" 
          style={{
            width: '130px', 
            height: '100px', 
            borderRadius: '30px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textDecoration: 'none',
            color: '#F8F8F8',
            cursor: 'pointer'
          }}
        >
          Voice Assistant
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path d="M36.8898 28.5565L42.4067 34.0734C43.1486 34.8153 43.1486 36.0181 42.4067 36.7599C38.3959 40.7708 32.0461 41.2221 27.5083 37.8187L24.2262 35.3571C20.5938 32.6329 17.3671 29.4062 14.6429 25.7738L12.1813 22.4917C8.77793 17.9539 9.22919 11.6041 13.2401 7.59327C13.9819 6.8514 15.1847 6.8514 15.9266 7.59327L21.4435 13.1102C22.2571 13.9238 22.2571 15.2429 21.4435 16.0565L19.3161 18.1839C18.978 18.522 18.8942 19.0385 19.1081 19.4661C21.5803 24.4105 25.5895 28.4197 30.5339 30.8919C30.9615 31.1058 31.478 31.022 31.8161 30.6839L33.9435 28.5565C34.7571 27.7429 36.0762 27.7429 36.8898 28.5565Z" stroke="#F8F8F8" stroke-width="2.08333"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Home;
