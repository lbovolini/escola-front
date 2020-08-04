import React, { Component } from "react"

import StudentForm from "../../components/student/StudentForm"

export default class EditStudentPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <StudentForm id={this.props.match.params.id} history={this.props.history}/>
        )
    }
}