import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.jwt) {
    config.headers.Authorization = `Bearer ${user.jwt}`;
  }
  return config;
});

export default api;