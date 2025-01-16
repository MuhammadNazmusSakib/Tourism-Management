import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Contex } from "../../ContexApi/Contex";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const BookingForm = ({packageDetails}) => {
  const [tourDate, setTourDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(Contex)

  const navigate = useNavigate();

  const [tourGuides, setTourGuides] = useState(null)
  const axiosPublic = useAxiosPublic()


  useEffect(()=> {
      axiosPublic.get('users/tourist-guides')
      .then(res => setTourGuides(res.data))
      console.log(tourGuides)
  }, [])

  if (!tourGuides) {
    return (
      <div className="text-center h-screen">
        <p>No data available.</p>
      </div>
    )
  }

  const handleBooking = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    // Booking data to store
    const bookingData = {
      packageName: packageDetails.title,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: packageDetails.price,
      tourDate,
      tourGuide: selectedGuide,
      status: "pending",
    };

    // Simulate storing booking data (you can replace this with an API call)
    console.log("Booking Information:", bookingData);

    // Show confirmation modal
    setShowModal(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book Your Package</h2>
      <form onSubmit={handleBooking}>
        {/* Package Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Package Name
          </label>
          <input
            type="text"
            value={packageDetails.title}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Tourist Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tourist Name
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Tourist Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tourist Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Tourist Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tourist Image
          </label>
          <input
            type="text"
            value={user?.photoURL || ""}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="text"
            value={`$${packageDetails.price}`}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Tour Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tour Date
          </label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            dateFormat="MMMM d, yyyy"
            className="w-full px-4 py-2 border rounded-lg"
            placeholderText="Select a date"
            required
          />
        </div>

        {/* Tour Guide Name ------------------------------*/}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tour Guide Name
          </label>
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select a guide</option>
            {tourGuides.map((guide) => (
              <option key={guide._id} value={guide.displayName}>
                {guide.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Book Now
        </button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Your Booking</h3>
            <p className="mb-6">
              Your booking is pending. You can view it on the "My Bookings" page.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/my-bookings");
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Go to My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
