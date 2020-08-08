import React, { Component } from "react"

import StudentService from "../../services/student-service"
import { validate } from "../../validate/student-validate"

export default class StudentProfileForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            name: "",
            email: "",
            password: "",
            newPassword: "",
            birthday: "",
            errors: {},
            validated: false,
        }
    }

    componentDidMount() {
        const id = this.props.id

        this.setState({ id })

        StudentService.get(id)
            .then(response => response.data)
            .then(student => this.setState({ 
                id: student.id,
                name: student.name,
                email: student.email,
                birthday: this.getDate(student.birthday),
            }))
    }

    getDate = (date) => {
        const year = date[0]
        const month = date[1] < 10 ? "0" + date[1] : date[1]
        const day = date[2] < 10 ? "0" + date[2] : date[2]

        return year + "-" + month + "-" + day
    }

    onSave = () => {
        const { id, name, email, password, newPassword, birthday } = this.state
        const student = {
            id,
            name,
            email,
            password,
            newPassword,
            birthday,
        }
       
        const { errors, hasError } = validate(student)
        this.setState({ errors })
        this.setState({ validated: true })

        if (hasError) { return }

        StudentService.updateProfile(student)
            .then(() => this.props.history.push("/"))
            .catch(e => console.log(e))
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

    onChangeNewPassword = (e) => {
        this.setState({ newPassword: e.target.value })
    }

    onChangeBirthday = (e) => {
        this.setState({ birthday: e.target.value })
    }


    render() {
        const errors = this.state.errors
        const validated = this.state.validated
        const name = errors.name ? "is-invalid" :  "is-valid"
        const email = errors.email ? "is-invalid" : "is-valid"
        const password = errors.password ? "is-invalid" : "is-valid"
        const newPassword = errors.newPassword ? "is-invalid" : "is-valid"
        const birthday = errors.birthday ? "is-invalid" : "is-valid"

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
                    <label htmlFor="inputBirthday" className="form-label input-label">Birthday</label>
                    <div className="input-error">
                        <input type="date" className={"form-control " + (validated && birthday)} id="inputBirthday" value={this.state.birthday} onChange={this.onChangeBirthday}/>
                        {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
                    </div>
                </div>
                <div className="password-group">
                    <div className="input-div">
                        <label htmlFor="inputCurrentPassword" className="form-label input-label">Current Password</label>
                        <div className="input-error">
                            <input type="password" className={"form-control " + (validated && password)} id="inputCurrentPassword" value={this.state.password} onChange={this.onChangePassword}/>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    </div>
                    <div className="input-div">
                        <label htmlFor="inputNewPassword" className="form-label input-label">New Password</label>
                        <div className="input-error">
                            <input type="password" className={"form-control " + (validated && newPassword)} id="inputNewPassword" value={this.state.newPassword} onChange={this.onChangeNewPassword}/>
                            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                        </div>
                    </div>
                </div>
                <div className="float-right">
                    <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
                </div>
            </form>
        )
    }
}