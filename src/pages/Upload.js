// src/pages/Upload.js
import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import axios from 'axios';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hash, setHash] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setHash(response.data.hash);
        setSuccess(true);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      alert('Please select a file first');
    }
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <FileUploader onFileSelect={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
      {success && (
        <div>
          <p>File uploaded successfully!</p>
          <p>IPFS Hash: {hash}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;

