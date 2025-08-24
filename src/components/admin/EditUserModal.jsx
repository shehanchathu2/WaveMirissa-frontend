import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserModal = ({ isOpen, onClose, user, onUpdated }) => {
  const [role, setRole] = useState("");
  // const [newRole, setNewRole] = useState(user.role);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleClose = () => {
    setRole(""); // reset role when closing
    onClose();   // call parent close
  };


  console.log(role)

  const loginUser = JSON.parse(localStorage.getItem("user"));
  const token = loginUser.jwt;

  const newRole = loginUser.role;

 const handleSubmit = async () => {
  try {
    const res = await axios.put(
      `http://localhost:8080/user/${user.id}`,
     { role: role.toUpperCase() },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    console.log(res.data);
    toast.success("User role updated!");
    onUpdated(); // refresh table + close modal
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Failed to update user role.");
  }
};

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      <div className="bg-white rounded-xl shadow-xl p-6 z-50 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit User Role</h2>
          <button onClick={onClose}><AiOutlineClose /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input className="w-full border p-2 rounded bg-gray-100" value={user.username} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input className="w-full border p-2 rounded bg-gray-100" value={user.email} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full border p-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUSPEND">Suspend</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <div className="flex justify-end gap-2 mt-6">
            <button className="px-4 py-2 border rounded" onClick={handleClose}>Cancel</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
