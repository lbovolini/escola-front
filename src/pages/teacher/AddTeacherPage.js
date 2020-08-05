import React, { Component } from "react"

import TeacherForm from "../../components/teacher/TeacherForm"

export default class AddTeacherPage extends Component {
    render() {
        return (
            <TeacherForm history={this.props.history}/>
        )
    }
}