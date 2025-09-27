import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from 'react-hot-toast';


const AddAddressModal = ({ onClose,onAddressSaved  }) => {
  const [defaultShipping, setDefaultShipping] = useState(false);
  const { user } = useAuth();
  const [address, setAddress] = useState({
    contactName: "",
    mobile: "",
    street: "",
    apt: "",
    province: "",
    city: "",
    area: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);

  const userId = user.id;

  // ✅ Fetch address if exists
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/address/${userId}`)
      .then((res) => {
        if (res.data) {
          setAddress(res.data); // pre-fill form
        }
      })
      .catch((err) => {
        console.log("No address yet:", err.response?.data || err.message);
      });
  }, [userId]);

  console.log(address)

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const phoneRegex = /^[07][0-9]{9}$/;
  if (!phoneRegex.test(address.phone)) {
    toast.error("Please enter a valid Sri Lankan mobile number (9 digits, starts with 0 or 7)");
    setLoading(false);
    return;
  }

  try {
    const res = await axios.post(
      `http://localhost:8080/api/address/${userId}`,
      { ...address, defaultShipping }
    );
    toast.success("Address saved successfully!"); 
    
    // ✅ send new address to parent
    if (onAddressSaved) {
      onAddressSaved(res.data);
    }

    onClose(); 
  } catch (err) {
    toast.error("Error saving address!");
    console.error(err);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="
  text-2xl 
  font-bold 
  text-center 
  mb-6 
  text-gray-800 
  tracking-wide 
  uppercase
  drop-shadow-sm
">
  {address.id ? "Edit Address" : "Add New Address"}
</h2>


        <form onSubmit={handleSubmit}>
          {/* Country/Region */}
          <div className="mb-6">
            <label className="block font-medium text-sm mb-2">
              Country/region
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <img
                src="https://flagcdn.com/w40/lk.png"
                alt="Sri Lanka"
                className="w-6 h-4 rounded mr-2"
              />
              <select className="w-full outline-none">
                <option>Sri Lanka</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <label className="block font-medium text-sm mb-2">
              Contact information
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                name="contactName"
                value={address.contactName}
                onChange={handleChange}
                placeholder="Contact name*"
                className="col-span-2 border p-2 rounded-lg text-sm"
                required
              />
              <div className="flex">
                <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg text-sm text-gray-700">
                  +94
                </span>
                <input
                  type="text"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="Mobile number*"
                  className="flex-1 border rounded-r-lg p-2 text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block font-medium text-sm mb-2">Address</label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleChange}
                placeholder="Street address*"
                className="border p-2 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                name="apt"
                value={address.apt}
                onChange={handleChange}
                placeholder="Apt, suite, unit, etc (optional)"
                className="border p-2 rounded-lg text-sm"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <select
                name="state"
                value={address.state}
                onChange={handleChange}
                className="border p-2 rounded-lg text-sm"
              >
                <option value="">Select Province</option>
                <option value="Central">Central Province</option>
                <option value="Eastern">Eastern Province</option>
                <option value="North Central">North Central Province</option>
                <option value="Northern">Northern Province</option>
                <option value="North Western">North Western Province</option>
                <option value="Sabaragamuwa">Sabaragamuwa Province</option>
                <option value="Southern">Southern Province</option>
                <option value="Uva">Uva Province</option>
                <option value="Western">Western Province</option>
              </select>

              <select
                name="city"
                value={address.city}
                onChange={handleChange}
                className="border p-2 rounded-lg text-sm"
              >
                <option value="">Select District</option>
                {/* Central Province */}
                <option value="Kandy">Kandy</option>
                <option value="Matale">Matale</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>

                {/* Eastern Province */}
                <option value="Ampara">Ampara</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Trincomalee">Trincomalee</option>

                {/* North Central Province */}
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Polonnaruwa">Polonnaruwa</option>

                {/* Northern Province */}
                <option value="Jaffna">Jaffna</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mannar">Mannar</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Vavuniya">Vavuniya</option>

                {/* North Western Province */}
                <option value="Kurunegala">Kurunegala</option>
                <option value="Puttalam">Puttalam</option>

                {/* Sabaragamuwa Province */}
                <option value="Kegalle">Kegalle</option>
                <option value="Ratnapura">Ratnapura</option>

                {/* Southern Province */}
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Hambantota">Hambantota</option>

                {/* Uva Province */}
                <option value="Badulla">Badulla</option>
                <option value="Monaragala">Monaragala</option>

                {/* Western Province */}
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
              </select>

              <input
                type="text"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                placeholder="ZIP code*"
                className="border p-2 rounded-lg text-sm"
                required
              />
            </div>
          </div>

          {/* Default Shipping */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={defaultShipping}
              onChange={() => setDefaultShipping(!defaultShipping)}
              className="mr-2"
            />
            <label className="text-sm">Set as default shipping address</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className=" bg-[#1b4765] 
              text-white 
              px-6 
              py-2 
              rounded-full 
              font-medium 
              shadow-md 
              hover:bg-[#164158] 
              hover:scale-105 
              transition 
              duration-300 
              ease-in-out
              focus:outline-none 
              focus:ring-2 
              focus:ring-red-400"
            >
              {loading ? "Saving..." : "Confirm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddAddressModal;
