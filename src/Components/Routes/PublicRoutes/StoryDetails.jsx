import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';


const StoryDetails = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic()
  const {id} = useParams()

  useEffect(() => {
    axiosPublic
      .get(`stories/id/${id}`)
      .then((response) => {
        setStory(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch story');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="text-center h-screen flex items-center justify-center">
        <p>No story found.</p>
      </div>
    );
  }

  const { email, title, text, images } = story;

  return (
    <div className="max-w-4xl mx-auto bg-white py-10 overflow-hidden mt-4">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2">{email}</p>
        <p className="mt-4 text-gray-700">{text}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default StoryDetails;
