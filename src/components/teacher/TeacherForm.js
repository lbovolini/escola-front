import React, { Component } from "react"

import TeacherService from "../../services/teacher-service"
import { validate } from "../../validate/teacher-validate"

export default class TeacherForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            name: "",
            email: "",
            password: "",
            errors: {},
            validated: false,
        }
    }

    componentDidMount() {
        const id = this.props.id
        if (id) {
            TeacherService.get(id)
                .then(response => response.data)
                .then(teacher => this.setState({
                    id: teacher.id,
                    name: teacher.name,
                    email: teacher.email
                }))
                .catch(e => console.log(e))
        }
    }

    onSave = () => {
        const { id, name, email, password } = this.state
        const teacher = {
            id,
            name,
            email,
            password,
        }
       
        const { errors, hasError } = validate(teacher)
        this.setState({ errors })
        this.setState({ validated: true })

        if (hasError) { return }

        if (this.props.id) {
            TeacherService.update(teacher)
                .then(() => this.props.history.push("/"))
                .catch(e => console.log(e))
        } 
        else {
            TeacherService.create(teacher)
                .then(() => this.props.history.push("/login"))
                .catch(e => console.log(e))
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

    render() {
        const errors = this.state.errors
        const validated = this.state.validated
        const name = errors.name ? "is-invalid" :  "is-valid"
        const email = errors.email ? "is-invalid" : "is-valid"
        const password = errors.password ? "is-invalid" : "is-valid"

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
                <div className="float-right">
                    <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
                </div>
            </form>
        )
    }
}