export const handleErrors = (e) => {
    if (!e || !e.response || !e.response.data || !e.response.data.errors) {
        return
    }
    const errorResponse = e.response.data.errors
    const errors = {}
    for (const error of errorResponse) {
        errors[error.field] = error.error
    }

    return errors
}