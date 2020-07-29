import React, { Component } from 'react'

import { getUserId } from "../../services/auth"
import { history } from "../../services/history"

import StudentService from "../../services/student-service"

export default class ListStudentDisciplines extends Component {
    constructor(props) {
        super(props)
        this.handleDiscipline = this.handleDiscipline.bind(this)

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

    handleDiscipline(id) {
        history.push(`/class/${id}`)
    }

    render() {
        const { disciplines } = this.state

        return (
            <div className="list-group">
                {disciplines.map(discipline => (
                    <button type="button" className="list-group-item list-group-item-action" onClick={() => this.handleDiscipline(discipline.id)}>{discipline.name}</button>
                ))}
            </div>
        )
    }
}