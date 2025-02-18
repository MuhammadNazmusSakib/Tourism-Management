import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Discover the Beauty of Bangladesh",
      description: "Explore stunning landscapes, vibrant culture, and hidden gems.",
      image: "https://i.ibb.co.com/Fm00Dv7/Plan-Your-Perfect-Trip.jpg",
    },
    {
      id: 2,
      title: "Plan Your Perfect Trip",
      description: "Find the best destinations, activities, and local cuisine.",
      image: "https://i.ibb.co.com/JdYPG11/Discover-the-Beauty-of-Bangladesh.jpg",
    },
    {
      id: 3,
      title: "Connect with Local People",
      description: "Get personalized tours and experience authentic hospitality.",
      image: "https://i.ibb.co.com/JHSK51y/Connect-with-Local-Guides.jpg",
    },
  ];

  return (
    <section className="relative -mt-[72px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="h-[500px] md:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative z-10 text-center max-w-3xl px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                {/* <a
                  href="#explore"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
                >
                  Explore Now
                </a> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
