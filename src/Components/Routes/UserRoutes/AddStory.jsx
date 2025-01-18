import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Contex } from "../../ContexApi/Contex";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(Contex);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const uniqueFiles = newFiles.filter(
      (file) => !images.some((img) => img.name === file.name)
    );
    setImages([...images, ...uniqueFiles]);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axiosPublic.post(image_hosting_api, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data?.data?.url || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !text || images.length === 0) {
      setError("All fields are required, and you must upload at least one image.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Upload each image and collect URLs
      const uploadedImageUrls = await Promise.all(
        images.map((image) => uploadImage(image))
      );

      if (uploadedImageUrls.length) {
        const newStory = {
          email: user.email,
          title,
          text,
          images: uploadedImageUrls,
        };

        const newAddedStory = await axiosSecure.post("/add-story", newStory);

        if (newAddedStory.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "New Story Added!",
            icon: "success",
          }).then(() => {
            navigate("/dashboard/manage-stories");
          });
        }
      }
    } catch (error) {
      console.error("Error uploading images or saving story:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to save the story. Please try again.",
        icon: "error",
      });
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

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Previews
              </label>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
                <span className="ml-2">Submitting...</span>
              </div>
            ) : (
              "Submit Story"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStory;
