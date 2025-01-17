import React, { useEffect, useState } from "react";

const ManageStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem("stories")) || [];
    setStories(storedStories);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Stories</h2>
        {stories.length === 0 ? (
          <p className="text-gray-600">No stories added yet.</p>
        ) : (
          <div className="space-y-4">
            {stories.map((story, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {story.title}
                </h3>
                <p className="text-gray-700 mt-2">{story.text}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {story.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(image)}
                      alt={`story-${index}-${idx}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStories;
