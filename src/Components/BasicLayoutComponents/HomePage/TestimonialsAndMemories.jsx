import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const testimonials = [
    {
      id: 1,
      name: "John Doe",
      location: "Paris, France",
      text: "Visiting Paris was a dream come true! The Eiffel Tower at night is simply magical.",
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "Kyoto, Japan",
      text: "Kyoto’s temples and cherry blossoms are breathtaking. A must-visit destination!",
    },
    {
      id: 3,
      name: "Ali Khan",
      location: "Cairo, Egypt",
      text: "Exploring the pyramids of Giza was an unforgettable experience.",
    },
    {
      id: 4,
      name: "Maria Garcia",
      location: "Barcelona, Spain",
      text: "The architecture of Gaudi in Barcelona is truly unique and awe-inspiring. A city full of culture and charm.",
    },
  ];
  

const TestimonialsAndMemories = () => {
  return (
    <section id="testimonials-memories" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials Section */}
        <motion.h2
          className="text-4xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Traveler Testimonials
        </motion.h2>

        <motion.div
          className="w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="w-full"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 italic">{testimonial.location}</p>
                  <p className="text-gray-700 mt-4 text-center text-lg">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Memories Section */}
        <motion.h2
          className="text-4xl font-bold text-gray-800 text-center my-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Traveler Memories
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testimonials.map((memory) => (
            <motion.div
              key={memory.id}
              className="p-6 bg-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">{memory.name}</h3>
              <p className="text-gray-500 italic mb-2">{memory.location}</p>
              <p className="text-gray-700 text-base">"{memory.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndMemories;
