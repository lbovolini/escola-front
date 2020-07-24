import React, { Component } from 'react'

import StudentService from "../../services/student"

export default class ListStudentDisciplines extends Component {
    constructor(props) {
        super(props)

        this.state = {
            disciplines: []
        }
    }

    componentDidMount() {
        StudentService.getDisciplines(3)
            .then(disciplines => this.setState({ disciplines: disciplines.data }))
            .catch(e => console.log(e))
    }

    render() {
        const { disciplines } = this.state

        return (
            <div>
                {disciplines.map(discipline => (
                    <div>
                        <li>{discipline.id}</li>
                        <li>{discipline.name}</li>
                    </div>
                ))}
            </div>
        )
    }
}