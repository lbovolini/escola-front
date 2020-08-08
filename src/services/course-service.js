import http from "../api/http-common"

class CourseService {

    api = "/api/v1/cursos"

    create(course) {
        return http.post(this.api, course)
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

    update(course) {
        return http.put(this.api, course)
    }
}

export default new CourseService()