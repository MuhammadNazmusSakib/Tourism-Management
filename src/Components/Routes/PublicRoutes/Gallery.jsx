import React from "react";

const Gallery = ({ packageDetails }) => {

  if (!packageDetails) {
    return (
      <div className="text-center h-screen">
        <p>No data available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
      {packageDetails.gallery.map((image, idx) => (
        <img
          key={idx}
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover rounded-md shadow"
        />
      ))}
    </div>
  );
};

export default Gallery;
