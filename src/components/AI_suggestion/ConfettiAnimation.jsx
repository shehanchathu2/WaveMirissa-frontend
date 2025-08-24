import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ConfettiAnimation = ({ trigger = false, onComplete }) => {
  const [confetti, setConfetti] = useState([]);

  // Generate random confetti pieces
  const generateConfetti = () => {
    const pieces = [];
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500',
      'bg-teal-500', 'bg-cyan-500', 'bg-lime-500', 'bg-rose-500'
    ];
    
    const shapes = ['square', 'circle', 'triangle', 'rectangle'];
    
    for (let i = 0; i < 100; i++) {
      // Generate random angle for radial distribution
      const angle = (Math.PI * 2 * i) / 100 + Math.random() * 0.8;
      const distance = 150 + Math.random() * 400; // Random distance from center
      
      pieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 10 + 6, // Random size between 6-16px
        initialX: 0, // Start from center
        initialY: 0, // Start from center
        finalX: Math.cos(angle) * distance,
        finalY: Math.sin(angle) * distance,
        rotation: Math.random() * 720, // Multiple rotations
        delay: Math.random() * 0.4, // Stagger the animation
        duration: 1.5 + Math.random() * 20, // Random duration 1.5-3 seconds
      });
    }
    
    return pieces;
  };

  useEffect(() => {
    if (trigger) {
      const newConfetti = generateConfetti();
      setConfetti(newConfetti);
      
      // Clear confetti after animation
      const maxDuration = Math.max(...newConfetti.map(p => p.duration + p.delay));
      setTimeout(() => {
        setConfetti([]);
        if (onComplete) onComplete();
      }, (maxDuration + 0.5) * 10000);
    }
  }, [trigger]);

  const getShapeStyle = (piece) => {
    const baseStyle = {
      width: `${piece.size}px`,
      height: `${piece.size}px`,
    };
    
    switch (piece.shape) {
      case 'circle':
        return { ...baseStyle, borderRadius: '50%' };
      case 'triangle':
        return { 
          ...baseStyle, 
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        };
      case 'rectangle':
        return { 
          width: `${piece.size * 1.5}px`,
          height: `${piece.size * 0.7}px`,
        };
      default: // square
        return baseStyle;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute ${piece.color}`}
          style={{
            ...getShapeStyle(piece),
            left: '50%',
            top: '50%',
            transformOrigin: 'center',
          }}
          initial={{
            x: piece.initialX,
            y: piece.initialY,
            rotate: 0,
            opacity: 1,
            scale: 0,
          }}
          animate={{
            x: piece.finalX,
            y: piece.finalY,
            rotate: piece.rotation,
            opacity: [1, 1, 0.7, 0],
            scale: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.23, 1, 0.32, 1], // Custom easing for natural feel
            opacity: {
              times: [0, 0.3, 0.8, 1],
            },
            scale: {
              times: [0, 0.2, 0.8, 1],
            }
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;

// Demo wrapper to show how to use the component
