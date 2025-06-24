// src/pages/admin/Users.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {

  const [users, setUsers] = useState([])

 useEffect(() => {
  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users");
      const onlyUsers = res.data.filter((u) => u.role === "USER"); // Change based on your actual field
      setUsers(onlyUsers);
      console.log(onlyUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users.');
    }
  };

  getAllUsers();
}, []);

const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this User?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user!");
      // alert("Failed to delete product.");
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <p className="text-gray-600">View and manage registered users here.</p>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#f1f5f9] text-gray-700 text-sm uppercase tracking-wider">
            <th className="px-6 py-3 text-left">Num</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr
              key={u.id}
              className="border-b hover:bg-gray-50 transition duration-200"
            >
              <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.username}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
              <td className="px-6 py-4 text-center space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => handleDeleteUser(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Users;
