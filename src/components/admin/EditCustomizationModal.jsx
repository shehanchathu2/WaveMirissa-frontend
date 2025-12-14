// EditCustomizationModal.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dlvhmit8p";
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export default function EditCustomizationModal({ isOpen, onClose, customization, onUpdate }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [faceShape, setFaceShape] = useState("");
    const [skinTone, setSkinTone] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (customization) {
            setName(customization.name);
            setPrice(customization.price);
            setFaceShape(customization.faceShapeTags || "");
            setSkinTone(customization.skinToneTags || "");
            setImageUrl(customization.imageUrl);
        }
    }, [customization]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await axios.post(CLOUDINARY_API, formData);
            setImageUrl(res.data.secure_url);
            toast.success("Image uploaded!");
        } catch (err) {
            console.error("Image upload error:", err);
            toast.error("Image upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setImageUrl("");
    };

    const handleSubmit = async () => {
        if (!name || !price || !imageUrl) {
            toast.error("All fields including image are required.");
            return;
        }

        try {
            const updatedData = {
                item_id: customization.item_id,
                name: name.trim(),
                price: parseFloat(price),
                faceShapeTags: faceShape,
                skinToneTags: skinTone,
                imageUrl: imageUrl
            };

            const formData = new FormData();
            formData.append("customizations", new Blob(
                [JSON.stringify(updatedData)],
                { type: "application/json" }
            ));

            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/Customizations/${customization.item_id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log(imageUrl)
            toast.success("Customization updated!");
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update customization.");
        }
    };

    if (!isOpen || !customization) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30" onClick={onClose} />
            <div className="relative z-50 bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Customization</h2>
                    <button onClick={onClose}><AiOutlineClose /></button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
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
                        <label className="block text-sm font-medium mb-1">Image</label>

                        {imageUrl ? (
                            <div className="relative w-28 h-28">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded-md border" />
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded"
                                    onClick={handleRemoveImage}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="relative w-28 h-28 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-500 transition">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />

                                {isUploading ? (
                                    <p className="text-sm text-blue-600">Uploading...</p>
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
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                    <button onClick={onClose} className="border px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={isUploading}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
