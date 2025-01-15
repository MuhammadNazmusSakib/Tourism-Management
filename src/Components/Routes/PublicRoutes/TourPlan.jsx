import React from "react";

const TourPlan = () => {
  const tourPlan = [
    {
      day: 1,
      title: "Departure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a rutrum arcu. Donec ut lobortis arcu, non imperdiet erat.",
      points: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Donec ut lobortis arcu, non imperdiet erat vulputate at arcu.",
        "Praesent vulputate arcu et enim amet mattis lobortis arcu pellentesque at diam erat magna.",
      ],
    },
    {
      day: 2,
      title: "Adventure Begins",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a rutrum arcu. Donec ut lobortis arcu, non imperdiet erat.",
      points: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Donec ut lobortis arcu, non imperdiet erat vulputate at arcu.",
        "Praesent vulputate arcu et enim amet mattis lobortis arcu pellentesque at diam erat magna.",
      ],
    },
    {
      day: 3,
      title: "Historical Tour",
      description:
        "Suspendisse ut felis neque posuere pulvinar. Sed fermentum turpis id ut. Ut pharetra vestibulum tempor malesuada sem arcu donec euismod velit.",
      points: [
        "Sed fermentum turpis id ut pharetra vestibulum tempor malesuada.",
        "Aliquam ut velit quis nibh volutpat euismod.",
        "Donec euismod velit arcu.",
      ],
    },
    {
      day: 4,
      title: "City & Cultural Visit",
      description:
        "Suspendisse ut felis neque posuere pulvinar. Sed fermentum turpis id ut. Ut pharetra vestibulum tempor malesuada sem arcu donec euismod velit.",
      points: [
        "Sed fermentum turpis id ut pharetra vestibulum tempor malesuada.",
        "Aliquam ut velit quis nibh volutpat euismod.",
        "Donec euismod velit arcu.",
      ],
    },
    {
      day: 5,
      title: "Return",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a rutrum arcu. Donec ut lobortis arcu, non imperdiet erat.",
      points: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Donec ut lobortis arcu, non imperdiet erat vulputate at arcu.",
        "Praesent vulputate arcu et enim amet mattis lobortis arcu pellentesque at diam erat magna.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Tour Plan</h1>
      {tourPlan.map((dayPlan) => (
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
