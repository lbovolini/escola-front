import React, { Component } from "react"

import CourseDataService from "../services/course"
import StudentDataService from "../services/student"
import { validate } from "../validate/student"

import "./Register.css"

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeBirthday = this.onChangeBirthday.bind(this)
        this.onChangeCourse = this.onChangeCourse.bind(this)

        this.state = {
            name: "",
            email: "",
            password: "",
            birthday: "",
            cursoDTO: 0,
            courses: [],
            errors: {},
            validated: false
        }
    }

    componentDidMount() {
        CourseDataService.getAll()
            .then(response => this.setState({ courses: response.data }))
            .catch(e => console.log(e))

    }

    save() {
        const { name, email, password, birthday, cursoDTO } = this.state
        const student = {
            name,
            email,
            password,
            birthday,
            cursoDTO: parseInt(cursoDTO)
        }
       
        const { errors, hasError } = validate(student)
        this.setState({ errors })
        this.setState({ validated: true })

        if (hasError) { return }

        StudentDataService.create(student)
            .then(() => this.props.history.push("/login"))
            .catch(e => console.log(e))
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onChangeBirthday(e) {
        this.setState({ birthday: e.target.value })
    }

    onChangeCourse(e) {
        this.setState({ cursoDTO: e.target.value })
    }

    render() {
        const options = this.state.courses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)
        const errors = this.state.errors
        const validated = this.state.validated
        const name = errors.name ? "is-invalid" :  "is-valid"
        const email = errors.email ? "is-invalid" : "is-valid"
        const password = errors.password ? "is-invalid" : "is-valid"
        const birthday = errors.birthday ? "is-invalid" : "is-valid"
        const cursoDTO = errors.cursoDTO ? "is-invalid" : "is-valid"

        return (
            <form className="form-register">
                <div className="input-div mb-3">
                    <label for="nameInput" className="form-label input-label">Name</label>
                    <div className="input-error">
                        <input type="text" className={"form-control " + (validated && name)} id="nameInput" value={this.state.name} onChange={this.onChangeName}/>
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                </div>
                <div className="input-div mb-3">
                    <label for="emailInput" className="form-label input-label">Email address</label>
                    <div className="input-error">
                        <input type="email" className={"form-control " + (validated && email)} id="emailInput" value={this.state.email} onChange={this.onChangeEmail}/>
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                </div>
                <div className="input-div mb-3">
                    <label for="passwordInput" className="form-label input-label">Password</label>
                    <div className="input-error">
                        <input type="password" className={"form-control " + (validated && password)} id="passwordInput" value={this.state.password} onChange={this.onChangePassword}/>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                </div>
                <div className="input-div mb-3">
                    <label for="inputBirthday" className="form-label input-label">Birthday</label>
                    <div className="input-error">
                        <input type="date" className={"form-control " + (validated && birthday)} id="inputBirthday" value={this.state.birthday} onChange={this.onChangeBirthday}/>
                        {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
                    </div>
                </div>
                <div className="input-div mb-3">
                    <label for="inputCourse" className="form-label input-label">Course</label>
                    <div className="input-error">
                        <select id="inputCourse" className={"form-control " + (validated && cursoDTO)}  value={this.state.cursoDTO} onChange={this.onChangeCourse} defaultValue={"0"}>
                            <option value="0" disabled>Choose a Course</option>
                            {options}
                        </select>
                        {errors.cursoDTO && <div className="invalid-feedback">{errors.cursoDTO}</div>}
                    </div>
                </div>
                <div className="float-right">
                    <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
                </div>
            </form>
        )
    }
}