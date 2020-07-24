import http from "../api/http-common"

class TeacherDataService {

    login(credentials) {
        return http.post("/teacher/login", credentials)
    }
}

export default new TeacherDataService()