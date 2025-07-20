import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaTruck, FaMoneyBillWave, FaUndo, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SiShell } from "react-icons/si";
import { GiHeartNecklace } from "react-icons/gi";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaHandHoldingHeart, FaMagic, FaShieldAlt, FaGift } from 'react-icons/fa';
import { FaRegUserCircle } from "react-icons/fa";
import { BiCreditCard } from "react-icons/bi";
import sampleimg1 from '../assets/sampleProducts/CowrieShell-Black_01.jpeg';
import sampleimg2 from '../assets/sampleProducts/CowrieShell-Black_02.jpeg';
import sampleimg3 from '../assets/sampleProducts/CowrieShell-Black_03.jpg';
import { CustomizationModal } from '../components/ProductPreview/CustomizationModal';
import { SizeSelectionModal } from '../components/ProductPreview/SizeSelectionModal';
import axios from 'axios';


const JewelryItem = {
  id: 'classic-necklace',
  name: 'Cowrie Shell Necklace with Black String',
  basePrice: 800,
  image1: sampleimg1,
  image2: sampleimg2,
  image3: sampleimg3,
  description: 'Bohemian and Beach Style Choker Necklace',
  materials: ['Black String', 'Sea-shells'],
  producttype: 'neckless',
  gender: 'women',

};

