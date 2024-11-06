import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1/categories';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const addCategory = async (name) => {
  try {
    const response = await axios.post(BASE_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { name });
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
