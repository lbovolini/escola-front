export const validate = (student) => {

    var hasError = false
    const errors = {}

    if (!student.name || !student.name.length) {
        errors.name = "Name is required"
    }

    if (!student.email || !student.email.length) {
        errors.email = "Email is required"
    }

    if (student.email && !/^\S+@\S+$/.test(student.email)) {
        errors.email = "Invalid email address"
    }

    if (!student.password || !student.password.length) {
        errors.password = "Password is required"
    }

    if (student.password && !/^(?=.*[\d])(?=.*[a-z])[\w!@#$%^&*()-=+,.;:]{8,}$/.test(student.password)) {
        errors.password = "Minimum eight characters, at least one letter and one number"
    }

    if (student.newPassword && !/^(?=.*[\d])(?=.*[a-z])[\w!@#$%^&*()-=+,.;:]{8,}$/.test(student.newPassword)) {
        errors.newPassword = "Minimum eight characters, at least one letter and one number"
    }

    if (!student.birthday || !student.birthday.length) {
        errors.birthday = "Birthday is required"
    }

    if (student.cursoDTO === 0) {
        errors.cursoDTO = "Select a Course"
    }

    for (let error in errors) {
        hasError = true;
        break;
    }

    return { errors, hasError }
}
