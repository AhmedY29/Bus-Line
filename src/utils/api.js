import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://bus-line-backend.onrender.com/api";

  // we will replace this local link with this https://bus-line-backend.onrender.com/api

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add Authorization token to requests
api.interceptors.request.use(
  (config) => {
    // 1. Get ONLY the token from localStorage
    const token = localStorage.getItem("token");

    // 2. If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 3. The user object is NOT needed here.
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Also remove the token
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;