import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Contex } from "../../ContexApi/Contex";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MyBookings = () => {
  const { user } = useContext(Contex);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`all-booking/user/${user.email}`)
        .then((res) => {
          setBookings(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setIsLoading(false);
        });
    }
  }, [user]);

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`cancel-booking/${id}`)
          .then(() => {
            setBookings((prev) => prev.filter((booking) => booking._id !== id));
            Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
          })
          .catch((error) => {
            console.error("Error cancelling booking:", error);
            Swal.fire("Error!", "Could not cancel the booking.", "error");
          });
      }
    });
  };

  const handlePayment = (booking) => {
    // Navigate to the payment page with booking details
    navigate("/dashboard/payment", { state: { booking } });
  };

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center h-screen flex items-center justify-center">
        <p className="text-gray-600">No Booking available.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto min-h-screen p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Package Name</th>
            <th className="border border-gray-300 px-4 py-2">Tour Guide</th>
            <th className="border border-gray-300 px-4 py-2">Tour Date</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border border-gray-300 px-4 py-2">{booking.packageName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.tourGuideName || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(booking.tourDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">${booking.price}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.status}</td>
              <td className="flex border border-gray-300 px-4 py-2">
                {booking.status === "pending" && (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                      onClick={() => handlePayment(booking)}
                    >
                      Pay
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
