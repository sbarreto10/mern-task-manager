import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: true,
});

export default axiosConfig;
