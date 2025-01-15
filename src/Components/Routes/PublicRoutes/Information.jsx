import React from "react";

const Information = () => {
  const data = [
    {
      title: "Asian Discovery",
      price: 3500,
      duration: "10 Days 9 Nights",
      age: "16+ Age",
      category: "Discovery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a dolor sit rutrum arcu.",
      details:
        "Donec vel quam vitae nisl posuere efficitur. Suspendisse eget lectus est. Pellentesque vitae maximus turpis. Morbi sodales vestibulum lorem a ultricies.",
      rating: { stars: 4.5, reviews: 2 },
      departureLocation: "2 Taijichang St, Dongcheng Qu, Beijing Shi, China",
      departureTime: "9:30 AM",
      returnTime: "Approximately 8:30 PM",
      dressCode: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      included: ["Accommodation", "Guide", "Insurance", "Meals"],
      notIncluded: ["Flights", "Transport"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      {data.map((item, index) => (
        <div key={index}>
          {/* Title and Price */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <div className="flex space-x-4 text-gray-500 mt-2">
                <span>{item.duration}</span>
                <span>{item.age}</span>
                <span>{item.category}</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600">${item.price}</h2>
              <p className="text-sm text-gray-500">per person</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">{item.description}</p>

          {/* Details */}
          <p className="text-gray-600 mb-6">{item.details}</p>

          {/* Rating */}
          <div className="flex items-center text-yellow-500 space-x-2 mb-6">
            <span className="text-lg font-bold">{item.rating.stars} ★</span>
            <span className="text-sm text-gray-500">({item.rating.reviews} Reviews)</span>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Departure/Return Location</h3>
              <p className="text-gray-600">{item.departureLocation}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Departure Time</h3>
              <p className="text-gray-600">{item.departureTime}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Return Time</h3>
              <p className="text-gray-600">{item.returnTime}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Dress Code</h3>
              <p className="text-gray-600">{item.dressCode}</p>
            </div>
          </div>

          {/* Included/Not Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Included</h3>
              <ul className="list-disc list-inside text-gray-600">
                {item.included.map((include, idx) => (
                  <li key={idx}>{include}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Not Included</h3>
              <ul className="list-disc list-inside text-gray-600">
                {item.notIncluded.map((notInclude, idx) => (
                  <li key={idx}>{notInclude}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Information;
