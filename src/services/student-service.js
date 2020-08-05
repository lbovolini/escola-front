import http from "../api/http-common"

class StudentService {

    api = "/api/v1/alunos"

    create(data) {
        return http.post("/signup/students", data)
    }

    delete(id) {
        return http.delete(`${this.api}/${id}`, id)
    }

    get(id) {
        return http.get(`${this.api}/${id}`)
    }

    getDisciplines(id) {
        return http.get(`${this.api}/${id}/disciplinas`)
    }

    login(credentials) {
        return http.post("/student/login", credentials)
    }

    update(student) {
        return http.put(`${this.api}`, student)
    }

    updateProfile(student) {
        return http.put(`${this.api}/profile`, student)
    }

}

export default new StudentService()