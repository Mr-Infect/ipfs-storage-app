import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState('');
  const [downloadHash, setDownloadHash] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setHash(response.data.hash);
      setMessage('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error uploading file.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/download/${downloadHash}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file'); // or extract the filename from response headers
      document.body.appendChild(link);
      link.click();
      setMessage('File downloaded successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error downloading file.');
    }
  };

  return (
    <div className="container">
      <h1>IPFS Storage</h1>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {hash && <p>IPFS Hash: {hash}</p>}
      </div>
      <div className="download-section">
        <input
          type="text"
          placeholder="Enter IPFS hash to download"
          value={downloadHash}
          onChange={(e) => setDownloadHash(e.target.value)}
        />
        <button onClick={handleDownload}>Download</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;

