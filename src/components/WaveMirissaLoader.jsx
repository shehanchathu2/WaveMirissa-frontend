import React from 'react';
import { motion } from 'framer-motion';


const WaveMirissaLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="relative">
        {/* Main Logo Animation */}
        <div className="relative w-40 h-40 mb-8">
          {/* Hexagonal rotating frame */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-36 h-36 border-4 border-transparent border-t-purple-400 border-r-pink-400 border-b-indigo-400 rounded-full opacity-60"></div>
          </motion.div>
          
          {/* Inner pulsing rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              <div 
                className={`w-${28 - i * 4} h-${28 - i * 4} border-2 rounded-full`}
                style={{
                  borderColor: i === 0 ? 'rgba(147, 51, 234, 0.4)' : 
                              i === 1 ? 'rgba(236, 72, 153, 0.4)' : 
                              'rgba(79, 70, 229, 0.4)'
                }}
              ></div>
            </motion.div>
          ))}
          
          {/* Center logo with name */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex flex-col items-center justify-center shadow-2xl"
                animate={{
                  borderRadius: ["16px", "50%", "20px", "16px"],
                  background: [
                    "linear-gradient(135deg, #8b5cf6, #ec4899, #6366f1)",
                    "linear-gradient(225deg, #ec4899, #6366f1, #8b5cf6)",
                    "linear-gradient(315deg, #6366f1, #8b5cf6, #ec4899)",
                    "linear-gradient(45deg, #8b5cf6, #ec4899, #6366f1)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="text-center"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="text-white font-bold text-xl leading-none"
                    animate={{
                      opacity: [0.9, 1, 0.9],
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.5)",
                        "0 0 20px rgba(255,255,255,0.8)",
                        "0 0 10px rgba(255,255,255,0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    WM
                  </motion.div>
                  <motion.div
                    className="text-white/95 font-medium text-[8px] leading-tight tracking-widest mt-0.5"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      letterSpacing: ["0.1em", "0.15em", "0.1em"]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <div>WAVE</div>
                    <div className="mt-[-2px]">MIRISSA</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                backgroundColor: ['#8b5cf6', '#ec4899', '#6366f1'][i % 3],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.4,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Orbiting elements */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
              style={{
                transform: `rotate(${i * 90}deg) translateY(-60px)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WaveMirissaLoader;