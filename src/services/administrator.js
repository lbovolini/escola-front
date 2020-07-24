import http from "../api/http-common"

class AdministratorDataService {
    
    login(credentials) {
        return http.post("/administrator/login", credentials)
    }
}

export default new AdministratorDataService()