import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

function GuidelinesModal({ isOpen, onClose }) {
  const guidelines = [
    "Make sure your Face is clearly visible",
    "Upload a Front-facing photo", 
    "Make sure to have Good lighting for image",
    "No accessories should be worn in image"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📸</div>
                <h2 className="text-xl font-semibold text-gray-800">Photo Guidelines</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Guidelines List */}
            <div className="p-6">
              <ul className="space-y-4">
                {guidelines.map((guideline, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{guideline}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="mx-6 mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <span className="text-amber-600 text-lg">⚠️</span>
                <div>
                  <h3 className="font-medium text-amber-800 mb-1">Privacy Protected</h3>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Your photos are processed securely and never stored permanently.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Features */}
            <div className="px-6 pb-4">
              <div className="flex justify-center space-x-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-green-600 text-sm">🔒</span>
                  </div>
                  <span className="text-xs text-gray-600">Secure</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-blue-600 text-sm">⚡</span>
                  </div>
                  <span className="text-xs text-gray-600">Fast</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-purple-600 text-sm">🤖</span>
                  </div>
                  <span className="text-xs text-gray-600">AI-Powered</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-6 pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GuidelinesModal;