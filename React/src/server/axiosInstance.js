import axios from "axios";

const token = window.sessionStorage.getItem("access_token");

const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/api",
    timeout: 20000,
});

if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;