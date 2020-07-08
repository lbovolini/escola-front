import React, { Component } from "react"
import api from "../api/http-common"
import { login } from "../services/auth"

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"

import { isEmail } from "validator"

import "./Login.css"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)

        this.state = {
            email: "",
            password: ""
        }
    }

    handleLogin = async e => {
        e.preventDefault()
        const { email, password } = this.state

        try {
            const response = await api.post("/login", { email, password })
            login(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    required = value => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            )
        }
    }

    email = value => {
        if (!isEmail(value)) {
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid email.
                </div>
            )
        }
    }

    render() {
        return (
            <div className="body-signin ">
            <div className="text-center">
                <form className="form-signin" onSubmit={this.handleLogin}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus 
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[this.required, this.email]}
                    />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[this.required]}
                    />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                </form>
            </div>
            </div>
        )
    }
}