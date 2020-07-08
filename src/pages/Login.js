import React, { Component } from "react"
import api from "../api/http-common"
import { login } from "../services/auth"

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"

import { isEmail } from "validator"

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
            const response = await api.post("http://localhost:8080/webapp/login", { email, password })
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
            <Form
                onSubmit={this.handleLogin}
                ref={ c => {this.form = c}}
            >
                <Input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[this.required, this.email]}
                />
                <Input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[this.required]}
                />
                <button
                    className="btn btn-primary btn-block"
                >
                    Login
                </button>
            </Form>
        )
    }
}