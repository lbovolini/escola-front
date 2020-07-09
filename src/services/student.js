import http from "../api/http-common"

class StudentDataService {

    create(data) {
        return http.post("/api/v1/alunos", data)
    }

}

export default new StudentDataService()