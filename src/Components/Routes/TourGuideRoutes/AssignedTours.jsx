import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Contex } from "../../ContexApi/Contex";
import Swal from "sweetalert2";

const AssignedTours = () => {
  const { user } = useContext(Contex);
  const [assignedTours, setAssignedTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`all-booking/guide/${user.email}`)
        .then((res) => {
          setAssignedTours(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching assigned tours:", error);
          setIsLoading(false);
        });
    }
  }, [user]);

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this tour?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`update-booking-status/${id}`, { status: "Rejected" })
          .then(() => {
            setAssignedTours((prev) =>
              prev.map((tour) =>
                tour._id === id ? { ...tour, status: "Rejected" } : tour
              )
            );
            Swal.fire("Rejected!", "The tour has been rejected.", "success");
          })
          .catch((error) => {
            console.error("Error rejecting tour:", error);
            Swal.fire("Error!", "Could not reject the tour.", "error");
          });
      }
    });
  };

  const handleAccept = (id) => {
    axiosSecure.patch(`update-booking-status/${id}`, { status: "Accepted" })
      .then(() => {
        setAssignedTours((prev) =>
          prev.map((tour) =>
            tour._id === id ? { ...tour, status: "Accepted" } : tour
          )
        );
        Swal.fire("Accepted!", "The tour has been accepted.", "success");
      })
      .catch((error) => {
        console.error("Error accepting tour:", error);
        Swal.fire("Error!", "Could not accept the tour.", "error");
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (assignedTours.length === 0) {
    return <p className="h-full">No assigned tours available.</p>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Package Name</th>
            <th className="border border-gray-300 px-4 py-2">Tourist Name</th>
            <th className="border border-gray-300 px-4 py-2">Tour Date</th>
            <th className="border border-gray-300 px-4 py-2">Tour Price</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedTours.map((tour) => (
            <tr key={tour._id}>
              <td className="border border-gray-300 px-4 py-2">{tour.packageName}</td>
              <td className="border border-gray-300 px-4 py-2">{tour.touristName}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(tour.tourDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">${tour.price}</td>
              <td className="border border-gray-300 px-4 py-2">{tour.status}</td>
              <td className="flex border border-gray-300 px-4 py-2">
                {tour.status === "pending" ? (
                  <button
                    className="bg-gray-300 text-gray-500 px-2 py-1 rounded cursor-not-allowed"
                    disabled
                  >
                    Accept
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" 
                    disabled={tour.status == "Rejected"}
                    onClick={() => handleAccept(tour._id)}
                  >
                    Accept
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                  onClick={() => handleReject(tour._id)}
                  disabled={tour.status !== "pending"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedTours;
