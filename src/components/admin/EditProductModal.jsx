// EditProductModal.jsx
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dlvhmit8p";
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onUpdate,
}) {
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [customizations, setCustomizations] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        faceShapeTags: product.faceShapeTags || "",
        skinToneTags: product.skinToneTags
          ? product.skinToneTags.charAt(0).toUpperCase() +
            product.skinToneTags.slice(1).toLowerCase()
          : "",
        previewUrls: [
          product.image_url1 || "",
          product.image_url2 || "",
          product.image_url3 || "",
        ].filter(Boolean),
      });
    }
    console.log("Product data loaded:", product);
  }, [product]);

  useEffect(() => {
    const fetchCustomizations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customizations`
        );
        setCustomizations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching customizations:", error);
      }
    };
    fetchCustomizations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (formData.previewUrls.length >= 3) {
      toast.error("Maximum 3 images allowed.");
      return;
    }

    setIsUploading(true);
    const cloudData = new FormData();
    cloudData.append("file", file);
    cloudData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_API, cloudData);
      const newUrl = res.data.secure_url;
      const newUrls = [...formData.previewUrls, newUrl];

      setFormData((prev) => {
        const updated = { ...prev, previewUrls: newUrls };
        newUrls.forEach((url, idx) => {
          updated[`image_url${idx + 1}`] = url;
        });
        return updated;
      });
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedUrls = formData.previewUrls.filter((_, i) => i !== index);
    const updatedForm = { ...formData };
    for (let i = 1; i <= 3; i++) {
      updatedForm[`image_url${i}`] = updatedUrls[i - 1] || "";
    }
    updatedForm.previewUrls = updatedUrls;
    setFormData(updatedForm);
  };

  const handleSubmit = async () => {
    // Prepare payload
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      faceShapeTags: formData.faceShapeTags || "",
      skinToneTags: formData.skinToneTags || "",
      personalize: formData.personalize || "",
      producttype: formData.producttype
        ? formData.producttype.toLowerCase()
        : null,
    };

    // Handle type-specific fields
    if (formData.producttype === "ring") {
      payload.size = parseFloat(formData.size || 0);
    } else if (formData.producttype === "neckless") {
      payload.length = parseFloat(formData.length || 0);
    }

    // Map image preview URLs to correct fields
    payload.image_url1 = formData.previewUrls[0] || "";
    payload.image_url2 = formData.previewUrls[1] || "";
    payload.image_url3 = formData.previewUrls[2] || "";

    try {
      console.log("Payload to update:", payload); // debug: check payload
      await axios.put(
        `http://localhost:8080/product/update/${formData.product_id}`,
        payload
      );
      toast.success("Product updated!");
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed.");
    }
  };

  if (!isOpen || !product) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 z-50 overflow-y-auto max-h-[90vh] scrollbar-hide">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                Edit Product
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Product Name */}
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                placeholder="Product Name"
              />

              {/* Material */}
              <label className="block text-sm font-medium text-gray-700">
                Material
              </label>
              <input
                name="material"
                value={formData.material || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                placeholder="Material"
              />

              {/* Product Type */}
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="producttype"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.producttype || ""}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="ring">Ring</option>
                <option value="neckless">Neckless</option>
                <option value="wristband">Wristband</option>
                <option value="earring">Earring</option>
                <option value="bracelet">Bracelet</option>
                <option value="anklet">Anklet</option>
              </select>

              {/* Price */}
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={formData.price || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                placeholder="Price"
              />

              {/* Category */}
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="bridal">Bridal</option>
                <option value="seashells">Seashells</option>
                <option value="normals">Normals</option>
              </select>

              {/* Description */}
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                placeholder="Description"
              />

              {/* Customization */}
              <label className="block text-sm font-medium text-gray-700">
                Customization
              </label>
              <select
                name="customization"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.customization || ""}
                onChange={handleChange}
              >
                <option value="">Select Customization</option>
                {customizations.map((item) => (
                  <option key={item.item_Id} value={item.item_Id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* Gender */}
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>

              <label className="block text-sm font-medium text-gray-700">
                Face Shape
              </label>
              <select
                name="faceShapeTags"
                value={formData.faceShapeTags || ""}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Face Shape</option>
                <option value="Oval">Oval</option>
                <option value="Round">Round</option>
                <option value="Square">Square</option>
                <option value="Heart">Heart</option>
                <option value="Diamond">Diamond</option>
              </select>

              <label className="block text-sm font-medium text-gray-700">
                Skin Tone
              </label>
              <select
                name="skinToneTags"
                value={formData.skinToneTags || ""}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Skin Tone</option>
                <option value="Fair">Fair</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Tan">Tan</option>
                <option value="Deep">Deep</option>
                <option value="Cool">Cool</option>
              </select>

              <label className="block text-sm font-medium text-gray-700">
                Personalize
              </label>
              <select
                name="personalize"
                value={formData.personalize}
                onChange={handleChange}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md focus:outline-none"
              >
                <option value="NONE">None</option>
                <option value="Agreeableness">Agreeableness</option>
                <option value="Conscientiousness">Conscientiousness</option>
                <option value="Extraversion">Extraversion</option>
                <option value="Neuroticism">Neuroticism</option>
                <option value="Openness">Openness</option>
              </select>

              {/* Image Previews */}
              <div className="flex flex-wrap gap-3">
                {formData.previewUrls?.map((url, i) => (
                  <div key={i} className="relative w-20 h-20">
                    <img
                      src={url}
                      className="w-full h-full object-cover rounded-md border"
                      alt={`Preview ${i + 1}`}
                    />
                    <button
                      className="absolute top-0 right-0 text-xs px-1 py-0.5 bg-red-500 text-white rounded-full"
                      onClick={() => handleRemoveImage(i)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Upload Image */}
              {formData.previewUrls?.length < 3 && (
                <div className="flex items-center gap-2 w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">Upload Image</span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                <button
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                  disabled={isUploading}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
