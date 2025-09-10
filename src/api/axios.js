import axios from "axios";

const api = axios.create({
  baseURL:"https://youtube-clone-be-final.onrender.com/api",
});

// Add Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
