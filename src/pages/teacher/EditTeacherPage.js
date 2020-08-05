import React, { Component } from "react"

import TeacherForm from "../../components/teacher/TeacherForm"

export default class EditTeacherPage extends Component {
    render() {
        return (
            <TeacherForm id={this.props.match.params.id} history={this.props.history}/>
        )
    }
}