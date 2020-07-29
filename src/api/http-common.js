import axios from "axios";
import { getToken, getRole } from "../services/auth"
import { history } from "../services/history"

import swal from 'sweetalert';

const api = axios.create({
    baseURL: "http://localhost:8080/escola-1.0-SNAPSHOT/",
    headers: {
        "Content-type": "application/json",
    }
});

api.interceptors.request.use(async config => {
    
    const token = getToken()
    const role = getRole()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers.Role = role
    }

    return config
})

api.interceptors.response.use(function(response) {
    return response
}, function(error) {
    if (!error.response) {
        return Promise.reject(error)
    }
    const status = error.response.status;
  
    if (status === 400) {
        history.push("/400")
    }

    if (status === 401) {
        history.push("/login")
    }

    if (status === 404) {
        history.push("/404")
    }

    if (status === 500) {
        if (error.response.data.message) {
            swal("Error!", error.response.data.message, "error");
        } else {
            history.push("/500")
        }
    }

    return Promise.reject(error)
})

export default api