const ProductDetail = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1); //quantity state

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [openedViaCustomize, setOpenedViaCustomize] = useState(false);
  const [openedViaAddtoCart, setOpenedViaAddtoCart] = useState(false);

  const [totalPrice, setTotalPrice] = useState(JewelryItem.basePrice);




  const [product, setProduct] = useState([]);


  const ProductImages = [
    sampleimg1,
    sampleimg2,
    sampleimg3
  ];
  const [mainImage, setMainImage] = useState(ProductImages[0]);



 useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/product/${productId}`);
      setProduct(res.data);

      const defaultImg = res.data.image_url1 || res.data.image_url2 || res.data.image_url3;
      setMainImage(defaultImg);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };
  fetchProduct();
}, [productId]);

useEffect(() => {
  console.log('Updated product:', product);
}, [product]);


  const productImages = [product?.image_url1, product?.image_url2, product?.image_url3].filter(Boolean);

const [likeproudct , setLikeProducs] = useState([])


useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/product/Allproducts');
        setLikeProducs(res.data);
        console.log(likeproudct)
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    fetchProducts();
  }, []);













  const handleCustomizeClick = () => {
    setOpenedViaCustomize(false);
    setIsCustomizeOpen(true);
  };

  const handleBuyNowClick = () => {

    setIsSizeModalOpen(true);
    setOpenedViaCustomize(false);
    setOpenedViaAddtoCart(false);
  };

  const handleAddToCart = () => {
    setOpenedViaAddtoCart(true);
    setIsSizeModalOpen(true);
    setOpenedViaCustomize(false);
  };


  const handleCloseCustomize = () => {
    setIsCustomizeOpen(false);
  };

  const handleCloseSizeModal = () => {
    setIsSizeModalOpen(false);
    setOpenedViaAddtoCart(false);
  };

  const handleNext = (calculatedPrice) => {
    setOpenedViaCustomize(true);
    setTotalPrice(calculatedPrice);
    setIsCustomizeOpen(false);

    // Only show size modal for necklaces and rings
    if (JewelryItem.producttype === 'neckless' || JewelryItem.producttype === 'ring') {
      setIsSizeModalOpen(true);
    } else {
      // For other jewelry types, go directly to checkout or next step
      console.log('Proceeding to checkout for', JewelryItem.producttype);
    }
  };

  const handleCheckout = (selectedSize) => {
    console.log('Proceeding to checkout with:', {
      jewelry: JewelryItem.name,
      totalPrice,
      size: selectedSize
    });
    setIsSizeModalOpen(false);
    // redirect to payment gateway
  };

  const handleBackToCustomize = () => {
    setIsSizeModalOpen(false);
    setIsCustomizeOpen(true);

  };







  return (
    <div className="grid grid-cols-1 gap-10 p-8 mx-auto max-w-7xl lg:grid-cols-2">
      {/* Product Images */}



      
      <div className="pl-12 space-y-4">
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            {productImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setMainImage(src)}
                className="object-cover w-16 h-16 rounded-lg cursor-pointer"
              />
            ))}
          </div>

          <img
            src={mainImage}
            alt="Main"
            className="shadow-md w-96 rounded-2xl"
          />
        </div>

        









        <div className="max-w-2xl px-4 mx-auto text-gray-800">
          <h3 className="mb-2 text-xl font-semibold text-teal-700 mt-7">
            Product Reviews
          </h3>

          <div className="flex items-center p-2 mb-4 text-sm text-teal-800 bg-teal-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            All Reviews are from verified purchases
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {[1, 2, 3, 4].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-4 bg-black rounded-lg"
              >
                <img
                  src="/placeholder-image.png"
                  alt="review"
                  className="w-10 h-10"
                />
              </div>
            ))}
          </div>

          {[1, 2, 3].map((review, idx) => (
            <div key={idx} className="flex mb-6 space-x-4">
              <div className="mt-1 text-gray-400">
                <FaRegUserCircle size={24} />
              </div>
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <p className="font-semibold">Yasindu Navodh</p>
                  <span className="text-gray-400">on May 29 2025</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec eget ullamcorper purus. Morbi vel purus purus. Nullam
                  venenatis dui ac facilisis rhoncus. Quisque sed elit
                  facilisis, posuere lectus id, venenatis turpis. Integer nec
                  ante dui.
                </p>
                <div className="mt-1">
                  <img
                    src="/placeholder-image-icon.png"
                    alt="attachment"
                    className="inline-block w-5 h-5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div>
        <h2 className="mb-2 text-3xl ">{product.name}</h2>
        <h2 className="mb-2 text-xl text-gray-500">
          {product.description}
        </h2>
        <div className="flex text-yellow-500">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <p className="mt-4 mb-4 text-2xl font-semibold text-teal-600">
          LKR {product.price}
        </p>

        <div className="mb-4 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <SiShell className="text-xl text-black-600" />
            <p className="text-base">
              <strong>Materials Used:</strong> {JewelryItem.materials[0]},{" "}
              {JewelryItem.materials[1]}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <GiHeartNecklace className="text-xl text-black-600" />
            <p className="capitalize">
              <strong className="text-base"> Category: </strong>
              {product.category}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaRegThumbsUp className="text-xl text-black-600" />
            <p className="capitalize">
              <strong className="text-base"> Best for:</strong>{" "}
              {product.gender}
            </p>
          </div>
        </div>

        <div className="pt-6 mb-8 border-t border-gray-300">
          {/* Quantity Selector */}
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 px-2 py-1 text-center border rounded"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Customize, Add to Cart, and Buy Now buttons */}
          <div className="flex flex-col w-full max-w-md gap-4 mb-6 sm:flex-row sm:items-center">
            <button
              onClick={handleCustomizeClick}
              className="flex-1 bg-[#1b4965]/90 text-white text-lg px-6 py-2 rounded-lg shadow hover:bg-[#1b4965] transition duration-300"
            >
              Customize
            </button>

            <button
              onClick={handleAddToCart}
              className="flex-1 border border-[#1b4965] text-[#1b4965] text-lg px-6 py-2 rounded-lg hover:bg-[#a8d1eb]/60 transition duration-300"
            >
              Add to Cart
            </button>
          </div>

          <div className="w-full max-w-md">
            <button
              onClick={handleBuyNowClick}
              className="w-full bg-[#1b4965]/90 text-white text-lg px-6 py-2 rounded-lg shadow hover:bg-[#1b4965] transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-[#1B4D3E]">
          <h2 className="mb-4 font-semibold text-md">
            Wave Mirissa’s Highlights
          </h2>
          <ul className="space-y-3 text-base text-[#1B4D3E]">
            <li className="flex items-center gap-3 text-xm">
              <FaHandHoldingHeart size={15} />
              Handmade with Love
            </li>
            <li className="flex items-center gap-3">
              <FaTruck size={15} />
              Island wide Delivery
            </li>
            <li className="flex items-center gap-3">
              <FaMagic size={15} />
              Can be Customized
            </li>
            <li className="flex items-center gap-3">
              <FaShieldAlt size={15} />
              Safe Payments
            </li>
            <li className="flex items-center gap-3">
              <FaGift size={15} />
              Gifting
            </li>
          </ul>
        </div>

        <div className="p-4 mt-6 rounded-lg bg-black/5">
          <h4 className="mb-2 font-semibold">Product Purchasing Policies</h4>
          <ul className="space-y-3 text-sm ">
            <li>
              <FaTruck className="inline text-[#1B4D3E] mr-1" /> Orders will
              be Delivered within 14-21 days
            </li>
            <li>
              <FaUndo className="inline text-[#1B4D3E] mr-1" /> Cancellation
              of orders are allowed only within 24 h
            </li>
            <li>
              <FaMoneyBillWave className="inline text-[#1B4D3E] mr-2" />
              Pre-order Only
            </li>
            <li>
              <BiCreditCard className="inline text-[#1B4D3E] mr-1" /> Only
              Online Payments are Accepted
            </li>
          </ul>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="mt-10 lg:col-span-2">
        <h3 className="mb-4 text-2xl font-bold">You may also like</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          
            




           {likeproudct.map((p,i) => (
             <motion.div
               key={i}
               className="p-3 transition border rounded-xl hover:shadow-lg"
               whileHover={{ scale: 1.05 }}
             >
               <img
                 src={p.image_url1}
                 alt={p.name}
                 className="object-cover w-full h-32 rounded-lg"
               />
  
             </motion.div>
          ))}
        </div>
      </div>

      {/* Customization Modal */}
      <CustomizationModal
        isOpen={isCustomizeOpen}
        onClose={handleCloseCustomize}
        jewelry={JewelryItem}
        onNext={handleNext}
        openedViaCustomize={openedViaCustomize}
      />

      {/* Size Selection Modal */}
      <SizeSelectionModal
        isOpen={isSizeModalOpen}
        onClose={handleCloseSizeModal}
        onBack={handleBackToCustomize}
        jewelry={JewelryItem}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
        showBackButton={openedViaCustomize}
        hideCheckoutButton={openedViaAddtoCart}
      />
    </div>
  );
};

export default ProductDetail;