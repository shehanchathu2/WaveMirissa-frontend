import React, { useEffect, useState } from "react";
import AddCustomizationModal from "../../components/admin/AddCustomizationModel";
import EditCustomizationModal from "../../components/admin/EditCustomizationModal";
import axios from "axios";
import WaveMirissaLoader from "../../components/WaveMirissaLoader";

const Customization = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading,setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:8080/AllCustomizations");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products.");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) return <WaveMirissaLoader/>


  const handleModalSubmit = async () => {
    await fetchData();
    setIsModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateComplete = async () => {
    await fetchData();
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  const handleDeleteProduct = async (item_id) => {
    if (!window.confirm("Are you sure you want to delete this customization?")) return;

    try {
      await axios.delete(`http://localhost:8080/Customizations/delete/${item_id}`);
      fetchData();
      alert("Deleted the customization.");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete the customization.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Customization</h1>
      <p className="text-gray-600 mb-6">
        Here you can add, edit, or delete products.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
      >
        Add Customization
      </button>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Num</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Price (Rs)</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item, index) => (
              <tr key={item.item_id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm text-gray-700">{item.item_id}</td>
                <td className="px-4 py-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-12 w-12 rounded-md object-cover border"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-800">Rs. {item.price}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow"
                      onClick={() => handleDeleteProduct(item.item_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCustomizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      <EditCustomizationModal
        isOpen={isEditModalOpen}
        customization={editItem}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateComplete}
      />
    </div>
  );
};

export default Customization;