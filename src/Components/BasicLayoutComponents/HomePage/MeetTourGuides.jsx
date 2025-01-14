import React from 'react'

const MeetTourGuides = () => {

    const tourGuides = [
        {
            id: 1,
            name: "John Doe",
            expertise: "Adventure Tours",
            description:
                "Experienced guide with a passion for thrilling outdoor adventures.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Jane Smith",
            expertise: "Cultural Tours",
            description:
                "Specialist in local history, traditions, and culinary experiences.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Michael Brown",
            expertise: "Wildlife Tours",
            description: "Enthusiastic wildlife expert and nature photographer.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Emily Davis",
            expertise: "Family Tours",
            description: "Specialist in family-friendly itineraries and activities.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            name: "Robert Wilson",
            expertise: "Luxury Tours",
            description: "Curates premium experiences for high-end travelers.",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 6,
            name: "Anna Thompson",
            expertise: "Historical Tours",
            description: "Passionate about history and archaeological discoveries.",
            image: "https://via.placeholder.com/150",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tourGuides.map((guide) => (
                <div
                    key={guide.id}
                    className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center text-center"
                >
                    <img
                        src={guide.image}
                        alt={guide.name}
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{guide.name}</h3>
                    <p className="text-blue-500 mb-1">{guide.expertise}</p>
                    <p className="text-gray-600">{guide.description}</p>
                    <button
                        onClick={() => navigate(`/tour-guide/${guide.id}`)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        View Profile
                    </button>
                </div>
            ))}
        </div>
    )
}

export default MeetTourGuides