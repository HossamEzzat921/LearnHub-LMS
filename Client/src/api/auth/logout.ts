import axios from "axios";


export const logout = async () => {
  try {
    const response = await axios.post(
      "/auth/logout",
      {},
      {
        withCredentials: true, // sends the cookie
      }
    );

    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};