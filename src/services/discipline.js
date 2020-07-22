import http from "../api/http-common"

class DisciplineDataServide {

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

    getClasses(id, groupId) {
        return http.get(`${this.api}/${id}/aulas/${groupId}`)
    }

    update(discipline) {
        return http.put(`${this.api}`, discipline)
    }

}

export default new DisciplineDataServide()