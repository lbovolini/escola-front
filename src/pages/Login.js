import React, { Component } from "react"
import api from "../api/http-common"
import { login } from "../services/auth"

import "./Login.css"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeRole = this.onChangeRole.bind(this)

        this.state = {
            email: "",
            password: "",
            role: "STUDENT"
        }
    }

    login = async e => {
        const { email, password, role } = this.state
        const credentials = {
            email,
            password,
            role
        }

        try {
            const response = await api.post("/student/login", credentials )
            login(response.data, role)
        } catch (err) {
            console.log(err)
        }
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onChangeRole(e) {
        this.setState({ role: e.target.value })
    }

    render() {
        return (
            <div className="body-signin ">
                <form className="form-signin">
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus value={this.state.email} onChange={this.onChangeEmail}/>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                    <div className="radio-input-role">
                        <div className="radio-label">
                            <input className="form-check-input input-radio" type="radio" value="STUDENT" name="role" id="radioStudent" onClick={this.onChangeRole}/>
                            <label for="radioStudent">Student</label>
                        </div>
                        <div className="radio-label">
                            <input className="form-check-input input-radio" type="radio" value="TEACHER" name="role" id="radioTeacher" onClick={this.onChangeRole}/>
                            <label for="radioTeacher">Teacher</label>
                        </div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.login}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                </form>
            </div>
        )
    }
}