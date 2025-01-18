import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [images, setImages] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();

  // Fetch story details
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axiosSecure.get(`/stories/id/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error("Failed to fetch story", err);
      }
    };
    fetchStory();
  }, [id, axiosSecure]);

  // Handle image removal
  const handleRemoveImage = async (image) => {
    try {
      await axiosSecure.put(`/stories/${id}`, { pullImage: image });
      setStory({
        ...story,
        images: story.images.filter((img) => img !== image),
      });
    } catch (err) {
      console.error("Failed to remove image", err);
    }
  };


  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const uploadedImageUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axiosPublic.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data && response.data.data.url) {
          uploadedImageUrls.push(response.data.data.url);
        }
      }
      if (uploadedImageUrls.length) {
        await axiosSecure.put(`/stories/${id}`, { pushImages: uploadedImageUrls });
        setStory((prevStory) => ({
          ...prevStory,
          images: [...prevStory.images, ...uploadedImageUrls],
        }));
      }
    } catch (err) {
      console.error("Failed to upload images", err);
    }
  };


  // Update title and description
  const handleUpdateStory = async (e) => {
    e.preventDefault();
    try {
      const newEditedStory = await axiosSecure.put(`/stories/${id}`, {
        title: story.title,
        text: story.text,
      });
      console.log(newEditedStory.data)
      if (newEditedStory.data.result.modifiedCount > 0 || newEditedStory.data.result.matchedCount === 1) {
        Swal.fire({
          title: "Success!",
          text: "Story Edited!",
          icon: "success",
        }).then(() => {
          navigate("/dashboard/manage-stories");
        });
      }
      // navigate("/dashboard/manage-stories");
    } catch (err) {
      console.error("Failed to update story", err);
    }
  };

  return story ? (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Story</h2>
      <form onSubmit={handleUpdateStory} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={story.title}
            onChange={(e) =>
              setStory({ ...story, title: e.target.value })
            }
            className="block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        {/* Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={story.text}
            onChange={(e) =>
              setStory({ ...story, text: e.target.value })
            }
            className="block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        {/* Existing Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Existing Images
          </label>
          <div className="grid grid-cols-3 gap-2">
            {story.images.map((image) => (
              <div key={image} className="relative">
                <img
                  src={image}
                  alt=""
                  className="w-full h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Add New Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add New Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleAddImages}
            className="block w-full text-gray-600 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Update Story
        </button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditStory;
