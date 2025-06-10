// src/pages/admin/Products.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    images: [],
    metalType: '',
    stone: '',
    weight: '',
    size: '',
    stock: true,
    customizationOptions: '',
  });

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files),
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onClose = () => {
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      tags: '',
      images: [],
      metalType: '',
      stone: '',
      weight: '',
      size: '',
      stock: true,
      customizationOptions: '',
    });
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...formData, id: Date.now() }]);
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      tags: '',
      images: [],
      metalType: '',
      stone: '',
      weight: '',
      size: '',
      stock: true,
      customizationOptions: '',
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Animation variants for fade in/out
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

      {/* Add Product Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 transition"
        onClick={() => setShowModal(true)}
      >
        Add Product
      </button>

      {/* Product Table */}
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

      {/* Modal with fade in/out */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white p-6 rounded w-full max-w-xl relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                className="absolute top-3 right-4 text-black text-3xl font-bold"
                onClick={onClose}
                aria-label="Close modal"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-4">Add New Jewellery Item</h2>

              <div className="space-y-3">
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
                <input
                  type="file"
                  multiple
                  className="border p-2 w-full"
                  onChange={handleImageChange}
                />
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
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end mt-6 space-x-2">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
