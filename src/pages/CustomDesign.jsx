// app/components/CustomDesign.jsx

import React, { useState } from "react";
import AddCustomizationModal from "@/components/AddCustomizationModal";
import { Button } from "@/components/ui/button";

const CustomDesign = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalSubmit = (formData) => {
    // TODO: handle submission (e.g., API call or update state)
    console.log("Form Submitted", formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">fff</h1>
      <p className="text-gray-600 mb-6">
        Here you can add, edit, or delete products.
      </p>

      <Button onClick={() => setIsModalOpen(true)}>Add Customization</Button>

      <AddCustomizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default CustomDesign;
