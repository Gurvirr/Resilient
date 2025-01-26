import React, { useEffect, useRef, useState } from 'react';

function Map() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Initialize the map
    if (!map && mapRef.current) {
      const initialMap = new google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 }, // Default center
        zoom: 8,
        styles: [
          // Optional: Add custom map styling here
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        ],
      });
      setMap(initialMap);
    }
  }, [map]);

  // Function to add a marker for an alert
  const addAlertMarker = (alert) => {
    if (map) {
      const marker = new google.maps.Marker({
        position: { lat: alert.lat, lng: alert.lng },
        map: map,
        title: alert.title,
      });

      // Add info window for the marker
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3>${alert.title}</h3>
            <p>${alert.description}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      setMarkers(prev => [...prev, marker]);
    }
  };

  // Style for the map container
  const mapStyles = {
    height: '100vh',
    width: '100%'
  };

  return (
    <div>
      <div ref={mapRef} style={mapStyles} />
    </div>
  );
}

export default Map;
