import http from "../api/http-common"

class StudentDataService {

    create(data) {
        return http.post("/signup/students", data)
    }

}

export default new StudentDataService()