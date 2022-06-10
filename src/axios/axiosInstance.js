import axios from "axios";
const BASE_URL = "http://localhost:4000";
const Instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
export const PrivateInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default Instance;
