import React from "react";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";

const TouristStorySection = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const stories = [
    {
      id: 1,
      title: "A Trip to the Mountains",
      description: "I had an amazing time exploring the majestic peaks and lush valleys.",
      image: "https://source.unsplash.com/300x200/?mountain",
      url: "https://yourwebsite.com/stories/1",
    },
    {
      id: 2,
      title: "Beachside Bliss",
      description: "Sun, sand, and sea – the perfect ingredients for relaxation.",
      image: "https://source.unsplash.com/300x200/?beach",
      url: "https://yourwebsite.com/stories/2",
    },
    {
      id: 3,
      title: "Cultural Immersion",
      description: "An unforgettable experience of vibrant traditions and flavors.",
      image: "https://source.unsplash.com/300x200/?culture",
      url: "https://yourwebsite.com/stories/3",
    },
    {
      id: 4,
      title: "Adventures in the Forest",
      description: "Exploring the wilderness and its natural beauty was breathtaking.",
      image: "https://source.unsplash.com/300x200/?forest",
      url: "https://yourwebsite.com/stories/4",
    },
  ];

  const handleShare = (url) => {
    if (!isLoggedIn) {
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
            <div key={story.id} className="bg-white flex flex-col justify-between rounded-lg shadow-lg overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.description}</p>
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
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/all-stories")}
            className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            View All Stories
          </button>
          <button
            onClick={() => navigate("/add-story")}
            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Add Your Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default TouristStorySection;
