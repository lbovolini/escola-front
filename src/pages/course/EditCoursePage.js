import React, { Component } from "react"

import CourseForm from "../../components/course/CourseForm"

export default class EditCoursePage extends Component {
    render() {
        return (
            <div>
                <CourseForm id={this.props.match.params.id} history={this.props.history}/>
            </div>
        )
    }
}