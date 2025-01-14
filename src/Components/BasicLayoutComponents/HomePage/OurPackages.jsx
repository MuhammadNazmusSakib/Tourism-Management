import React from 'react'

const OurPackages = () => {

    const packages = [
        {
            id: 1,
            image: "https://source.unsplash.com/300x200/?beach",
            tourType: "Adventure",
            title: "Beach Paradise",
            price: "$299",
        },
        {
            id: 2,
            image: "https://source.unsplash.com/300x200/?mountain",
            tourType: "Hiking",
            title: "Mountain Adventure",
            price: "$499",
        },
        {
            id: 3,
            image: "https://source.unsplash.com/300x200/?culture",
            tourType: "Cultural",
            title: "Cultural Immersion",
            price: "$399",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
                <div
                    key={pkg.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <p className="text-blue-500 font-semibold mb-2">
                            {pkg.tourType}
                        </p>
                        <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                        <p className="text-lg font-semibold text-gray-600 mb-4">
                            {pkg.price}
                        </p>
                        <button
                            onClick={() => navigate(`/package/${pkg.id}`)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            View Package
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OurPackages