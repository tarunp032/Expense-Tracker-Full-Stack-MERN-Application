import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// AUTH APIs
export const signupUser = (data) => api.post("/auth/signup", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const verifyOTP = (data) => api.post("/auth/verify-otp", data);
export const getProfile = () => api.get("/auth/profile");
export const updateProfile = (data) => api.put("/auth/profile", data);
export const logoutUser = () => api.post("/auth/logout");

// TRANSACTION APIs
export const addTransaction = (data) => api.post("/transactions", data);
export const getTransactions = () => api.get("/transactions");
export const getTransactionById = (id) => api.get(`/transactions/${id}`);
export const updateTransaction = (id, data) =>
  api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
export const getSummary = () => api.get("/transactions/summary");

export default api;
