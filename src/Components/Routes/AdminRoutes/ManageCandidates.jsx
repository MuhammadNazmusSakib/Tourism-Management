import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    // Fetch all candidate applications
    axiosSecure.get("/applications")
      .then((res) => {
        setCandidates(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setIsLoading(false);
      });
  }, []);

  const handleAccept = (candidateId, candidateEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to accept this candidate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/update-role/${candidateEmail}`, { role: "Tourist Guide" })
          .then(() => {
            // Delete the application
            axiosSecure.delete(`/delete-application/${candidateId}`).then(() => {
              setCandidates((prev) =>
                prev.filter((candidate) => candidate._id !== candidateId)
              );
              Swal.fire("Accepted!", "The candidate has been accepted.", "success");
            });
          })
          .catch((error) => {
            console.error("Error accepting candidate:", error);
          });
      }
    });
  };

  const handleReject = (candidateId, candidateEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this candidate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-application/${candidateId}`)
          .then(() => {
            setCandidates((prev) =>
              prev.filter((candidate) => candidate._id !== candidateId)
            );
            Swal.fire("Rejected!", "The candidate has been rejected.", "success");
          })
          .catch((error) => {
            console.error("Error rejecting candidate:", error);
          });
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Candidates</h1>

      {candidates.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Serial</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, idx) => (
                <tr key={candidate._id}>
                  <td className="border border-gray-300 text-center px-4 py-2">{idx + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{candidate.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{candidate.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{candidate.role}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleAccept(candidate._id, candidate.email)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(candidate._id, candidate.email)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default ManageCandidates;
