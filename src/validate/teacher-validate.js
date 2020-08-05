export const validate = (teacher) => {

    var hasError = false
    const errors = {}

    if (!teacher.name || !teacher.name.length) {
        errors.name = "Name is required"
    }

    if (!teacher.email || !teacher.email.length) {
        errors.email = "Email is required"
    }

    if (teacher.email && !/^\S+@\S+$/.test(teacher.email)) {
        errors.email = "Invalid email address"
    }

    if (!teacher.password || !teacher.password.length) {
        errors.password = "Password is required"
    }

    if (teacher.password && !/^(?=.*[\d])(?=.*[a-z])[\w!@#$%^&*()-=+,.;:]{8,}$/.test(teacher.password)) {
        errors.password = "Minimum eight characters, at least one letter and one number"
    } 

    for (let error in errors) {
        hasError = true;
        break;
    }

    return { errors, hasError }
}