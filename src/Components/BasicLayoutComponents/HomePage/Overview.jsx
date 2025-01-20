import React from 'react';

const Overview = () => {
  const videos = [
    {
      id: 1,
      title: "Explore Stunning Landscapes",
      videoUrl: "https://www.youtube.com/embed/TMLR-GsF4oQ?si=Q6S5fUZiZQcmNhcO",
      description: "Discover breathtaking views and nature's beauty.",
    },
    {
      id: 2,
      title: "Connect with Local People",
      videoUrl: "https://www.youtube.com/embed/Qfm1NIfLJ5M?si=1cliEBqj2qf5Cex5",
      description: "Get insights from experienced locals for a personalized trip.",
    },
    {
      id: 3,
      title: "Plan the Perfect Trip",
      videoUrl: "https://www.youtube.com/embed/DzeaIkSKtWc?si=E-zCWXwhEuOSny1w",
      description: "Create a customized itinerary tailored to your needs.",
    },
    {
      id: 4,
      title: "Experience Local Culture",
      videoUrl: "https://www.youtube.com/embed/G8-QkYVnwhg?si=ga0hXdZGa5w8ZRFF",
      description: "Dive into the rich traditions and vibrant life of local communities.",
    },
  ];

  return (
    <section id="overview" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Welcome to Tourist Guide</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover what makes us unique! Watch these videos to explore the beauty, culture, and experiences we offer.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              <div className="relative w-full" style={{ height: "250px" }}>
                <iframe
                  className="w-full h-full rounded-lg shadow-lg"
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{video.title}</h3>
              <p className="mt-2 text-sm text-gray-600 text-center">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
