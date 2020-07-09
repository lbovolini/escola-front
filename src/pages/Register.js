import React, { Component } from "react"

import StudentDataService from "../services/student"

import "./Register.css"

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.save = this.save.bind(this)

        this.state = {
            name: "",
            email: "",
            password: "",
            birthday: "",
            cursoDTO: 7
        }
    }

    componentDidMount() {

    }

    save() {
        StudentDataService.create(this.state).then(data => console.log(data))
    }

    render() {
        return (
            <div class="container">
            <section class="jumbotron text-center">
              <div class="container">
                <h1 class="jumbotron-heading">Student Registration</h1>
              </div>
            </section>
            <form className="form-register">
                <div className="input-div mb-3">
                  <label for="nameInput" className="form-label input-label">Name</label>
                  <input type="text" className="form-control" id="nameInput"/>
                </div>
                <div className="input-div mb-3">
                    <label for="emailInput" className="form-label input-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput"/>
                </div>
                <div className="input-div mb-3">
                    <label for="passwordInput" className="form-label input-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput"/>
                </div>
                <div className="input-div mb-3">
                    <label for="inputBirthday" className="form-label input-label">Birthday</label>
                    <input type="date" className="form-control" id="inputBirthday"/>
                </div>
                <div className="float-right">
                  <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
                </div>
            </form>
            <footer class="text-muted">
              <div class="container">
                <p class="float-right">
                  <a href="#">Back to top</a>
                </p>
                <p>Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
                <p>New to Bootstrap? <a href="../../">Visit the homepage</a> or read our <a href="../../getting-started/">getting started guide</a>.</p>
              </div>
            </footer>
            </div>
        )
    }
}