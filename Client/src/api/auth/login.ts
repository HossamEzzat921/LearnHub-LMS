import axios from "axios";

export const login = async (data) => {
  try {
    const res = await axios.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login user");
  }
};
