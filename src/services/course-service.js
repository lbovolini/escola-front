import http from "../api/http-common"

class CourseService {

    api = "/api/v1/cursos"

    create(data) {
        return http.post(`${this.api}`, data)
    }

    delete(id) {
        return http.delete(`${this.api}/${id}`)
    }

    get(id) {
        return http.get(`${this.api}/${id}`)
    }

    getAll() {
        return http.get("/signup/courses")
    }

    update(id, data) {
        return http.put(`${this.api}/${id}`, data)
    }
}

export default new CourseService()