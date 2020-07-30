import React, { Component } from "react"
import CourseService from "../../services/course-service"

import { validate } from "../../validate/course-validate"

export default class AddCourse extends Component {
    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.onChangeName = this.onChangeName.bind(this)

        this.state = {
            name: "",
            errors: [],
            validated: false
        }
    }

    save() {
        const { name } = this.state
        const course = {
            name
        }

        const { errors, hasError } = validate(course)
        this.setState({ errors })
        this.setState({ validated: true })

        if (hasError) { return }

        CourseService.create(course)
            .then(response => { console.log(response.data) })
            .catch(e => console.log(e))
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    render() {
        const errors = this.state.errors
        const validated = this.state.validated
        const name = errors.name ? "is-invalid" :  "is-valid"

        return (
            <form className="form-register">
                <div className="input-div">
                    <label htmlFor="nameInput" className="form-label input-label">Name</label>
                    <div className="input-error">
                        <input type="text" className={"form-control " + (validated && name)} id="nameInput" value={this.state.name} onChange={this.onChangeName}/>
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                </div>
                <div className="float-right">
                    <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
                </div>
            </form>
        );
    }
}