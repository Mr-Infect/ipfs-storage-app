import React from 'react';

function FileUploader({ onFileSelect }) {
  return (
    <div>
      <input type="file" onChange={(e) => onFileSelect(e.target.files[0])} />
    </div>
  );
}

export default FileUploader;
