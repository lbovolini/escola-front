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
    console.log(error.response)
    if (!error.response) {
        swal("Error!", "Something went wrong", "error");
        return Promise.reject(error)
    }

    const status = error.response.status;
  
    if (status === 400) {
        history.push("/400")
    }
    else if (status === 401) {
        history.push("/login")
    }
    else if (status === 403) {
        swal("Error!", "You do not have permission", "error");
    }
    else if (status === 404) {
        history.push("/404")
    }
    else if (status === 500) {
        if (error.response.data.message) {
            swal("Error!", error.response.data.message, "error");
        } else {
            history.push("/500")
        }
    }
    else {
        swal("Error!", "Something went wrong", "error");
    }

    return Promise.reject(error)
})

export default api