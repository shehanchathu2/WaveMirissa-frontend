import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-8 py-16">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 relative">
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
              Wave
            </span>
            <span className="text-white ml-1 drop-shadow-lg">
              Mirissa
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Handcrafted jewelry inspired by the ocean's beauty. Each piece tells a unique story.
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div className="text-center md:text-left">
            <h4 className="text-teal-300 font-semibold mb-4 text-lg">Shop</h4>
            <div className="space-y-2">
              {["All Products", "Necklaces", "Earrings", "Bracelets"].map((item) => (
                <div key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm block hover:translate-x-1"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="text-center md:text-left">
            <h4 className="text-teal-300 font-semibold mb-4 text-lg">About</h4>
            <div className="space-y-2">
              {["Our Story", "Sustainability", "Artisans", "Blog"].map((item) => (
                <div key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm block hover:translate-x-1"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <h4 className="text-teal-300 font-semibold mb-4 text-lg">Support</h4>
            <div className="space-y-2">
              {["Contact Us", "FAQs", "Shipping", "Returns"].map((item) => (
                <div key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm block hover:translate-x-1"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="text-center md:text-left">
            <h4 className="text-teal-300 font-semibold mb-4 text-lg">Connect</h4>
            <div className="flex justify-center md:justify-start gap-3 mb-4">
              {[
                { icon: FaFacebookF, color: "hover:text-blue-400" },
                { icon: FaInstagram, color: "hover:text-pink-400" },
                { icon: FaPinterestP, color: "hover:text-red-400" },
                { icon: FaTwitter, color: "hover:text-blue-300" }
              ].map(({ icon: Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 ${color} transition-all duration-300 hover:scale-110 hover:bg-slate-700`}
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-sm">
              © 2025 OceanGems. Crafted with ❤️
            </p>

            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-xs">Secure payments</span>
              <div className="flex gap-2">
                {[FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                  >
                    <Icon className="text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;