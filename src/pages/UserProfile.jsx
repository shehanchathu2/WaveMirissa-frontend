import React, { useEffect, useState } from 'react';
import { User, Edit3, Save, X, Mail, Phone, MapPin, Calendar, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const UserProfile = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',

    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    },

  });


  const handleEdit = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };







  const { user } = useAuth();
  console.log(user.username)
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "Sri Lanka",
    username: user.username // fixed value
  });


  const [loading, setLoading] = useState(false);

  // ✅ Fetch existing address when page loads
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/address/${user.id}`)
      .then((res) => {
        if (res.data) {
          setAddress(res.data);
          console.log(address.street);        
          console.log(address.city);          
          console.log(address.country);       
          console.log(address.phone);         

          // Nested user info
          console.log(address.user.email);    
          console.log(address.user.username);
        }

      })
      .catch((err) => {
        console.log("No address yet:", err.response?.data || err.message);
      });
  }, [user.id]);

  // ✅ Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/address/${user.id}`,
        address
      );
      alert("Address saved successfully!");
      setAddress(res.data);
    } catch (err) {
      alert("Error saving address!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const [editData, setEditData] = useState(address);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50  to-gray-100">
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm border-stone-200">
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBack && (
                <button onClick={onBack} className="p-2 text-gray-600 hover:text-[#1b4965] hover:bg-stone-100 rounded-lg transition-colors">
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="p-3 bg-gradient-to-br from-[#1b4965] to-[#0d3548] rounded-xl shadow-lg">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>
            {!isEditing ? (
              <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 bg-[#1b4965] text-white rounded-lg hover:bg-[#0d3548] transition-colors font-medium">
                <Edit3 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 font-medium text-gray-700 transition-colors rounded-lg bg-stone-200 hover:bg-stone-300">
                  <X size={18} />
                  Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#1b4965] text-white rounded-lg hover:bg-[#0d3548] transition-colors font-medium">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Content with Fixed Sidebar */}
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="flex gap-8">
          {/* Fixed Profile Summary Sidebar */}
          <div className="flex-shrink-0 w-80">
            <div className="sticky top-32">
              <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-stone-200">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1b4965] to-[#0d3548] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="text-white" size={32} />
                </div>
                <h2 className="mb-1 text-xl font-bold text-gray-900">
                  {user.username} {user.username}
                </h2>
                <p className="mb- 4 text-gray-600">{user.email}</p>

              </div>
            </div>
          </div>

          {/* Scrollable Profile Details */}
          <div className="flex-1 space-y-6 overflow-y-auto">
            {/* Personal Information */}
            <div className="p-6 bg-white border shadow-sm rounded-xl border-stone-200">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <User className="text-[#1b4965]" size={20} />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={address.user.username}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      {user.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={address.user.username}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      {user.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="flex items-center gap-2 px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      <Mail size={16} className="text-[#1b4965]" />
                      {user.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="flex items-center gap-2 px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      <Phone size={16} className="text-[#1b4965]" />
                      {address.phone}
                    </p>
                  )}
                </div>


              </div>
            </div>

            {/* Address Information */}
            <div className="p-6 bg-white border shadow-sm rounded-xl border-stone-200">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <MapPin className="text-[#1b4965]" size={20} />
                Address Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Street Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      {address.street}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      {address.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      {address.state}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">ZIP Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.address.zipCode}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />
                  ) : (
                    <p className="px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      {address.zipCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Country</label>
             
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1b4965] focus:border-transparent"
                    />

                    <p className="px-3 py-2 text-gray-900 border rounded-lg bg-stone-50 border-stone-200">
                      {address.country}
                    </p>
     
                </div>
              </div>
            </div>



            {/* Account Security Section */}
            <div className="p-6 bg-white border shadow-sm rounded-xl border-stone-200">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <Shield className="text-[#1b4965]" size={20} />
                Account Security
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-stone-50 border-stone-200">
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-600">Last updated 3 months ago</p>
                  </div>
                  <button className="px-4 py-2 text-[#1b4965] border border-[#1b4965] rounded-lg hover:bg-[#1b4965] hover:text-white transition-colors font-medium">
                    Change Password
                  </button>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
