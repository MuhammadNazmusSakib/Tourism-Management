import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Contex } from "../../ContexApi/Contex";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { user } = useContext(Contex)

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !text || images.length === 0) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }

    setIsLoading(true);

    try {
      // Upload each image to imgbb and collect URLs
      const uploadedImageUrls = [];
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axiosPublic.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data && response.data.data.url) {
          uploadedImageUrls.push(response.data.data.url);

          // Prepare the story object
          const newStory = {
            email: user.email,
            title,
            text,
            images: uploadedImageUrls,
          };
          const newAddedStory = await axiosSecure.post('/add-story', newStory);
          console.log(newAddedStory.data)
          if (newAddedStory.data.insertedId) {
            // show success popup
            
            Swal.fire({
              title: "Success!",
              text: "New Story Added!",
              icon: "success"
            });
          }

          // Log or send the story object to your backend
          // console.log("New Story:", newStory);
        }
      }


      // Redirect to Manage Stories
      //navigate("/dashboard/manage-stories");
    } catch (error) {
      console.error("Error uploading images or saving story:", error);
      alert("Failed to save the story. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add a Story</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter story title"
              required
            />
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-2 h-32"
              placeholder="Write your story here..."
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="block w-full text-gray-600 border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStory;
