import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Contex } from "../../ContexApi/Contex";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";


const ManageProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(Contex)
  const axiosSecure = useAxiosSecure()

  // Fetch user profile using React Query
  const { data: userProfile, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["userProfile", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `users/email/${user.email}`
      );
      return response.data;
    },
    enabled: !!user.email, // Ensure query runs only if user.email is defined
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Function to handle editing user details
  const handleEditSave = (updatedDetails) => {
    // Logic to update user profile
    console.log("Updated details:", updatedDetails);
    refetch()
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {userProfile.displayName}!
      </h1>
      
      <div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="w-full md:w-1/3">
            <img
              src={userProfile.photoURL}
              alt={`${userProfile.displayName}'s profile`}
              className="w-full rounded-lg"
            />
          </div>

          {/* Profile Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold">{userProfile.displayName}</h1>
            <p className="text-gray-600 mt-2">
              <strong>Experience:</strong> {userProfile.experience || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Languages:</strong> {userProfile.language || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Specialization:</strong> {userProfile.specialization || "N/A"}
            </p>
            {/* <p className="text-yellow-500 mt-2">
              <strong>Rating:</strong> ⭐ {userProfile.rating}
            </p> */}
            <p className="text-gray-700 mt-4">{userProfile.bio || "N/A"}</p>

            {/* Contact Info */}
            <div className="mt-6">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${userProfile.email}`}
                  className="text-blue-500 underline"
                >
                  {userProfile.email}
                </a>
              </p>
              <p>
                <strong>Phone:</strong> {userProfile.phone || "N/A"}
              </p>
            </div>

          </div>
        </div>
        <div className="mt-4 flex gap-4">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/dashboard/join-tour-guide")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Apply for Tour Guide
            </button>
          </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          userProfile={userProfile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ userProfile, onClose, onSave }) => {
  const axiosSecure = useAxiosSecure()
  const [formData, setFormData] = useState({
    displayName: userProfile.displayName,
    photoURL: userProfile.photoURL,
    experience: userProfile.experience,
    language: userProfile.language,
    specialization: userProfile.specialization,
    // rating: userProfile.rating,
    bio: userProfile.bio,
    phone: userProfile.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure.put(`users/id/${userProfile._id}`, formData)
      .then(() => {
        onSave(formData);
        toast.success('Book updated successfully!');
        //navigate('/my-profile/update-books');  // Redirect after update
      })
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded w-96 max-h-[80vh] overflow-y-scroll p-6">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          {/* <div className="mb-3">
            <label className="block mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div> */}
          <div className="mb-3">
            <label className="block mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;
