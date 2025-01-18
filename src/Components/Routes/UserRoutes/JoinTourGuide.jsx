import React, { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { Contex } from "../../ContexApi/Contex";

const JoinTourGuide = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(Contex)
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
    role: "Tourist",
    name: user.displayName,
    email: user.email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    axiosSecure.post(`application`, formData)
    .then(res => {
      if (res.data.insertedId) {
        console.log(res.data)
        setIsModalOpen(true); // Open modal on form submission
      }
    })
    
  };

  return (
    <div className="px-3 md:px-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Join as a Tour Guide</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white px-3 py-6 md:px-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Application Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Senior Tour Guide Application"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Explain why you want to join as a tour guide"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CV Link
          </label>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/your-cv"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-center mb-4">
              Application Submitted!
            </h2>
            <p className="text-center">
              Thank you for your application. We will review your submission and
              get back to you soon.
            </p>
            <div className="text-center mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinTourGuide;
