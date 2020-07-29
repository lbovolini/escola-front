import React, { Component } from "react"

import { getUserId } from "../../services/auth"

import DisciplineService from "../../services/discipline-service"

export default class ListClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            classes: []
        }
    }

    componentDidMount() {
        const disciplineId = this.props.match.params.id
        const studentId = getUserId()
        DisciplineService.getClasses(disciplineId, studentId)
            .then(response => this.setState({ classes: response.data }))
            .catch(e => console.log(e))
    }

    render() {
        const { classes } = this.state
        
        return (
            <div className="list-group">
                {classes.map(c => (
                    <button type="button" className="list-group-item list-group-item-action">{c.disciplinaId}</button>
                ))}
            </div>
        )
    }
}
