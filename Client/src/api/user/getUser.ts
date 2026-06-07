import axios from "axios";

export const getUser = async (id : string) => {
  try {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};