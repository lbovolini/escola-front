import axios from "axios";
import { getToken } from "../services/auth"
import { history } from "../services/history"

const api = axios.create({
    baseURL: "http://localhost:8080/escola-1.0-SNAPSHOT/",
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

api.interceptors.response.use(function(response) {
    return response
}, function(error) {
    const status = error.response.status;

    if (status === 401) {
        history.push("/login")
    }

    if (status === 404) {
        history.push("/404")
    }

    if (status === 500) {
        history.push("/500")
    }

    return Promise.reject(error)
})

export default api