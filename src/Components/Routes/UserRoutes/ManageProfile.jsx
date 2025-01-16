import React, { useContext, useState } from "react";
import { Contex } from "../../ContexApi/Contex";

const ManageProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(Contex);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated");
    setIsModalOpen(false);
  };

  return (
    <div className="p-3 space-y-6">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold text-center sm:text-left">
        Welcome, {user.displayName}!
      </h1>

      {/* User Information */}
      <div className="bg-white p-3 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-blue-600 font-medium">{user.role}</p>
            <p className="mt-2">{user.bio}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center sm:justify-start">
          {/* Edit Button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>

          {/* Apply for Tour Guide */}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 w-full sm:w-auto"
            onClick={() => (window.location.href = "/join-tour-guide")}
          >
            Apply for Tour Guide
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  defaultValue={user.bio}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={user.role}
                  disabled
                  className="w-full bg-gray-200 border border-gray-300 p-2 rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-gray-200 border border-gray-300 p-2 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
