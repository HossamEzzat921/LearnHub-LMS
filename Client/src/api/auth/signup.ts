import axios from "axios";

export const signup = async (data) => {
  const response = await axios.post("/auth/register", {
    username: data.username,
    password: data.password,
    role: data.selectedRole,
    email: data.email,
  });

  return response.data;
};