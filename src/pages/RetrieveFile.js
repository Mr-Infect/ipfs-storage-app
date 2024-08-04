// src/pages/RetrieveFile.js
import React, { useState } from 'react';
import axios from 'axios';

function RetrieveFile() {
  const [hash, setHash] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleRetrieve = async () => {
    try {
      const url = `https://ipfs.infura.io/ipfs/${hash}`;
      setFileUrl(url);
    } catch (error) {
      console.error('Error retrieving file:', error);
    }
  };

  return (
    <div>
      <h1>Retrieve File</h1>
      <input
        type="text"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Enter IPFS Hash"
      />
      <button onClick={handleRetrieve}>Retrieve</button>
      {fileUrl && (
        <div>
          <p>File available at:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>
        </div>
      )}
    </div>
  );
}

export default RetrieveFile;
