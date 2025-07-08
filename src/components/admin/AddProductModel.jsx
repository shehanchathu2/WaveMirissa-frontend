import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
const CLOUDINARY_CLOUD_NAME = 'dlvhmit8p';
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const AddProductModal = ({ onClose, onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        producttype: '',
        material: '',
        price: '',
        category: '',
        available: true,
        description: '',
        customization: '',
        gender: '',
        size: '',
        length: '',
        image_url1: '',
        image_url2: '',
        image_url3: '',
        previewUrls: [],
        customizations: [],
    });

    const [customizations, setCustomizations] = useState([]);

    useEffect(() => {
        const fetchCustomizations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/customizations');
                setCustomizations(response.data);
            } catch (error) {
                console.error('Error fetching customizations:', error);
            }
        };
        fetchCustomizations();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const currentCount = formData.previewUrls.length;
        if (currentCount >= 3) {
            toast.error('You can upload a maximum of 3 images.');
            return;
        }

        try {
            const formDataCloud = new FormData();
            formDataCloud.append('file', file);
            formDataCloud.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const response = await axios.post(CLOUDINARY_API, formDataCloud);
            const imageUrl = response.data.secure_url;

            const newPreviewUrls = [...formData.previewUrls, imageUrl];

            setFormData((prevData) => ({
                ...prevData,
                [`image_url${currentCount + 1}`]: imageUrl,
                previewUrls: newPreviewUrls,
            }));

            toast.success('Image uploaded to Cloudinary!');
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error('Image upload to Cloudinary failed.');
        }
    };

    const handleSubmit = async () => {
        if (formData.previewUrls.length < 1) {
            toast.error('Please upload at least one image before submitting.');
            return;
        }

        const selectedIds = (formData.customizations || []).map((id) => parseInt(id, 10));

        const payload = {
            ...formData,
            producttype: formData.producttype ? formData.producttype.toLowerCase() : null,
            price: parseFloat(formData.price),
            customizations: customizations
                .filter((c) => selectedIds.includes(c.id))
                .map((c) => ({ item_id: c.id })),
        };

        console.log('Submitting payload:', payload);

        try {
            const res = await axios.post('http://localhost:8080/product/addproducts', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            onProductAdded(res.data);
            onClose();
            toast.success('Product added successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to add product.');
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
            <motion.div
                className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col relative"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <div className="sticky top-0 bg-white rounded-lg z-10 px-6 pt-6 pb-2 border-b">
                    <h2 className="text-2xl font-semibold text-center">Add New Product</h2>
                    <button
                        className="absolute top-3 right-4 text-black text-3xl font-bold"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div className="overflow-y-auto px-6 py-6 space-y-5 scrollbar-hide">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" placeholder="Name" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md" value={formData.name} onChange={handleChange} />

                    <label className="block text-sm font-medium text-gray-700">Material</label>
                    <input type="text" name="material" placeholder="Material" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md" value={formData.material} onChange={handleChange} />

                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select name="producttype" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md" value={formData.producttype} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="ring">Ring</option>
                        <option value="neckless">Neckless</option>
                        <option value="wristband">Wristband</option>
                        <option value="earring">Earring</option>
                        <option value="bracelet">Bracelet</option>
                        <option value="anklet">Anklet</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" name="price" placeholder="Price" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md" value={formData.price} onChange={handleChange} />

                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="bridal">Bridal</option>
                        <option value="seashells">Seashells</option>
                        <option value="normals">Normals</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" placeholder="Description" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md" value={formData.description} onChange={handleChange}></textarea>

                    <label className="block text-sm font-medium text-gray-700 mb-2">Customizations</label>
                    <div className="space-y-2">
                        {formData.customizations.map((value, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <select
                                    value={value}
                                    onChange={(e) => {
                                        const updated = [...formData.customizations];
                                        updated[index] = e.target.value;
                                        setFormData((prev) => ({ ...prev, customizations: updated }));
                                    }}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                >
                                    <option value="">Select a Customization</option>
                                    {customizations.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = formData.customizations.filter((_, i) => i !== index);
                                        setFormData((prev) => ({ ...prev, customizations: updated }));
                                    }}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    customizations: [...prev.customizations, '']
                                }));
                            }}
                            className="mt-2 text-blue-600 hover:underline text-sm"
                        >
                            + Add Customization
                        </button>
                    </div>

                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 w-full rounded-md" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unisex">Unisex</option>
                    </select>

                    <label htmlFor="image-upload" className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition">
                        <FaPlus className="text-blue-600" />
                        <span className="text-blue-700 font-medium">Add Image ({formData.previewUrls.length}/3)</span>
                    </label>
                    <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

                    {formData.previewUrls.length > 0 && (
                        <div className="mt-2 flex gap-2 overflow-x-auto">
                            {formData.previewUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <img src={url} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded border" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end mt-6 space-x-3 pt-4 border-t">
                        <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition" onClick={onClose}>Cancel</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={handleSubmit}>Add Product</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AddProductModal;