import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND || "https://snmc-server.onrender.com";

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
