import React, { Component } from "react"

import StudentProfileForm from "../../components/student/StudentProfileForm"

export default class StudentProfilePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <StudentProfileForm id={this.props.match.params.id} history={this.props.history}/>
        )
    }
}