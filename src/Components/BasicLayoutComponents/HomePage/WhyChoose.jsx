import React from 'react';

const WhyChoose = () => {
  return (
    <section id="WhyChoose" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Choose a Better Platform
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover the best destinations, connect with locals, and plan your perfect trip with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video Section */}
          {/* <div className="relative aspect-w-16 aspect-h-9">
            <img src="https://i.ibb.co.com/sHyKDqK/Why-Choose-Tourist-Guide.jpg" alt="" />
            
          </div> */}
          <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg">
            <img
              src="https://i.ibb.co.com/sHyKDqK/Why-Choose-Tourist-Guide.jpg"
              alt="Tourist Guide"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Tourist Guide?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our platform provides a seamless experience for travelers. From breathtaking landscapes to hidden gems, 
              we bring you the best that destinations have to offer. Connect with experienced local guides, explore 
              custom itineraries, and enjoy hassle-free trip planning tailored to your preferences.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500"></span>
                <span className="text-gray-600">Curated destinations and travel plans</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500"></span>
                <span className="text-gray-600">Experienced local guides</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500"></span>
                <span className="text-gray-600">Authentic cultural experiences</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
