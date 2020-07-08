import React, { Component } from "react"
import CourseDataService from "../../services/course"


export default class CursoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cursos: [],
            currentCurso: null,
            currentIndex: -1,
        }
    }

    componentDidMount() {
        this.getAll()
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentCurso: tutorial,
            currentIndex: index
        });
    }

    getAll() {
        CourseDataService.getAll()
            .then(response => {
                this.setState({
                    cursos: response.data
                })
            })
            .catch(e => console.log(e))
    }

    render() {
        const { cursos, currentCurso, currentIndex } = this.state

        return (
            <div className="list row">
              
              <div className="col-md-6">
     
                <ul className="list-group">
                  {cursos &&
                    cursos.map((tutorial, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveTutorial(tutorial, index)}
                        key={index}
                      >
                        {tutorial.name}
                      </li>
                    ))}
                </ul>
      
              </div>
            </div>
          );
    }
}