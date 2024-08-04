import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
