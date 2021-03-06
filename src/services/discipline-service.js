import http from "../api/http-common"

class DisciplineServide {

    api = "/api/v1/disciplinas"

    create(discipline) {
        return http.post(`${this.api}`, discipline)
    }

    delete(id) {
        return http.delete(`${this.api}/${id}`)
    }

    get(id) {
        return http.get(`${this.api}/${id}`)
    }

    getClasses(id, studentId) {
        return http.get(`${this.api}/${id}/aulas/${studentId}`)
    }

    update(discipline) {
        return http.put(`${this.api}`, discipline)
    }

}

export default new DisciplineServide()