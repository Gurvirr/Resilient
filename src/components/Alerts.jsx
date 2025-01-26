import React, { useState } from 'react';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    lat: '',
    lng: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const alert = {
      ...newAlert,
      lat: parseFloat(newAlert.lat),
      lng: parseFloat(newAlert.lng),
      id: Date.now()
    };
    
    setAlerts(prev => [...prev, alert]);
    
    // Here you would typically:
    // 1. Save the alert to your backend
    // 2. Update the markers on the map
    // 3. Clear the form
    
    setNewAlert({
      title: '',
      description: '',
      lat: '',
      lng: ''
    });
  };

  return (
    <div>
      <h1>Alerts</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Alert Title"
          value={newAlert.title}
          onChange={(e) => setNewAlert(prev => ({...prev, title: e.target.value}))}
        />
        <textarea
          placeholder="Description"
          value={newAlert.description}
          onChange={(e) => setNewAlert(prev => ({...prev, description: e.target.value}))}
        />
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={newAlert.lat}
          onChange={(e) => setNewAlert(prev => ({...prev, lat: e.target.value}))}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={newAlert.lng}
          onChange={(e) => setNewAlert(prev => ({...prev, lng: e.target.value}))}
        />
        <button type="submit">Add Alert</button>
      </form>

      <div>
        {alerts.map(alert => (
          <div key={alert.id}>
            <h3>{alert.title}</h3>
            <p>{alert.description}</p>
            <p>Location: {alert.lat}, {alert.lng}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
