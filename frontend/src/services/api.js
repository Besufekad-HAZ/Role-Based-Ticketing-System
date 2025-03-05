import axios from "axios";

const instance = axios.create({
  baseURL: "https://role-based-ticketing-system-0dj7.onrender.com/api",
});

// Automatically attach token to requests if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
