import http from "../api/http-common"

class TeacherService {

    login(credentials) {
        return http.post("/teacher/login", credentials)
    }
}

export default new TeacherService()