import http from "../api/http-common"

class CourseDataService {

    create(data) {
        return http.post("/api/v1/cursos", data)
    }

    delete(id) {
        return http.delete(`/api/v1/cursos/${id}`)
    }

    get(id) {
        return http.get(`/api/v1/cursos/${id}`)
    }

    getAll() {
        return http.get("/signup/courses")
    }

    update(id, data) {
        return http.put(`/api/v1/cursos/${id}`, data)
    }
}

export default new CourseDataService()