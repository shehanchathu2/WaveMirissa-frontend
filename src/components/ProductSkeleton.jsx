import React from "react";

const ProductSkeleton = () => {
  const items = Array(8).fill(0); // Show 8 placeholders

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
      {items.map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex flex-col space-y-3 rounded-2xl bg-white p-3 shadow"
        >
          <div className="bg-gray-300 h-40 w-full rounded-xl"></div>
          <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
          <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
