export const validate = (course) => {

    var hasError = false
    const errors = {}

    if (!course.name || !course.name.length) {
        errors.name = "Name is required"
    }

    for (let error in errors) {
        hasError = true;
        break;
    }

    return { errors, hasError }
}