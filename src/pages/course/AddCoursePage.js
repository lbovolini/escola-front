import React, { Component } from "react"

import CourseForm from "../../components/course/CourseForm"

export default class AddCoursePage extends Component {
    render() {
        return (
            <CourseForm history={this.props.history}/>
        )
    }
}