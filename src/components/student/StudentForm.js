import React, { Component } from "react"

import CourseService from "../../services/course-service"
import StudentService from "../../services/student-service"
import { validate } from "../../validate/student-validate"
import { handleErrors } from "../../util/error-util"

export default class StudentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            name: "",
            email: "",
            password: "",
            birthday: "",
            courseId: 0,
            courses: [],
            errors: {},
            validated: false,
        }
    }

    componentDidMount() {
        const id = this.props.id

        if (id) {
            StudentService.get(id)
                .then(response => response.data)
                .then(student => this.setState({ 
                    id: student.id,
                    name: student.name,
                    email: student.email,
                    password: student.password,
                    birthday: this.getDate(student.birthday),
                    courseId: student.courseId
                }))
        }

        CourseService.getAll()
            .then(response => this.setState({ courses: response.data }))
            .catch(e => console.log(e))
    }

    getDate = (date) => {
        const year = date[0]
        const month = date[1] < 10 ? "0" + date[1] : date[1]
        const day = date[2] < 10 ? "0" + date[2] : date[2]

        return year + "-" + month + "-" + day
    }

    onSave = () => {
        const { id, name, email, password, birthday, courseId } = this.state
        const student = {
            id,
            name,
            email,
            password,
            birthday,
            courseId: parseInt(courseId)
        }
       
        const { errors, hasError } = validate(student)
        this.setState({ errors })
        this.setState({ validated: true })

        if (hasError) { return }

        if (this.props.id) {
            StudentService.update(student)
                .then(() => this.props.history.push("/"))
                .catch(handleErrors)
                .then(errors => this.setState({ errors }))
        } 
        else {
            StudentService.create(student)
                .then(() => this.props.history.push("/login"))
                .catch(handleErrors)
                .then(errors => this.setState({ errors }))
        }
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onChangeBirthday = (e) => {
        this.setState({ birthday: e.target.value })
    }

    onChangeCourse = (e) => {
        this.setState({ courseId: e.target.value })
    }

    render() {
        const options = this.state.courses.sort((a, b) => a.name.localeCompare(b.name)).map(course => <option key={course.name} value={course.id}>{course.name}</option>)
        const errors = this.state.errors
        const validated = this.state.validated
        const name = errors.name ? "is-invalid" :  "is-valid"
        const email = errors.email ? "is-invalid" : "is-valid"
        const password = errors.password ? "is-invalid" : "is-valid"
        const birthday = errors.birthday ? "is-invalid" : "is-valid"
        const courseId = errors.courseId ? "is-invalid" : "is-valid"

        return (
            <form className="form-register">
                <div className="input-div">
                    <label htmlFor="nameInput" className="form-label input-label">Name</label>
                    <div className="input-error">
                        <input type="text" className={"form-control " + (validated && name)} id="nameInput" value={this.state.name} onChange={this.onChangeName}/>
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                </div>
                <div className="input-div">
                    <label htmlFor="emailInput" className="form-label input-label">Email address</label>
                    <div className="input-error">
                        <input type="email" className={"form-control " + (validated && email)} id="emailInput" value={this.state.email} onChange={this.onChangeEmail}/>
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                </div>
                <div className="input-div">
                    <label htmlFor="passwordInput" className="form-label input-label">Password</label>
                    <div className="input-error">
                        <input type="password" className={"form-control " + (validated && password)} id="passwordInput" value={this.state.password} onChange={this.onChangePassword}/>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                </div>
                <div className="input-div">
                    <label htmlFor="inputBirthday" className="form-label input-label">Birthday</label>
                    <div className="input-error">
                        <input type="date" className={"form-control " + (validated && birthday)} id="inputBirthday" value={this.state.birthday} onChange={this.onChangeBirthday}/>
                        {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
                    </div>
                </div>
                <div className="input-div">
                    <label htmlFor="inputCourse" className="form-label input-label">Course</label>
                    <div className="input-error">
                        <select id="inputCourse" className={"form-control " + (validated && courseId)}  value={this.state.courseId} onChange={this.onChangeCourse} defaultValue={"0"}>
                            <option value="0" disabled>Choose a Course</option>
                            {options}
                        </select>
                        {errors.courseId && <div className="invalid-feedback">{errors.courseId}</div>}
                    </div>
                </div>
                <div className="float-right">
                    <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
                </div>
            </form>
        )
    }
}