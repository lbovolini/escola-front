import React from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { history } from "./services/history"

import { isAuthenticated } from "./services/auth"

import ListClass from "./components/class/ListClass"

import AddCoursePage from "./pages/course/AddCoursePage"
import EditCoursePage from "./pages/course/EditCoursePage"
import ShowCourse from "./components/course/ShowCourse"

import Login from "./pages/Login"
import Home from "./pages/Home"

import AddStudentPage from "./pages/student/AddStudentPage"
import EditStudentPage from "./pages/student/EditStudentPage"
import StudentProfilePage from "./pages/student/StudentProfilePage"

import AddTeacherPage from "./pages/teacher/AddTeacherPage"
import EditTeacherPage from "./pages/teacher/EditTeacherPage"

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
);
 
const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path={"/"} component={() => <p>Hello</p>}/>

            <PrivateRoute path="/courses/add" component={AddCoursePage}/>
            <PrivateRoute path="/courses/edit/:id" component={EditCoursePage}/>
            <PrivateRoute path="/courses/:id" component={ShowCourse}/>

            <Route path="/students/add" component={AddStudentPage}/>
            <PrivateRoute path="/students/edit/:id" component={EditStudentPage}/>
            <PrivateRoute path="/students/profile/:id" component={StudentProfilePage}/>

            <PrivateRoute path="/teachers/add" component={AddTeacherPage}/> 
            <PrivateRoute path="/teachers/edit/:id" component={EditTeacherPage}/>

            <Route path="/login" component={Login}/>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/class/:id" component={ListClass}/>
            <Route path="/404" component={() => <p>Not found</p>}/>
            <Route path="/500" component={() => <p>Server error</p>}/>
            
        </Switch>
    </Router>
);

export default Routes;

      