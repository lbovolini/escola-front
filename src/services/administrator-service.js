import http from "../api/http-common"

class AdministratorService {
    
    login(credentials) {
        return http.post("/administrator/login", credentials)
    }
}

export default new AdministratorService()