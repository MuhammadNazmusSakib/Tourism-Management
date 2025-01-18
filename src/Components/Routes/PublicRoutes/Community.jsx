import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Contex } from "../../ContexApi/Contex";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Community = () => {
  const navigate = useNavigate();
  const {user} = useState(Contex)

  const [stories, setStories] = useState(null)
  const axiosPublic = useAxiosPublic()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      axiosPublic.get('stories')
      .then(res => setStories(res.data))
      .then(setLoading(false))
  }, [])

  if (loading || !stories) {
      return (
          <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
      )
  }

  const handleShare = (url) => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <section id="tourist-stories" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Tourist Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story) => (
            <div key={story._id} className="bg-white flex flex-col justify-between rounded-lg shadow-lg overflow-hidden">
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.text}</p>
                <FacebookShareButton
                  url={story.url}
                  quote={story.title}
                  onClick={() => handleShare(story.url)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  <FacebookIcon size={24} round />
                  Share on Facebook
                </FacebookShareButton>
              </div>
            </div>
          ))}
        </div>
        {/*  */}
      </div>
    </section>
  );
};

export default Community;
