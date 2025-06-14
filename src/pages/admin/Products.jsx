// src/pages/admin/Products.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    images: [],
    previewUrls: [],
    metalType: '',
    stone: '',
    weight: '',
    size: '',
    stock: true,
    customizationOptions: '',
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      images: files,
      previewUrls,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const resetForm = () => ({
    name: '',
    description: '',
    tags: '',
    images: [],
    previewUrls: [],
    metalType: '',
    stone: '',
    weight: '',
    size: '',
    stock: true,
    customizationOptions: '',
  });

  const onClose = () => {
    setShowModal(false);
    setFormData(resetForm());
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...formData, id: Date.now() }]);
    onClose();
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
      <p className="text-gray-600 mb-6">Here you can add, edit, or delete products.</p>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 transition"
        onClick={() => setShowModal(true)}
      >
        Add Product
      </button>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Tags</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.tags}</td>
              <td className="border px-4 py-2">{product.stock ? 'In Stock' : 'Out of Stock'}</td>
              <td className="border px-4 py-2 space-x-2">
                <button className="bg-green-500 hover:bg-green-600 transition text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 transition text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-2 py-1 rounded">
                  Flag
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Fixed Header */}
              <div className="sticky top-0 bg-white rounded-lg z-10 px-6 pt-6 pb-2 border-b">
                <h2 className="text-2xl font-semibold text-center">Add New Jewellery Item</h2>
                <button
                  className="absolute top-3 right-4 text-black text-3xl font-bold"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border p-2 w-full"
                  value={formData.name}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="border p-2 w-full"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                <input
                  type="text"
                  name="tags"
                  placeholder='Tags (e.g. "round face", "cool tone")'
                  className="border p-2 w-full"
                  value={formData.tags}
                  onChange={handleChange}
                />

                


                <div className="relative w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                  >
                    <FaPlus className="text-blue-600" />
                    <span className="text-blue-700 font-medium">Add up to 4 Images</span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  {formData.previewUrls.length > 0 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto">
                      {formData.previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

            
                <input
                  type="text"
                  name="metalType"
                  placeholder="Metal Type"
                  className="border p-2 w-full"
                  value={formData.metalType}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="stone"
                  placeholder="Stone"
                  className="border p-2 w-full"
                  value={formData.stone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="weight"
                  placeholder="Weight"
                  className="border p-2 w-full"
                  value={formData.weight}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="size"
                  placeholder="Size"
                  className="border p-2 w-full"
                  value={formData.size}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="customizationOptions"
                  placeholder="Customization Options"
                  className="border p-2 w-full"
                  value={formData.customizationOptions}
                  onChange={handleChange}
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="stock"
                    checked={formData.stock}
                    onChange={handleChange}
                  />
                  <span>In Stock</span>
                </label>

                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
