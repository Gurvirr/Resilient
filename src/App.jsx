import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Map from './components/Map';
import Alerts from './components/Alerts';

function App() {
  const [activeButton, setActiveButton] = useState('center'); // Default is the center button

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Router>
      <div className="app-container">
        <p className="main-title">Resilient</p>
        
        <div className="rounded-rectangle">
          <div className="red-circle-left"></div>
          <div className="red-circle-right"></div>
          <div className="circle"></div>

          <div className="icon-left">
            <div
              className={`circle-button ${activeButton === 'left' ? 'active' : ''}`}
              onClick={() => handleButtonClick('left')}
            >
              <Link to="/alerts">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M10.7464 14.949C11.2703 10.2338 15.2558 6.66663 20 6.66663V6.66663C24.7442 6.66663 28.7297 10.2338 29.2536 14.949L29.6733 18.726C29.6786 18.7742 29.6813 18.7982 29.684 18.8221C29.8989 20.6949 30.5085 22.5008 31.4726 24.1208C31.4849 24.1414 31.4973 24.1622 31.5222 24.2037L32.4856 25.8093C33.3599 27.2664 33.797 27.995 33.7026 28.5931C33.6399 28.991 33.435 29.3527 33.1261 29.6113C32.6618 30 31.8122 30 30.1129 30H9.88705C8.18781 30 7.33818 30 6.87389 29.6113C6.56496 29.3527 6.36014 28.991 6.29735 28.5931C6.20299 27.995 6.64011 27.2664 7.51437 25.8093L8.47776 24.2037C8.50268 24.1622 8.51515 24.1414 8.52741 24.1208C9.49147 22.5008 10.1011 20.6949 10.316 18.8221C10.3187 18.7982 10.3214 18.7742 10.3267 18.726L10.7464 14.949Z"
                    stroke={activeButton === 'left' ? '#f8f8f8' : '#181818'}
                    strokeWidth="1.66667"
                  />
                  <path
                    d="M15.1704 30.6764C15.4552 31.9168 16.083 33.0128 16.9562 33.7946C17.8294 34.5763 18.8993 35 20 35C21.1007 35 22.1706 34.5763 23.0438 33.7946C23.917 33.0128 24.5448 31.9168 24.8296 30.6764"
                    stroke={activeButton === 'left' ? '#f8f8f8' : '#181818'}
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="icon-center">
            <div
              className={`circle-button ${activeButton === 'center' ? 'active' : ''}`}
              onClick={() => handleButtonClick('center')}
            >
              <Link to="/home">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                  <path
                    d="M23 17.5V23.5C23 25.7091 21.2091 27.5 19 27.5H9C6.79086 27.5 5 25.7091 5 23.5V17.5"
                    stroke={activeButton === 'center' ? '#f8f8f8' : '#181818'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1 15L14 2L27 15"
                    stroke={activeButton === 'center' ? '#f8f8f8' : '#181818'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="icon-right">
            <div
              className={`circle-button ${activeButton === 'right' ? 'active' : ''}`}
              onClick={() => handleButtonClick('right')}
            >
              <Link to="/map">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M32.5 25.3698V10.3802C32.5 9.82268 31.9133 9.46005 31.4146 9.70939L26.0943 12.3696C25.9264 12.4535 25.7332 12.4714 25.5528 12.4199L14.4472 9.24683C14.2668 9.19528 14.0736 9.21324 13.9057 9.29716L7.91459 12.2927C7.6605 12.4198 7.5 12.6795 7.5 12.9635V27.9532C7.5 28.5107 8.08674 28.8733 8.58541 28.624L13.9057 25.9638C14.0736 25.8799 14.2668 25.8619 14.4472 25.9135L25.5528 29.0865C25.7332 29.1381 25.9264 29.1201 26.0943 29.0362L32.0854 26.0406C32.3395 25.9136 32.5 25.6539 32.5 25.3698Z"
                    stroke={activeButton === 'right' ? '#f8f8f8' : '#181818'}
                    strokeWidth="1.66667"
                  />
                  <path
                    d="M25.8333 29.1667V12.5"
                    stroke={activeButton === 'right' ? '#f8f8f8' : '#181818'}
                    strokeWidth="1.66667"
                  />
                  <path
                    d="M14.1667 25.8334V9.16669"
                    stroke={activeButton === 'right' ? '#f8f8f8' : '#181818'}
                    strokeWidth="1.66667"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
