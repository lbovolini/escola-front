import React, { Component } from "react"

import CourseDataService from "../services/course"
import StudentDataService from "../services/student"

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
            courses: []
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
            cursoDTO
        }

        StudentDataService.create(student)
            .then(data => console.log(data))
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

        return (
            <form className="form-register">
                <div className="input-div mb-3">
                  <label for="nameInput" className="form-label input-label">Name</label>
                  <input type="text" className="form-control" id="nameInput" value={this.state.name} onChange={this.onChangeName}/>
                </div>
                <div className="input-div mb-3">
                    <label for="emailInput" className="form-label input-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" value={this.state.email} onChange={this.onChangeEmail}/>
                </div>
                <div className="input-div mb-3">
                    <label for="passwordInput" className="form-label input-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" value={this.state.password} onChange={this.onChangePassword}/>
                </div>
                <div className="input-div mb-3">
                    <label for="inputBirthday" className="form-label input-label">Birthday</label>
                    <input type="date" className="form-control" id="inputBirthday" value={this.state.birthday} onChange={this.onChangeBirthday}/>
                </div>
                <div className="input-div mb-3">
                    <label for="inputCourse" className="form-label input-label">Course</label>
                    <select id="inputCourse" className="form-control" value={this.state.cursoDTO} onChange={this.onChangeCourse}>
                        {options}
                    </select>
                </div>
                <div className="float-right">
                  <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
                </div>
            </form>
        )
    }
}