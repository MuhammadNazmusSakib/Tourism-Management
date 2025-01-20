import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MdFacebook } from "react-icons/md";
import { Contex } from "../../ContexApi/Contex";



const Community = () => {
  const navigate = useNavigate();
  const { user } = useContext(Contex);

  const [stories, setStories] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const location = useLocation()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axiosPublic
      .get("stories")
      .then((res) => setStories(res.data))
      .then(() => setLoading(false));
  }, []);

  if (loading || !stories) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  console.log(user)

 


  // Pagination logic
  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const paginatedStories = stories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="tourist-stories" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Tourist Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedStories.map((story) => (
            <div
              key={story._id}
              className="bg-white flex flex-col justify-between rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.text}</p>

                <div className="flex items-center gap-3">

                  {
                    user ? 
                    <div className="flex items-center justify-center py-1 px-2 w-full rounded-md bg-slate-300">
                   
                    <FacebookShareButton
                      url={`${window.location.origin}/all-stories/${story._id}`}
                      quote={story.title}
                      onClick={() => handleShare(story._id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      <FacebookIcon size={24} round />
                      Share
                    </FacebookShareButton>
                  </div>
                  :
                  <Link to="/login" className="flex items-center gap-2 justify-center py-1 px-2 w-full rounded-md bg-slate-300">
                    <MdFacebook className="text-blue-600 text-lg" />
                   <span>Share</span>
                  </Link>
                  }
                  


                  <Link to={`/all-stories/${story._id}`} className="px-2 py-1 text-center rounded-md bg-slate-300 w-full">view</Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;



