import axios from './axiosConfig.js';

export const getBlogs = async () => {
  const response = await axios.get('/api/blogs');
  return response.data;
};

export const createBlog = async (payload) => {
  const response = await axios.post('/api/blogs', payload);
  return response.data;
};

export const updateBlog = async (id, payload) => {
  const response = await axios.put(`/api/blogs/${id}`, payload);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`/api/blogs/${id}`);
  return response.data;
};
