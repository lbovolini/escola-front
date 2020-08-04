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
import Register from "./components/student/StudentForm"

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
            <Route exact path={"/"} component={() => <p>Hello</p>} />
            <PrivateRoute path="/courses/add" component={AddCoursePage} />
            <PrivateRoute path="/courses/edit/:id" component={EditCoursePage} />
            <PrivateRoute path="/courses/:id" component={ShowCourse} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/class/:id" component={ListClass} />
            <Route path="/404" component={() => <p>Not found</p>}/>
            <Route path="/500" component={() => <p>Server error</p>}/>
            
        </Switch>
    </Router>
);

export default Routes;

      