import axios from "axios";
import { getToken } from "../services/auth"

const api = axios.create({
  baseURL: "http://localhost:8080/escola-1.0-SNAPSHOT/api/v1/",
  headers: {
    "Content-type": "application/json",
  }
});

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api