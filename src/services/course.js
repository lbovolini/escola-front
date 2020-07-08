import http from "../api/http-common"

class CourseDataService {

    create(data) {
        return http.post("/cursos", data)
    }

    delete(id) {
        return http.delete(`/cursos/${id}`)
    }

    get(id) {
        return http.get(`/cursos/${id}`)
    }

    getAll() {
        return http.get("/cursos")
    }

    update(id, data) {
        return http.put(`/cursos/${id}`, data)
    }
}

export default new CourseDataService()