import axios from 'axios';

export const searchTickets = async (query) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/search/`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};