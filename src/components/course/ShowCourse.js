import React, { Component } from "react"
import CourseService from "../../services/course-service"


export default class ShowCourse extends Component {
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this)
        this.get = this.get.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)

        this.state = {
            course: {
                id: null,
                name: ""
            }
        }
    }

    componentDidMount() {
        this.get(this.props.match.params.id)
    }

    onChangeName(e) {
        const name = e.target.value

        this.setState(prevState => {
            return {
                course: {
                    ...prevState.course,
                    name: name
                }
            }
        })
    }

    get(id) {
        CourseService.get(id)
            .then(response => {
                this.setState({
                    course: response.data
                })
            })
            .catch(e => { console.log(e) })
    }

    update() {
        CourseService.update(this.state.course.id, this.state.course)
            .then(response => console.log(response.data))
            .catch(e => console.log(e))
    }

    delete() {
        CourseService.delete(this.state.course.id)
            .then(response => {
                console.log(response.data)
                this.props.history.push("/courses")
            })
            .catch(e => console.log(e))
    }

    render() {

        const { course } = this.state

        return (
            <div>
                <div className="edit-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" value={course.name} onChange={this.onChangeName} />
                        </div>
                    </form>
                    <button className="badge" onClick={this.update}>Update</button>
                    <button className="badge" onClick={this.delete}>Delete</button>
                </div>
            </div>
        )

    }
}