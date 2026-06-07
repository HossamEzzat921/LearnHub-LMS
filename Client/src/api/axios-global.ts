import axios from "axios";
import { store } from "../store/store";
import { setCredentials, logOut } from "../features/auth/authSlice";

const axiosPublic = axios.create({
  baseURL: "http://localhost:3500",
  withCredentials: true,
});

axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosPublic.get("/auth/refresh");

        const newAccessToken = res.data.accessToken;

        store.dispatch(
          setCredentials({
            accessToken: newAccessToken,
            user: store.getState().auth.user,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (err) {
        store.dispatch(logOut({}));
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);