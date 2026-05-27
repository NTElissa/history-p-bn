import axios from './axiosConfig.js';

export const getMessages = async () => {
  const response = await axios.get('/api/messages');
  return response.data;
};

export const createMessage = async (payload) => {
  const response = await axios.post('/api/messages', payload);
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await axios.delete(`/api/messages/${id}`);
  return response.data;
};
