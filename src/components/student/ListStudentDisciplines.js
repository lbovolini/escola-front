import React, { Component } from 'react'

import { getUserId } from "../../services/auth"

import StudentService from "../../services/student-service"

export default class ListStudentDisciplines extends Component {
    constructor(props) {
        super(props)

        this.state = {
            disciplines: []
        }
    }

    componentDidMount() {
        const userId = getUserId()
        StudentService.getDisciplines(userId)
            .then(disciplines => this.setState({ disciplines: disciplines.data }))
            .catch(e => console.log(e))
    }

    render() {
        const { disciplines } = this.state

        return (
            <div class="list-group">
                {disciplines.map(discipline => (
                    <button type="button" class="list-group-item list-group-item-action">{discipline.name}</button>
                ))}
            </div>
        )
    }
}