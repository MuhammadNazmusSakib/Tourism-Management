import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useNavigate } from 'react-router-dom'

const MeetTourGuides = () => {

    const axiosPublic = useAxiosPublic()
    const [tourGuides, setTourGuides] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axiosPublic
            .get(`users/tourist-guides`)
            .then((res) => {
                let guide = res.data;

                // Shuffle the array to get random order
                guide = guide.sort(() => Math.random() - 0.5);

                // Select the first 6 random items
                setTourGuides(guide.slice(0, 6));
                setLoading(false);
            })
            // .catch((err) => {
            //     console.error('API Error:', err);
            //     setLoading(false); // Ensure loading spinner hides on error
            // });
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        )
    }
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tourGuides.map((guide) => (
                <div
                    key={guide._id}
                    className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center text-center"
                >
                    <img
                        src={guide.photoURL}
                        alt={guide.displayName}
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{guide.displayName}</h3>
                    <p className="text-blue-500 mb-1">{guide.specialization}</p>
                    <p className="text-gray-600">{guide.bio}</p>
                    <button
                        onClick={() => navigate(`/tour-guide-profile/${guide._id}`)}
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