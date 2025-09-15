import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dlvhmit8p";
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export default function AddCustomizationModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [faceShape, setFaceShape] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_API, formData);
      setImageUrl(response.data.secure_url);
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };


  const handleSubmit = async () => {
    if (!name || !price || !imageUrl) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const payload = {
      name,
      price: parseFloat(price),
      faceShapeTags:faceShape,
      skinToneTags:skinTone,
      imageUrl, // backend expects this field if updated model
    };

    try {
      await axios.post("http://localhost:8080/AddCustomizations", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Customization added successfully!");
      onSubmit(payload); // optional: notify parent
      onClose();

      // reset form
      setName("");
      setPrice("");
      setFaceShape("");
      setSkinTone("");
      setImageUrl("");
    } catch (error) {
      console.error("Error submitting customization:", error);
      toast.error("Failed to add customization.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />
      <div className="relative z-50 bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Customization</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="w-full border rounded-md p-2 mt-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>




          <div>
            {/* Face Shape Dropdown */}
            <label className="block text-sm font-medium text-gray-700 ">Face Shape</label>
            <select
              name="faceShape"
              className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md focus:outline-none"
              value={faceShape}
              onChange={(e) => setFaceShape(e.target.value)}
            >
              <option value="">Select Face Shape</option>
              <option value="Oval">Oval</option>
              <option value="Round">Round</option>
              <option value="Heart">Heart</option>
              <option value="Square">Square</option>
              <option value="Diamond">Diamond</option>
            </select>

          </div>

          {/* Skin Tone Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Skin Tone</label>
            <select
              name="skinTone"
              className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md focus:outline-none"
              value={skinTone}
              onChange={(e) => setSkinTone(e.target.value)}
            >
              <option value="">Select Skin Tone</option>
              <option value="Fair">Fair</option>
              <option value="Medium">Medium</option>
              <option value="Deep">Deep</option>
              <option value="Warm">Warm</option>
              <option value="Cool">Cool</option>
            </select>
          </div>






          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>

            <div className="relative w-28 h-28 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              {isUploading ? (
                <p className="text-sm text-blue-600">Uploading...</p>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-auto mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-xs">Click to upload</p>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            disabled={isUploading}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
