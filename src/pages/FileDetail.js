// src/pages/FileDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FileDetail() {
  const { id } = useParams();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    async function fetchFileData() {
      try {
        const response = await axios.get(`http://localhost:5000/file/${id}`);
        setFileData(response.data);
      } catch (error) {
        console.error('Error fetching file data:', error);
      }
    }

    fetchFileData();
  }, [id]);

  if (!fileData) return <div>Loading...</div>;

  return (
    <div>
      <h1>File Details</h1>
      <p>File Name: {fileData.name}</p>
      <p>IPFS Hash: {fileData.hash}</p>
      <a href={`https://ipfs.io/ipfs/${fileData.hash}`} target="_blank" rel="noopener noreferrer">Download File</a>
    </div>
  );
}

export default FileDetail;
