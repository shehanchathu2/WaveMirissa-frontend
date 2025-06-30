// EditProductModal.jsx
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { motion } from 'framer-motion';

import { toast } from "react-toastify";

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dlvhmit8p";
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export default function EditProductModal({ isOpen, onClose, product, onUpdate }) {
    const [formData, setFormData] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [customizations, setCustomizations] = useState([]);

    useEffect(() => {
        console.log(product)
        if (product) {
            setFormData({
                ...product,
                previewUrls: [
                    product.image_url1 || "",
                    product.image_url2 || "",
                    product.image_url3 || ""

                ].filter(Boolean)
            });
        }
    }, [product]);

    useEffect(() => {
        const fetchCustomizations = async () => {
            try {
                const response = await axios.get("http://localhost:8080/customizations");
                setCustomizations(response.data);
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
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (formData.previewUrls.length >= 4) {
            toast.error("Maximum 4 images allowed.");
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
        for (let i = 1; i <= 4; i++) updatedForm[`image_url${i}`] = updatedUrls[i - 1] || "";
        updatedForm.previewUrls = updatedUrls;
        setFormData(updatedForm);
    };

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity, 10),
            available: Boolean(formData.available),
        };

        // Add subclass-specific fields
        if (formData.type === "ring" && formData.size !== undefined) {
            payload.size = parseFloat(formData.size);
        } else if (formData.type === "neckless" && formData.length !== undefined) {
            payload.length = parseFloat(formData.length);
        }

        console.log("Submitting payload:", payload);

        try {
            await axios.put(`http://localhost:8080/product/update/${formData.product_id}`, payload);
            toast.success("Product updated!");
            onUpdate();
            onClose();
        } catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
            toast.error("Update failed.");
        }
    };


    if (!isOpen || !product) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
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
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="fixed inset-0 bg-black/30" onClick={onClose} />
                    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 z-50 overflow-y-auto max-h-screen">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Edit Product</h2>
                            <button onClick={onClose}><AiOutlineClose /></button>
                        </div>

                        <div className="space-y-4">
                            <input name="name" value={formData.name || ""} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Product Name" />
                            <input name="material" value={formData.material || ""} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Material" />
                            <input name="price" type="number" value={formData.price || ""} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Price" />
                            <input name="category" value={formData.category || ""} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Category" />

                            <select
                                name="customization"
                                className="border p-2 w-full"
                                value={formData.customization}
                                onChange={handleChange}
                            >
                                <option value="">Select Customization</option>
                                {customizations.map((item) => (
                                    <option key={item.item_Id} value={item.item_Id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>


                            <select name="type" className="border p-2 w-full" value={formData.type} onChange={handleChange}>
                                <option value="">Select Type</option>
                                <option value="ring">Ring</option>
                                <option value="neckless">Neckless</option>
                                <option value="wristband">Wristband</option>
                            </select>

                           

                            <input name="description" value={formData.description || ""} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Description" />

                            <select name="gender" className="border p-2 w-full" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select>




                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
                                <span>Available</span>
                            </label>

                            <div className="flex flex-wrap gap-2">
                                {formData.previewUrls?.map((url, i) => (
                                    <div key={i} className="relative w-20 h-20">
                                        <img src={url} className="w-full h-full object-cover rounded" />
                                        <button
                                            className="absolute top-0 right-0 text-xs px-1 py-0.5 bg-red-500 text-white rounded"
                                            onClick={() => handleRemoveImage(i)}
                                        >✕</button>
                                    </div>
                                ))}
                            </div>

                            {formData.previewUrls?.length < 4 && (
                                <div className="flex items-center gap-2 w-full">
                                    <label htmlFor="image-upload" className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

                            <div className="flex justify-end gap-2 mt-4">
                                <button className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
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
