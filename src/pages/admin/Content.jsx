import React, { useState } from 'react';

const Content = () => {
  const [heroText, setHeroText] = useState('Welcome to Our Jewelry Store');
  const [heroImage, setHeroImage] = useState(null);
  const [banners, setBanners] = useState([]);
  const [scheduledContent, setScheduledContent] = useState([]);

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    setHeroImage(file);
  };

  const handleAddBanner = () => {
    setBanners([...banners, { title: '', image: null }]);
  };

  const handleBannerChange = (index, field, value) => {
    const updated = [...banners];
    updated[index][field] = value;
    setBanners(updated);
  };

  const handleAddSchedule = () => {
    setScheduledContent([
      ...scheduledContent,
      { title: '', startDate: '', endDate: '' },
    ]);
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...scheduledContent];
    updated[index][field] = value;
    setScheduledContent(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Website Content</h1>
      <p className="text-gray-600 mb-6">Update homepage, banners, and schedule promotional content.</p>

      {/* Hero Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Hero Section</h2>
        <label className="block mb-2 font-medium">Hero Text:</label>
        <input
          type="text"
          value={heroText}
          onChange={(e) => setHeroText(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <label className="block mb-2 font-medium">Hero Image:</label>
        <input
          type="file"
          onChange={handleHeroImageChange}
          className="mb-4"
        />
        {heroImage && <p className="text-sm text-green-600">Selected: {heroImage.name}</p>}
      </div>

      {/* Promotional Banners */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Promotional Banners</h2>
        {banners.map((banner, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
            <label className="block mb-1 font-medium">Title:</label>
            <input
              type="text"
              value={banner.title}
              onChange={(e) =>
                handleBannerChange(index, 'title', e.target.value)
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <label className="block mb-1 font-medium">Image:</label>
            <input
              type="file"
              onChange={(e) =>
                handleBannerChange(index, 'image', e.target.files[0])
              }
            />
            {banner.image && (
              <p className="text-sm text-green-600">Selected: {banner.image.name}</p>
            )}
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddBanner}
        >
          + Add Banner
        </button>
      </div>

      {/* Scheduled Content */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Schedule Content</h2>
        {scheduledContent.map((item, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
            <label className="block mb-1 font-medium">Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) =>
                handleScheduleChange(index, 'title', e.target.value)
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <label className="block mb-1 font-medium">Start Date:</label>
            <input
              type="date"
              value={item.startDate}
              onChange={(e) =>
                handleScheduleChange(index, 'startDate', e.target.value)
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <label className="block mb-1 font-medium">End Date:</label>
            <input
              type="date"
              value={item.endDate}
              onChange={(e) =>
                handleScheduleChange(index, 'endDate', e.target.value)
              }
              className="border p-2 w-full rounded"
            />
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleAddSchedule}
        >
          + Add Scheduled Content
        </button>
      </div>
    </div>
  );
};

export default Content;
