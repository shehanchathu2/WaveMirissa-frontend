import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ProductSkeleton from '../components/ProductSkeleton';

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
  const { user } = useAuth();
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
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8080/product/AllproductsWithoutPersonality');
        setProducts(res.data);
        console.log("shop", res.data)
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
      } finally {
        setLoading(false);
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




  const [likedProducts, setLikedProducts] = useState([]);


  useEffect(() => {
    if (!user?.id) return;

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/wishlist/${user.id}`);
        const ids = res.data.map((item) => item.productId);
        setLikedProducts(ids);
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
      }
    };

    fetchWishlist();
  }, [user?.id]);


  const toggleLike = async (productId) => {
    if (!user?.id) {
      toast.error("Please log in to use wishlist");
      return;
    }

    const isLiked = likedProducts.includes(productId);

    try {
      if (isLiked) {
        setLikedProducts((prev) => prev.filter((id) => id !== productId));
        await axios.delete('http://localhost:8080/wishlist/remove', {
          params: { userId: user.id, productId },
        });
        toast.success("Removed from wishlist");
      } else {
        setLikedProducts((prev) => [...prev, productId]);
        await axios.post('http://localhost:8080/wishlist/add', {
          userId: user.id,
          productId,
        });
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error("Something went wrong");
    }
  };
  if (loading) return <ProductSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Title Bar */}
      <div className="text-center py-5 bg-white border-b border-t border-gray-200">

        <h1 className="text-2xl font-bold text-gray-900">Shop All Jewelry</h1>
        <p className="text-sm text-gray-600 mt-2">
          Discover our stunning jewelry collections. Browse and find your perfect piece.
        </p>
        {/* <p className="text-sm text-gray-700 mt-1">Home / Shop</p> */}
      </div>

      <motion.div
        className="px-20 py-6 grid grid-cols-12 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="col-span-12 lg:col-span-3 w-[18rem] space-y-8 bg-white py-6 px-8 rounded-xl shadow-md" variants={itemVariants}>



          <div className="space-y-8">
  {/* Category Filter */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-[#1b4765] to-[#2d5a7a] rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-800">Categories</h2>
    </div>
    <ul className="space-y-3">
      {categories.map((cat, index) => (
        <li key={index}>
          <label className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
            <div className="relative">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-[#1b4765] border-[#1b4765]' 
                  : 'border-gray-300 group-hover:border-[#1b4765]'
              }`}>
                {selectedCategory === cat && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className={`text-sm font-medium transition-colors ${
              selectedCategory === cat ? 'text-[#1b4765]' : 'text-gray-700 group-hover:text-[#1b4765]'
            }`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>

  {/* Type Filter */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-[#2d5a7a] to-[#3e6b8a] rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-800">Type</h2>
    </div>
    <ul className="space-y-3">
      {types.map((t, index) => (
        <li key={index}>
          <label className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
            <div className="relative">
              <input
                type="radio"
                name="productType"
                value={t}
                checked={selectedType === t}
                onChange={() => handletypeChange(t)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                selectedType === t 
                  ? 'bg-[#1b4765] border-[#1b4765]' 
                  : 'border-gray-300 group-hover:border-[#1b4765]'
              }`}>
                {selectedType === t && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className={`text-sm font-medium transition-colors ${
              selectedType === t ? 'text-[#1b4765]' : 'text-gray-700 group-hover:text-[#1b4765]'
            }`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>

  {/* Gender Filter */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-[#3e6b8a] to-[#4a7a9a] rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-800">Gender</h2>
    </div>
    <ul className="space-y-3">
      {gender.map((g, index) => (
        <li key={index}>
          <label className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
            <div className="relative">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={selectedGender === g}
                onChange={() => handleGenderChange(g)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                selectedGender === g 
                  ? 'bg-[#1b4765] border-[#1b4765]' 
                  : 'border-gray-300 group-hover:border-[#1b4765]'
              }`}>
                {selectedGender === g && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className={`text-sm font-medium transition-colors ${
              selectedGender === g ? 'text-[#1b4765]' : 'text-gray-700 group-hover:text-[#1b4765]'
            }`}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </span>
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

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <Link to={`/shop/product/${product.uuid}`}
                state={{ productId: product.product_id }}
                key={product.product_id}>
                <motion.div
                  className="bg-white rounded shadow hover:shadow-lg transition relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="relative w-full h-64">
                    {/* First Image */}
                    <motion.img
                      src={product.image_url1}
                      alt={product.name}
                      className="w-full h-full object-cover rounded absolute top-0 left-0"
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Second Image */}
                    <motion.img
                      src={product.image_url2 || product.image_url1} // fallback to first image
                      alt={product.name}
                      className="w-full h-full object-cover rounded absolute top-0 left-0"
                      initial={{ opacity: 0, x: 50 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Like Button */}
                    <motion.button
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow z-50"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLike(product.product_id);
                      }}
                      whileTap={{ scale: 1.2 }}
                    >
                      {likedProducts.includes(product.product_id) ? (
                        <AiFillHeart size={18} className="text-pink-600 transition-all duration-200" />
                      ) : (
                        <FiHeart size={18} className="text-gray-600 transition-all duration-200" />
                      )}
                    </motion.button>
                  </div>

                  <div className="pt-3 px-4 py-4">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                    </h3>
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
          </motion.div>

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
