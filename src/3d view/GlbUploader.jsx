import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlbViewer from './GlbViewer';
// import GlbViewer from './GlbViewer';

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API = import.meta.env.VITE_CLOUDINARY_API;

const GlbUploader = () => {
  const [url, setUrl] = useState(null); // Initially no model
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a .glb file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_API, formData);
      const uploadedUrl = res.data.secure_url;
      toast.success('GLB file uploaded successfully!');
      setUrl(uploadedUrl); // Update viewer
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Upload .GLB File</h2>
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,model/gltf-binary"
        onChange={handleFileChange}
      />
      <br />
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Uploading...' : 'Upload GLB'}
      </button>

      <ToastContainer position="top-right" autoClose={3000} />

      {url && (
        <div style={{ marginTop: '20px' }}>
          <h1>3D Model Viewer</h1>
          <GlbViewer url={url} />
        </div>
      )}
    </div>
  );
};

export default GlbUploader;
