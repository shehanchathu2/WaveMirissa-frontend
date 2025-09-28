import React, { useState, useRef } from "react";

const ZoomImage = ({ src, width = 400, height = 400, zoom = 2 }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border rounded-2xl shadow-md cursor-zoom-in"
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      {/* Normal Image */}
      <img
        src={src}
        alt="Product"
        className={`w-full h-full object-cover ${isZoomed ? "opacity-50" : "opacity-100"}`}
      />

      {/* Zoomed Layer */}
      {isZoomed && (
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: backgroundPosition,
          }}
        />
      )}
    </div>
  );
};

export default ZoomImage;
