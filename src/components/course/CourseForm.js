import React, { Component } from "react"
import CourseService from "../../services/course-service"

import { validate } from "../../validate/course-validate"
import { handleErrors } from "../../util/error-util"

export default class CourseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            name: "",
            errors: [],
            validated: false
        }
    }
    componentDidMount() {
        const id = this.props.id

        if (id) {
            CourseService.get(id)
                .then(response => response.data)
                .then(course => this.setState({ 
                    id: course.id,
                    name: course.name,
                }))
            CourseService.getCurriculum(id)
                .then(response => console.log(response))
                .catch(e => console.log(e))
        }
    }

    onSave = () => {
        const { id, name } = this.state
        const course = {
            id,
            name,
        }

        const { errors, hasError } = validate(course)
        this.setState({ errors })
        this.setState({ validated: true })

        if (hasError) { return }

        if (this.props.id) {
            CourseService.update(course)
                .then(() => this.props.history.push("/"))
                .catch(handleErrors)
                .then(errors => this.setState({ errors }))
        } else {
            CourseService.create(course)
                .then(() => this.props.history.push("/"))
                .catch(handleErrors)
                .then(errors => this.setState({ errors }))
        }
    }

    onChangeName = (e) => {
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
                    <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
                </div>
            </form>
        );
    }
}