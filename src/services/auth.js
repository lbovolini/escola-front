export const TOKEN_KEY = "token"
export const ROLE_KEY = "role"
export const USER_ID_KEY = "id"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY)

export const isAdmin = () => this.getRole() === "ADMINISTRATOR"

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getRole = () => localStorage.getItem(ROLE_KEY)

export const getUserId = () => localStorage.getItem(USER_ID_KEY)

export const login = (user) => {
    localStorage.setItem(TOKEN_KEY, user.token)
    localStorage.setItem(ROLE_KEY, user.role)
    localStorage.setItem(USER_ID_KEY, user.id)
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    localStorage.removeItem(USER_ID_KEY)
}