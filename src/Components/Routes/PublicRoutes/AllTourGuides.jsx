import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useNavigate } from 'react-router-dom'

const AllTourGuides = () => {

    const [touristGuide, setTouristGuide] = useState(null)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    useEffect(()=> {
        axiosPublic.get('users/tourist-guides')
        .then(res => setTouristGuide(res.data))
        console.log(touristGuide)
    }, [])
    

    if (!touristGuide) {
        return (
          <div className="text-center h-screen">
            <p>No data available.</p>
          </div>
        )
      }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {touristGuide.map((guide) => (
                <div
                    key={guide._id}
                    className="bg-white rounded-lg shadow-lg p-3 flex flex-col justify-between items-center text-center"
                >
                    <img
                        src={guide.photoURL}
                        alt={guide.displayName}
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{guide.displayName}</h3>
                    <p className="text-blue-500 mb-1">{guide.specialization}</p>
                    <p className="text-gray-600 text-left">{guide.bio}</p>
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

export default AllTourGuides