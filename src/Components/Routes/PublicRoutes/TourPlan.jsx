import React from "react";

const TourPlan = ({packageDetails}) => {

  if (!packageDetails) {
    return (
      <div className="text-center h-screen">
        <p>No data available.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Tour Plan</h1>
      {packageDetails.tourPlan.map((dayPlan) => (
        <div
          key={dayPlan.day}
          className="flex items-start space-x-4 mb-6 border-b pb-6"
        >
          {/* Day Number */}
          <div className="w-16 sm:w-10 h-10 bg-yellow-400 text-white flex items-center justify-center text-xl font-bold rounded">
            {dayPlan.day}
          </div>
          {/* Details */}
          <div>
            <h2 className="text-xl font-bold">{`Day ${dayPlan.day}: ${dayPlan.title}`}</h2>
            <p className="text-gray-600 mt-2">{dayPlan.description}</p>
            <ul className="list-disc list-inside text-gray-600 mt-4">
              {dayPlan.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourPlan;
