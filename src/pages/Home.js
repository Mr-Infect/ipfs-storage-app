// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>guys we did it</h1>
      <Link to="/upload">Upload a File</Link>
    </div>
  );
}

export default Home;
