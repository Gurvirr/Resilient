import React, { useState } from 'react';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    location: '',
    description: '',
    timestamp: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const alertToAdd = {
      ...newAlert,
      timestamp: new Date(),
      id: Date.now(), // simple way to generate unique IDs
    };
    setAlerts([alertToAdd, ...alerts]);
    setNewAlert({ location: '', description: '', timestamp: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlert((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 flex justify-center">
      <div className="container max-w-3xl space-y-8">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Community Alerts
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </h1>

        {/* Create Alert Section */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 transform hover:scale-[1.01] transition-all">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 -m-8 mb-6 p-6 rounded-t-2xl border-b border-blue-50">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Create New Alert
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="location" className="block mb-2 text-gray-700 font-semibold text-center">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={newAlert.location}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-center shadow-sm"
                required
                placeholder="Location"
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-gray-700 font-semibold text-center">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newAlert.description}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-center shadow-sm"
                rows="4"
                required
                placeholder="Provide details about the situation..."
              />
            </div>
            <div className="flex justify-center pt-4">
              <button 
                type="submit"
                className="bg-[#181818] text-[#f8f8f8] px-12 py-3 rounded-full font-semibold transition duration-300 hover:shadow-xl transform hover:-translate-y-0.5 w-48"
              >
                Submit Alert
              </button>
            </div>
          </form>
        </div>

        {/* Recent Alerts Section */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 -m-8 mb-6 p-6 rounded-t-2xl border-b border-orange-50">
            <div className="flex justify-center items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">Recent Alerts</h2>
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-4 py-1 rounded-full animate-pulse">
              </span>
            </div>
          </div>
          
          <div className="space-y-6">
            {alerts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No alerts reported yet.</p>
                <p className="text-gray-400 text-sm mt-2">Be the first to report an incident!</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                    <h3 className="font-bold text-xl text-gray-800">
                      📍 {alert.location}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                      {alert.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-center bg-gray-50 p-4 rounded-lg">
                    {alert.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
