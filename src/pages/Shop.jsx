import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('All');

  const [gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/product/Allproducts');
        setProducts(res.data);
        console.log("shop",res.data)
        setFilteredProducts(res.data);
        const uniqueCategories = ['All', ...new Set(res.data.map(p => p.category))];
        setCategories(uniqueCategories);

        const uniqueType = ['All', ...new Set(res.data.map(p => p.producttype))];
        setTypes(uniqueType);

        const uniqueMaterials = ['All', ...new Set(res.data.map(p => p.material))];
        setMaterials(uniqueMaterials);

        const uniqueGender = ['All', ...new Set(res.data.map(p => p.gender))];
        setGender(uniqueGender);

      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };




  const handletypeChange = (type) => {
    setSelectedType(type);
    if (type === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.producttype === type));
    }
  };


  const handleMaterials = (material) => {
    setSelectedMaterial(material);
    if (material === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.material === material));
    }
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    if (gender === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.gender === gender));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Title Bar */}
      <div className="text-center py-5 bg-white border-b border-t border-gray-200">

        <h1 className="text-2xl font-bold text-gray-900">Shop All Jewelry</h1>
        <p className="text-sm text-gray-600 mt-2">
          Discover our stunning jewelry collections. Browse and find your perfect piece.
        </p>
        <p className="text-sm text-gray-700 mt-1">Home / Shop</p>
      </div>

      <motion.div
        className="px-20 py-6 grid grid-cols-12 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="col-span-12 lg:col-span-3 w-[18rem] space-y-8 bg-white py-6 px-8 rounded-xl shadow-md" variants={itemVariants}>



          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">Categories</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={() => handleCategoryChange(cat)}
                        className="accent-[#1b4765]"
                      />
                      {cat}
                    </label>
                  </li>
                ))}

              </ul>
            </div>

            {/* Type Filter */}
            <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">Type</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {types.map((t, index) => (
                  <li key={index}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="productType"
                        value={t}
                        checked={selectedType === t}
                        onChange={() => handletypeChange(t)}
                        className="accent-[#1b4765]"
                      />
                      {t}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Material Filter */}
            {/* <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">Material</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {materials.map((m, index) => (
                  <li key={index}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="material"
                        value={m}
                        checked={selectedMaterial === m}
                        onChange={() => handleMaterials(m)}
                        className="accent-[#1b4765]"
                      />
                      {m}
                    </label>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Gender Filter */}
            <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">Gender</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {gender.map((g, index) => (
                  <li key={index}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={selectedGender === g}
                        onChange={() => handleGenderChange(g)}
                        className="accent-[#1b4765]"
                      />
                      {g}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </motion.div>

        <motion.div className="col-span-12 lg:col-span-9 space-y-4" variants={itemVariants}>
          <div className="flex justify-between items-center border bg-white rounded-md px-4 py-2">
            <div className="text-sm text-gray-700">
              Showing <strong>{filteredProducts.length}</strong> products
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              {/* <span>Sort by:</span> */}
              {/* <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select> */}
              <button className="p-1">
                <FaThList className="text-gray-600 hover:text-black" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Link to={`/shop/product/${product.product_id}`} key={product.product_id}>
                <motion.div
                  className="bg-white rounded shadow hover:shadow-lg transition"
                  variants={itemVariants}
                >
                  <div className="relative">
                    <img
                      src={product.image_url1}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded"
                    />
                    <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:text-pink-600">
                      <FiHeart size={16} />
                    </button>
                  </div>
                  <div className="pt-3 px-4 py-4">
                    <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>
                    <div className="flex items-center text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} className={i < 4 ? '' : 'text-gray-300'} />
                      ))}
                      <span className="ml-1 text-gray-500">(12)</span>
                    </div>
                    <p className="text-sm font-bold text-[#1b4765] mt-1">LKR {product.price}</p>
                    {product.available && (
                      <span className="inline-block mt-1 bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="p-2 bg-white shadow rounded-full hover:bg-gray-100">
              <FiChevronLeft size={18} />
            </button>
            <button className="px-4 py-2 bg-[#1b4765]/80 text-white rounded shadow hover:bg-[#1b4765]">1</button>
            <button className="px-4 py-2 border text-gray-700 rounded shadow hover:bg-gray-100">2</button>
            <button className="px-4 py-2 border text-gray-700 rounded shadow hover:bg-gray-100">3</button>
            <button className="p-2 bg-white shadow rounded-full hover:bg-gray-100">
              <FiChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Shop;
