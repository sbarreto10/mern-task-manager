import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: true,
	headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
  credentials: "include"
});

export default axiosConfig;
