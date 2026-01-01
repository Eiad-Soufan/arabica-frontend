import axios from "axios";

const base = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

export const api = axios.create({
    baseURL: `${base}/api/`,
    timeout: 20000,
});

export default api;
