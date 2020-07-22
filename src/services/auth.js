export const TOKEN_KEY = "token"
export const ROLE_KEY = "role"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY)

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getRole = () => localStorage.getItem(ROLE_KEY)

export const login = (user) => {
    localStorage.setItem(TOKEN_KEY, user.token)
    localStorage.setItem(ROLE_KEY, user.role)
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
}