import React, { Component } from "react"
import CourseService from "../../services/course"

export default class AddCourse extends Component {
    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this)
        this.save = this.save.bind(this)

        this.state = {
            id: null,
            name: ""
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    save() {
        const data = {
            name: this.state.name
        }

        CourseService.create(data)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
          <div className="submit-form">
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                  />
                </div>
    
                <button onClick={this.save} className="btn btn-success">
                  Submit
                </button>
              </div>
            
          </div>
        );
    }
}