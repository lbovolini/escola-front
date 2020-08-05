import http from "../api/http-common"

class TeacherService {

    api = "/api/v1/professores"

    create(teacher) {
        return http.post(this.api, teacher)
    }

    delete(id) {
        return http.delete(`${this.api}/${id}`)
    }

    get(id) {
        return http.get(`${this.api}/${id}`)
    }

    login(credentials) {
        return http.post("/teacher/login", credentials)
    }

    update(teacher) {
        return http.put(this.api, teacher)
    }
}

export default new TeacherService()