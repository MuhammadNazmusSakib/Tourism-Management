import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Contex } from "../../ContexApi/Contex";
import { toast } from "react-toastify";

const Offer = () => {
    const [bookings, setBookings] = useState([]);
    const [showCongrats, setShowCongrats] = useState(false);
    const { width, height } = useWindowSize(); // Get window dimensions
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(Contex);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const response = await axiosSecure.get(`/all-booking/user/${user?.email}`);
                // Filter bookings with status "pending"
                const pendingBookings = response.data.filter(
                    (booking) => booking.status.toLowerCase() === "pending"
                );
                setBookings(pendingBookings);

                // Show congratulations if more than 3 bookings
                if (response.data.length > 3) {
                    setShowCongrats(true);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error.response?.data || error.message);
            }
        };

        fetchUserBookings();

        // Cleanup function to remove window resize event listener
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [user]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Bookings</h1>

            {/* Display bookings */}
            {bookings.length === 0 ? (
                <p className="text-gray-500">You have no bookings yet.</p>
            ) : (
                <ul className="space-y-4 w-full max-w-xl">
                    {bookings.map((booking) => (
                        <li
                            key={booking._id}
                            className="p-4 bg-white shadow rounded-lg border border-gray-200"
                        >
                            <h2 className="text-lg font-bold">{booking.packageName}</h2>
                            <p className="text-gray-500">
                                Date: {new Date(booking.tourDate).toLocaleDateString()}
                            </p>
                            <p
                                className={`text-gray-700 ${booking.status === "pending" ? "text-red-500" : "text-green-500"}`}
                            >
                                Status: {booking.status}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Congratulations Message */}
            {showCongrats && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative bg-white rounded-lg p-6 shadow-lg text-center max-w-lg w-full">
                        {/* Confetti with dynamic width and height */}
                        <Confetti width={width} height={height} />
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h2>
                        <p className="text-gray-700 mb-4">
                            You've booked more than 3 trips! You're eligible for an exclusive discount.
                        </p>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            onClick={() => toast("Discount Applied!")}
                        >
                            Apply Discount
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Offer;
