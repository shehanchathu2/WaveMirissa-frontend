import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import AddProductModal from '../../components/admin/AddProductModel';
import EditProductModal from '../../components/admin/EditProductModal';
import { toast } from 'react-toastify';
import ProductModel from '../../components/admin/ProductModel';
import WaveMirissaLoader from '../../components/WaveMirissaLoader';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const Products = () => {
  const [modalContent, setModalContent] = useState(null);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/Allproducts`);
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openDeleteModal = (itemId) => {
    console.log('itemId passed to openDeleteModal:', itemId);
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) {
      toast.error('No product selected for deletion.');
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/product/delete/${itemToDelete}`);
      fetchProducts();
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product!');
    } finally {
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    toast.success('Product added successfully!');
  };

  if (loading) return <WaveMirissaLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <div className="hidden sm:block">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                  <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                    Manage your product inventory with ease. Add, edit, view, and remove products from your catalog.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-4">
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                onClick={() => setShowModal(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.available).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(products.map(p => p.category)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Products Inventory</h3>
            <p className="text-sm text-gray-600">A list of all products in your account including their details and status.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={product.product_id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            {product.image_url1 ? (
                              <img className="h-12 w-12 rounded-lg object-cover" src={product.image_url1} alt={product.name} />
                            ) : (
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      Rs {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                          product.available ? 'bg-green-400' : 'bg-red-400'
                        }`}></span>
                        {product.producttype}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() =>
                          setModalContent({
                            title: 'Product Details',
                            content: (
                              <div className="space-y-4">
                                <div className="flex justify-center mb-6 gap-4">
                                  {[product.image_url1, product.image_url2, product.image_url3].map(
                                    (url, i) =>
                                      url && (
                                        <div key={i} className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                                          <img
                                            src={url}
                                            alt={`${product.name} ${i + 1}`}
                                            className="w-full h-full object-cover"
                                          />
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
                                    <span className="text-sm font-semibold text-gray-800 block mb-1">Customization</span>
                                    <span className="text-gray-700">{product.customization}</span>
                                  </div>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <span className="text-sm font-semibold text-gray-800 block mb-1">Description</span>
                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 p-3 rounded-md">
                                      <span className="text-sm font-semibold text-gray-800 block mb-1">Face Shape</span>
                                      <p className="text-gray-700 leading-relaxed">{product.faceShapeTags}</p>
                                    </div>
                                     <div className="bg-gray-50 p-3 rounded-md">
                                      <span className="text-sm font-semibold text-gray-800 block mb-1">Skine Tone</span>
                                      <span className="text-gray-700 font-medium">{product.skinToneTags}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                          onClick={() => setEditProduct(product)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                          onClick={() => openDeleteModal(product.product_id)}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals - All existing modal logic preserved */}
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

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Item"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {modalContent && (
        <ProductModel title={modalContent.title} onClose={() => setModalContent(null)}>
          {modalContent.content}
        </ProductModel>
      )}
    </div>
  );
};

export default Products;