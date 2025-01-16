import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";



const TourGuideProfile = () => {

    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const [guide, setGuide] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            axiosPublic.get(`users/tourist-guides/${id}`)
                .then(res => {
                    // console.log('API Response:', res.data);
                    setGuide(res.data);
                    setLoading(false)
                })
                .catch(err => console.error('API Error:', err));
        }
    }, [id, axiosPublic]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        )
    }


    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-16 rounded">

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Section */}
                    <div className="w-full md:w-1/3">
                        <img
                            src={guide.photoURL}
                            alt={`${guide.displayName}'s profile`}
                            className="w-full rounded-lg"
                        />
                    </div>

                    {/* Profile Details */}
                    <div className="w-full md:w-2/3">
                        <h1 className="text-2xl font-bold">{guide.displayName}</h1>
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
                                    href={`mailto:${guide.email}`}
                                    className="text-blue-500 underline"
                                >
                                    {guide.email}
                                </a>
                            </p>
                            <p>
                                <strong>Phone:</strong> {guide.phone}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TourGuideProfile;
