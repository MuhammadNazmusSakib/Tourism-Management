import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useNavigate } from 'react-router-dom'

const OurPackages = () => {

    const axiosPublic = useAxiosPublic()
    const [packages, setPackages] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axiosPublic.get(`randomTourPackages`)
            .then(res => {
                // console.log('API Response:', res.data);
                setPackages(res.data);
                setLoading(false)
            })
            .catch(err => console.error('API Error:', err));
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        )
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
                <div
                    key={pkg._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    <img
                        src={pkg?.gallery?.[0]?.src} // Show the 1st image here
                        alt={pkg.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <p className="text-blue-500 font-semibold mb-2">
                            {pkg.tourType}
                        </p>
                        <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                        <p className="text-lg font-semibold text-gray-600 mb-4">
                            ${pkg.price}
                        </p>
                        <button 
                            onClick={() => navigate(`/package-details/${pkg._id}`)}
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