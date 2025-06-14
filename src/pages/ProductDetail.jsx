import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaTruck, FaMoneyBillWave, FaUndo, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SiShell } from "react-icons/si";
import { GiHeartNecklace } from "react-icons/gi";
import { FaRegThumbsUp, FaHandHoldingHeart, FaMagic, FaShieldAlt, FaGift, FaRegUserCircle } from 'react-icons/fa';
import { BiCreditCard } from "react-icons/bi";
import img1 from '../assets/bestSeller/img1.jpg';
import img2 from '../assets/bestSeller/img2.jpg';
import img3 from '../assets/bestSeller/img3.jpg';
import img4 from '../assets/bestSeller/img4.jpg';





const ProductDetail = () => {
    const { productId } = useParams();

    return (
        <div className="grid grid-cols-1 gap-10 p-8 mx-auto max-w-7xl lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
                <img
                    src="https://i.etsystatic.com/22631453/r/il/2bc218/4515072246/il_794xN.4515072246_r92b.jpg"
                    alt="Product"
                    className="w-full shadow-md rounded-2xl"
                />
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((img) => (
                        <div key={img} className="w-16 h-16 bg-gray-200 rounded-lg" />
                    ))}
                </div>
                <div className="max-w-2xl px-4 mx-auto text-gray-800">
                    <h3 className="mb-2 text-xl font-semibold text-teal-700">Product Reviews</h3>

                    <div className="flex items-center p-2 mb-4 text-sm text-teal-800 bg-teal-100 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
          <h2 className="text-xl text-gray-500">
            White & beige color Dangle Shell Earrings
          </h2>
          <h2 className="mb-2 text-3xl">
            Bohemian Style Earrings, Beach Style Earrings
          </h2>
          <div className="flex text-yellow-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p className="mt-4 mb-4 text-2xl font-semibold text-teal-600">
            LKR 800.00
          </p>

          <div className="mb-4 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <SiShell className="text-xl text-black-600" />
              <p className='text-base'>
                <strong>Materials Used:</strong> Coated Shell, Pearl, Zinc Alloy
              </p>
            </div>

            <div className="flex items-center gap-3">
              <GiHeartNecklace className="text-xl text-black-600" />
              <p>
                <strong className='text-base'> Style:</strong> Modern, Dangle Earrings
              </p>
            </div>

                    <div className='flex items-center gap-2'>
                        <FaRegThumbsUp />
                        <p><strong> Best for:</strong> Women</p>
                    </div>

                </div>

                <div className='pt-6 mb-8 border-t border-gray-300'>

                    {/* Customize and Add to Cart buttons */}
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row">
                        <button className="flex-2 bg-[#1b4965]/90 text-white text-lg px-6 py-2 rounded-lg shadow hover:bg-[#1b4965] transition duration-300">
                            Customize
                        </button>
                        <button className="flex-2 border border-[#1b4965] text-[#1b4965] text-lg px-6 py-2 rounded-lg hover:bg-[#a8d1eb]/60 transition duration-300">
                            Add to Cart
                        </button>
                    </div>

                    {/* Buy Now button */}
                    <div>
                        <button className="w-[290px] bg-[#1b4965]/90 text-white text-lg px-6 py-2 rounded-lg shadow hover:bg-[#1b4965] transition duration-300">
                            Buy Now
                        </button>
                    </div>

                </div>

                <div className="bg-white p-6 rounded-lg shadow text-[#1B4D3E]">
                    <h2 className="mb-4 font-semibold text-md">Wave Mirissa’s Highlights</h2>
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
                    <ul className="space-y-1 text-sm">
                        <li><FaTruck className="inline text-[#1B4D3E] mr-1" /> Orders will be Delivered within 10-21 days</li>
                        <li><FaUndo className="inline text-[#1B4D3E] mr-1" /> Cancellation of orders are allowed only within 24 h</li>
                        <li><FaMoneyBillWave className="inline text-[#1B4D3E] mr-1" />Pre-order Only</li>
                        <li><BiCreditCard className="inline text-[#1B4D3E] mr-1" /> Cash Deposit Only</li>
                    </ul>
                </div>
            </div>


            {/* You May Also Like Section */}
            <div className="mt-10 lg:col-span-2">
                <h3 className="mb-4 text-2xl font-bold">You may also like</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="p-3 transition border rounded-xl hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src="https://i.etsystatic.com/22631453/r/il/2bc218/4515072246/il_794xN.4515072246_r92b.jpg"
                                alt="Suggested Product"
                                className="object-cover w-full h-32 rounded-lg"
                            />
                            <p className="mt-2 text-sm">Ceramic Whisper</p>
                            <p className="text-sm font-semibold text-green-600">In Stock</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
