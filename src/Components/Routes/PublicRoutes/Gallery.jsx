import React from "react";

const Gallery = () => {
  const galleryData = [
    { id: 1, src: "https://via.placeholder.com/300", alt: "Image 1" },
    { id: 2, src: "https://via.placeholder.com/300", alt: "Image 2" },
    { id: 3, src: "https://via.placeholder.com/300", alt: "Image 3" },
    { id: 4, src: "https://via.placeholder.com/300", alt: "Image 4" },
    { id: 5, src: "https://via.placeholder.com/300", alt: "Image 5" },
    { id: 6, src: "https://via.placeholder.com/300", alt: "Image 6" },
    { id: 7, src: "https://via.placeholder.com/300", alt: "Image 7" },
    { id: 8, src: "https://via.placeholder.com/300", alt: "Image 8" },
    { id: 9, src: "https://via.placeholder.com/300", alt: "Image 9" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
      {galleryData.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover rounded-md shadow"
        />
      ))}
    </div>
  );
};

export default Gallery;
