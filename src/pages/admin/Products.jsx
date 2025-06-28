import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import AddProductModal from '../../components/admin/AddProductModel';
import EditProductModal from '../../components/admin/EditProductModal';
import { toast } from 'react-toastify';
import ProductModel from '../../components/admin/ProductModel';

const Products = () => {
  const [modalContent, setModalContent] = useState(null);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/product/Allproducts');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/product/delete/${id}`);
      fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    toast.success("Product added successfully!");
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

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#f9fafb] text-gray-700 text-sm uppercase tracking-wider">
            <th className="px-6 py-3 text-left">Num</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-center">Available</th>
            <th className="px-6 py-3 text-center">Product Details</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.product_id}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
              <td className="px-6 py-4 text-sm text-gray-600">${product.price}</td>
              <td className="px-6 py-4 text-sm text-center">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.available ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <button
                  onClick={() =>
                    setModalContent({
                      title: 'Product Details',
                      content: (
                        <div className="space-y-4">
                          <div className="flex justify-center mb-6 gap-4">
                            {[product.image_url1, product.image_url2, product.image_url3].map((url, index) =>
                              url && (
                                <div key={index} className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                                  <img src={url} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                              )
                            )}
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <span className="text-sm font-semibold text-gray-800 block mb-1">Product Name</span>
                              <span className="text-gray-700">{product.name}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm font-semibold text-gray-800 block mb-1">Category</span>
                                <span className="text-gray-700">{product.category}</span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm font-semibold text-gray-800 block mb-1">Gender</span>
                                <span className="text-gray-700">{product.gender}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm font-semibold text-gray-800 block mb-1">Material</span>
                                <span className="text-gray-700">{product.material}</span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm font-semibold text-gray-800 block mb-1">Quantity</span>
                                <span className="text-gray-700 font-medium">{product.quantity}</span>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <span className="text-sm font-semibold text-gray-800 block mb-1">Customization</span>
                              <span className="text-gray-700">{product.customization}</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <span className="text-sm font-semibold text-gray-800 block mb-1">Description</span>
                              <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm"
                >
                  See Info
                </button>
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => setEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => handleDeleteProduct(product.product_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {showModal && (
          <AddProductModal
            onClose={() => setShowModal(false)}
            onProductAdded={handleProductAdded}
          />
        )}
      </AnimatePresence>

      {editProduct && (
        <EditProductModal
          isOpen={!!editProduct}
          onClose={() => setEditProduct(null)}
          product={editProduct}
          onUpdate={fetchProducts}
        />
      )}

      {modalContent && (
        <ProductModel title={modalContent.title} onClose={() => setModalContent(null)}>
          {modalContent.content}
        </ProductModel>
      )}
    </div>
  );
};

export default Products;
