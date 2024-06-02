import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../utils/constants";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default api;
