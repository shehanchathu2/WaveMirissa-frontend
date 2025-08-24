import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";
import GuidelinesModal from "./GuidelinesModal";
import { useState } from "react";

export default function ErrorModal({ error, uploadedImage, handleReset }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-md mx-auto"
        >
            <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

                <div className="p-8 text-center">
                    {/* Animated character */}
                    <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-full"
                        animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-4xl"
                        >
                            🤔
                        </motion.div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-slate-800 mb-3"
                    >
                        Hmm, that didn't work
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 text-base leading-relaxed mb-6"
                    >
                        {error}
                    </motion.p>

                    {/* Suggestions */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-3 mb-8"
                    >
                        <p className="text-sm text-slate-500 font-medium">Here's what you can try:</p>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                           <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={handleReset}
    className="flex items-center space-x-2 p-3 bg-slate-50 rounded-xl cursor-pointer
               border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50
               transition-all duration-200 shadow-sm"
>
    <span className="text-lg">🔄</span>
    <span className="text-slate-700 font-medium">Try again</span>
</motion.div>





                            <div>
                                {/* Get Help Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setIsOpen(true)}
                                    className="flex items-center space-x-2 p-3 bg-slate-50 rounded-xl cursor-pointer 
               border-2 border-slate-200 hover:border-teal-300 hover:bg-teal-50 
               transition-all duration-200 shadow-sm"
                                >
                                    <span className="text-lg">🆘</span>
                                    <span className="text-slate-700 font-medium">Get help</span>
                                </motion.div>


                                {/* Modal */}
                                <GuidelinesModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                            </div>





                        </div>
                    </motion.div>

                    {/* Optional action button */}
                    {uploadedImage && (
                        <motion.button
                            onClick={handleReset}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center px-6 py-3 space-x-3
           rounded-2xl font-semibold text-white
           bg-gradient-to-r from-[#1b4765] via-[#2a5a81] to-[#3b6f9c]
           shadow-md hover:shadow-xl
           hover:from-[#163854] hover:via-[#1f4d72] hover:to-[#2b628d]
           transition-all duration-300 w-full"
                        >
                            <FaUpload className="w-5 h-5 text-white" />
                            <span>Try Again</span>
                        </motion.button>
                    )}
                </div>


                <div className="absolute bottom-4 left-4 opacity-10">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="w-8 h-8"
                    >
                        <div className="w-full h-full bg-gradient-to-br from-emerald-300 to-teal-300 rounded-lg" />
                    </motion.div>
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-xs text-slate-400 mt-4"
            >
                Don't worry, these things happen! We're here to help 💚
            </motion.p>
        </motion.div>
    );
}
