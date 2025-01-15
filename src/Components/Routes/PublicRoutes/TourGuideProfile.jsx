import React from "react";

const guides = [
    {
        id: 1,
        name: "John Doe",
        image: "https://source.unsplash.com/150x150/?person,guide",
        experience: "5 years",
        language: "English, French",
        specialization: "Cultural Tours, Historical Sites",
        rating: 4.8,
        bio: "John is an experienced tour guide who specializes in cultural and historical tours. His knowledge of ancient landmarks and his passion for storytelling make every tour memorable.",
        contact: {
            email: "john.doe@example.com",
            phone: "+1234567890"
        },
        socialLinks: {
            facebook: "https://facebook.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe"
        }
    }
];

const TourGuideProfile = () => {
    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-16 rounded">
                {guides.map((guide) => (
                    <div key={guide.id} className="flex flex-col md:flex-row gap-6">
                        {/* Image Section */}
                        <div className="w-full md:w-1/3">
                            <img
                                src={guide.image}
                                alt={`${guide.name}'s profile`}
                                className="w-full rounded-lg"
                            />
                        </div>

                        {/* Profile Details */}
                        <div className="w-full md:w-2/3">
                            <h1 className="text-2xl font-bold">{guide.name}</h1>
                            <p className="text-gray-600 mt-2">
                                <strong>Experience:</strong> {guide.experience}
                            </p>
                            <p className="text-gray-600">
                                <strong>Languages:</strong> {guide.language}
                            </p>
                            <p className="text-gray-600">
                                <strong>Specialization:</strong> {guide.specialization}
                            </p>
                            <p className="text-yellow-500 mt-2">
                                <strong>Rating:</strong> ⭐ {guide.rating}
                            </p>
                            <p className="text-gray-700 mt-4">{guide.bio}</p>

                            {/* Contact Info */}
                            <div className="mt-6">
                                <p>
                                    <strong>Email:</strong>{" "}
                                    <a
                                        href={`mailto:${guide.contact.email}`}
                                        className="text-blue-500 underline"
                                    >
                                        {guide.contact.email}
                                    </a>
                                </p>
                                <p>
                                    <strong>Phone:</strong> {guide.contact.phone}
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 mt-4">
                                <a
                                    href={guide.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    Facebook
                                </a>
                                <a
                                    href={guide.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourGuideProfile;
