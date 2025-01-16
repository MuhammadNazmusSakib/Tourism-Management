import React from "react";

const Location = ({ packageDetails }) => {
  const locationData = packageDetails?.locationData?.[0]

  if (!locationData) {
    return (
      <div className="text-center h-screen">
        <p>No location data available.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Location Name */}
      <h1 className="text-2xl font-bold">{locationData.name}</h1>

      {/* Google Map Embed */}
      <div className="w-full h-96">
        <iframe
          title={locationData.name}
          className="w-full h-full rounded-lg shadow"
          src={locationData.src}
          allowFullScreen
        />
      </div>

      {/* History Section */}
      {locationData.history && locationData.history.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <ul className="space-y-4">
            {locationData.history.map((event, index) => (
              <li key={index} className="p-4 border rounded-lg shadow">
                <h3 className="text-lg font-medium">{event.year}</h3>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Location;

