import axios from './axiosConfig.js';

export const getExhibits = async () => {
  const response = await axios.get('/api/exhibits');
  return response.data;
};

export const createExhibit = async (payload) => {
  const response = await axios.post('/api/exhibits', payload);
  return response.data;
};

export const updateExhibit = async (id, payload) => {
  const response = await axios.put(`/api/exhibits/${id}`, payload);
  return response.data;
};

export const deleteExhibit = async (id) => {
  const response = await axios.delete(`/api/exhibits/${id}`);
  return response.data;
};
