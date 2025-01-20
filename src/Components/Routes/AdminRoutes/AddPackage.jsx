import React, { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddPackage = () => {

    const axiosSecure = useAxiosSecure()
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    duration: "",
    age: "",
    category: "",
    description: "",
    details: "",
    stars: "",
    reviews: "",
    departureLocation: "",
    departureTime: "",
    returnTime: "",
    dressCode: "",
    included: [""],
    notIncluded: [""],
    tourPlan: [{ day: "", title: "", description: "", points: [""] }],
    gallery: [{ src: "", alt: "" }],
    locationData: [
      {
        name: "",
        src: "",
        history: [{ year: "", description: "" }],
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (index, name, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][name] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleArrayChange = (index, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleAddField = (arrayName, newField) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], newField] });
  };

  const handleRemoveField = (index, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };
//   ------------------working-------------------
  // Handle input change for dynamic fields
  const handleGalleryChange = (index, field, value) => {
    const updatedGallery = [...formData.gallery];
    updatedGallery[index][field] = value;
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const handleLocationChange = (field, value) => {
    const updatedLocation = { ...formData.locationData[0], [field]: value };
    setFormData({ ...formData, locationData: [updatedLocation] });
  };

  const handleHistoryChange = (index, field, value) => {
    const updatedHistory = [...formData.locationData[0].history];
    updatedHistory[index][field] = value;
    const updatedLocation = { ...formData.locationData[0], history: updatedHistory };
    setFormData({ ...formData, locationData: [updatedLocation] });
  };

  const addGalleryItem = () => {
    setFormData({ ...formData, gallery: [...formData.gallery, { src: "", alt: "" }] });
  };

  const addHistoryItem = () => {
    const updatedHistory = [...formData.locationData[0].history, { year: "", description: "" }];
    const updatedLocation = { ...formData.locationData[0], history: updatedHistory };
    setFormData({ ...formData, locationData: [updatedLocation] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log(formData)
    try {
      const response = await axiosSecure.post("add-package", formData);
      //console.log(formData)
      if (response.data.insertedId) {
        toast("Package added successfully!");
        setFormData({
          title: "",
          price: "",
          duration: "",
          age: "",
          category: "",
          description: "",
          details: "",
          stars: "",
          reviews: "",
          departureLocation: "",
          departureTime: "",
          returnTime: "",
          dressCode: "",
          included: [""],
          notIncluded: [""],
          tourPlan: [{ day: "", title: "", description: "", points: [""] }],
          gallery: [{ src: "", alt: "" }],
          locationData: [
            {
              name: "",
              src: "",
              history: [{ year: "", description: "" }],
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Package</h1>
      <form onSubmit={handleSubmit}>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Package Title"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Duration"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Minimum Age"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="input input-bordered w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Short Description"
            className="textarea textarea-bordered w-full"
          />
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            placeholder="Detailed Description"
            className="textarea textarea-bordered w-full"
          />
        </div> */}
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter package title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="input input-bordered w-full"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-2">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 4 Days 3 Nights"
            className="input input-bordered w-full"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-2">Minimum Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter minimum age"
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Nature & Wildlife"
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter a brief description"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium mb-2">Detailed Description</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            placeholder="Enter detailed information"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Departure Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Departure Location</label>
          <input
            type="text"
            name="departureLocation"
            value={formData.departureLocation}
            onChange={handleInputChange}
            placeholder="Enter departure location"
            className="input input-bordered w-full"
          />
        </div>

        {/* Departure Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Departure Time</label>
          <input
            type="text"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleInputChange}
            placeholder="Enter departure time"
            className="input input-bordered w-full"
          />
        </div>

        {/* Return Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Return Time</label>
          <input
            type="text"
            name="returnTime"
            value={formData.returnTime}
            onChange={handleInputChange}
            placeholder="Enter return time"
            className="input input-bordered w-full"
          />
        </div>

        {/* Dress Code */}
        <div>
          <label className="block text-sm font-medium mb-2">Dress Code</label>
          <input
            type="text"
            name="dressCode"
            value={formData.dressCode}
            onChange={handleInputChange}
            placeholder="Enter dress code"
            className="input input-bordered w-full"
          />
        </div>

        {/* Included */}
        <div className="mt-4">
          <h2 className="font-bold">Included</h2>
          {formData.included.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(index, e.target.value, "included")}
                placeholder="Included Item"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveField(index, "included")}
                className="btn btn-error"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("included", "")}
            className="btn btn-primary"
          >
            Add Included Item
          </button>
        </div>

        {/* Additional form fields for tourPlan, gallery, and locationData can be added similarly */}

        {/* Tour Plan */}
        <div className="mt-4">
          <h2 className="font-bold">Tour Plan</h2>
          {formData.tourPlan.map((plan, index) => (
            <div key={index} className="mb-4 rounded-md">
              <input
                type="text"
                placeholder="Day"
                value={plan.day}
                onChange={(e) => handleNestedChange(index, "day", e.target.value, "tourPlan")}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={plan.title}
                onChange={(e) => handleNestedChange(index, "title", e.target.value, "tourPlan")}
                className="input input-bordered w-full mb-2"
              />
              <textarea
                placeholder="Description"
                value={plan.description}
                onChange={(e) => handleNestedChange(index, "description", e.target.value, "tourPlan")}
                className="textarea textarea-bordered w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveField(index, "tourPlan")}
                className="btn btn-error mt-2"
              >
                Remove Plan
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("tourPlan", { day: "", title: "", description: "", points: [""] })}
            className="btn btn-primary"
          >
            Add Plan
          </button>
        </div>

        {/* --------------------------working--------------------- */}
        {/* Gallery Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Gallery</h2>
          {formData.gallery.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image Source</label>
                <input
                  type="text"
                  value={item.src}
                  onChange={(e) => handleGalleryChange(index, "src", e.target.value)}
                  placeholder="Enter image source URL"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alt Text</label>
                <input
                  type="text"
                  value={item.alt}
                  onChange={(e) => handleGalleryChange(index, "alt", e.target.value)}
                  placeholder="Enter alt text for image"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addGalleryItem}
            className="btn btn-primary"
          >
            Add More Images
          </button>
        </div>

        {/* Location Data Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Location Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location Name</label>
              <input
                type="text"
                value={formData.locationData[0].name}
                onChange={(e) => handleLocationChange("name", e.target.value)}
                placeholder="Enter location name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location Map Source</label>
              <input
                type="text"
                value={formData.locationData[0].src}
                onChange={(e) => handleLocationChange("src", e.target.value)}
                placeholder="Enter map embed URL"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* History Section */}
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">Location History</h3>
            {formData.locationData[0].history.map((historyItem, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <input
                    type="text"
                    value={historyItem.year}
                    onChange={(e) => handleHistoryChange(index, "year", e.target.value)}
                    placeholder="Enter year"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={historyItem.description}
                    onChange={(e) => handleHistoryChange(index, "description", e.target.value)}
                    placeholder="Enter description"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addHistoryItem}
              className="btn btn-primary"
            >
              Add More History
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Save Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
