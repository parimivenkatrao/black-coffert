import axios from "axios";

// Vite exposes env vars prefixed with VITE_ to the client
const baseURL = import.meta.env.VITE_API_BASE_URL || "https://backend-1-9gn3.onrender.com/api" //|| "http://localhost:5000/api";

export const api = axios.create({
  baseURL
});
