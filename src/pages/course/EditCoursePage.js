import React, { Component } from "react"

import CourseForm from "../../components/course/CourseForm"

export default class EditCoursePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <CourseForm id={this.props.match.params.id}/>
            </div>
        )
    }
}