import React from "react";

const Location = () => {
  const locationData = {
    name: "Great Wall of China",
    coordinates: {
      lat: 40.4319,
      lng: 116.5704,
    },
    history: [
      {
        year: "7th Century BC",
        description: "Construction of the Wall began during the Zhou Dynasty to protect against invasions.",
      },
      {
        year: "221–206 BC",
        description: "The Qin Dynasty connected and expanded existing walls to form the first unified Great Wall.",
      },
      {
        year: "1368–1644",
        description: "The Ming Dynasty rebuilt and fortified the Wall with bricks and stones.",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{locationData.name}</h1>

      {/* Google Map Embed */}
      <div className="w-full h-96">
        <iframe
          title={locationData.name}
          className="w-full h-full rounded-lg shadow"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${locationData.coordinates.lat},${locationData.coordinates.lng}`}
          allowFullScreen
        />
      </div>

      {/* History Section */}
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
    </div>
  );
};

export default Location;
