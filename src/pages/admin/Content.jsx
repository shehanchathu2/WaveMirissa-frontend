import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dlvhmit8p";
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const Content = () => {
  const [banners, setBanners] = useState([]);
  const [allBanners, setAllBanners] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Fetch banners from backend
  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/banners");
      setAllBanners(response.data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      toast.error("Failed to fetch banners.");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ Add new banner input
  const handleAddBanner = () => {
    setBanners([...banners, { title: "", image: null, imageUrl: "" }]);
  };

  // ✅ Update form banner fields
  const handleBannerChange = (index, field, value) => {
    const updated = [...banners];
    updated[index][field] = value;
    setBanners(updated);
  };

  // ✅ Upload image to Cloudinary
  const handleImageUpload = async (index, file) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(CLOUDINARY_API, formData);
      const imageUrl = response.data.secure_url;

      handleBannerChange(index, "imageUrl", imageUrl);
      toast.success("Image uploaded to Cloudinary!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed.");
    }
  };

  // ✅ Submit banners to backend
  const handleSubmit = async () => {
    try {
      for (const b of banners) {
        const payload = {
          title: b.title,
          imageUrl: b.imageUrl,
        };
        await axios.post("http://localhost:8080/api/banners", payload);
      }
      toast.success("All banners submitted successfully!");
      setBanners([]); // clear form
      fetchBanners(); // refresh
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit banners.");
    }
  };

  // ✅ Delete banner
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/banners/${id}`);
    // Remove from local allBanners without re-fetching
    const updatedBanners = allBanners.filter(b => b.id !== id);
    setAllBanners(updatedBanners);
    toast.success("Banner deleted!");
  } catch (error) {
    console.error("Delete failed:", error);
    toast.error("Failed to delete banner.");
  }
};


  //Edit banner
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSaveEdit = async (banner, index) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/banners/${banner.id}`, banner);
      // Update local allBanners by index to maintain order
      const updatedBanners = [...allBanners];
      updatedBanners[index] = response.data;
      setAllBanners(updatedBanners);
      toast.success("Banner updated!");
      setEditIndex(null);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update banner.");
    }
  };


  //Activate a banner (only one active at a time)
  const handleActivate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/banners/${id}/activate`);
      // Update local allBanners
      const updatedBanners = allBanners.map(b => ({
        ...b,
        active: b.id === id
      }));
      setAllBanners(updatedBanners);
      toast.success("Banner activated for homepage!");
    } catch (error) {
      console.error("Activation failed:", error);
      toast.error("Failed to activate banner.");
    }
  };


  // Calculate stats
  const totalBanners = allBanners.length;
  const activeBanners = allBanners.filter(banner => banner.active).length;
  const inactiveBanners = totalBanners - activeBanners;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Banner Management</h1>
              <p className="text-gray-600 mt-1">Manage your promotional banners with ease. Add, edit, view, and remove banners from your catalog.</p>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-colors"
            onClick={handleAddBanner}
          >
            <span className="text-lg">+</span>
            <span>Add New Banner</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Banners</p>
              <p className="text-2xl font-semibold text-gray-900">{totalBanners}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-2xl font-semibold text-gray-900">{activeBanners}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Inactive</p>
              <p className="text-2xl font-semibold text-gray-900">{inactiveBanners}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Banner Form */}
      {banners.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Banner</h2>
          {banners.map((banner, index) => (
            <div key={index} className="mb-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banner Title</label>
                  <input
                    type="text"
                    value={banner.title}
                    onChange={(e) => handleBannerChange(index, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter banner title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(index, e.target.files[0])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept="image/*"
                  />
                  {banner.imageUrl && (
                    <p className="text-sm text-green-600 mt-2">✓ Image uploaded successfully</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            onClick={handleSubmit}
          >
            Submit All Banners
          </button>
        </div>
      )}

      {/* Banners Inventory */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Banners Inventory</h2>
          <p className="text-gray-600 mt-1">A list of all banners in your account including their details and status.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allBanners.map((banner, index) => (
                <tr key={banner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editIndex === index ? (
                      <input
                        type="text"
                        defaultValue={banner.title}
                        onChange={(e) => (banner.title = e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{banner.title}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${banner.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                      }`}>
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="radio"
                      name="activeBanner"
                      checked={banner.active}
                      onChange={() => handleActivate(banner.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {editIndex === index ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-xs"
                        onClick={() => handleSaveEdit(banner)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition-colors text-xs"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs"
                      onClick={() => handleDelete(banner.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {allBanners.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-medium">No banners found</p>
                      <p className="text-sm">Get started by adding your first banner</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Content;