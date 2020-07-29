import React from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { history } from "./services/history"

import { isAuthenticated } from "./services/auth"

import ListClass from "./components/class/ListClass"

import ListCourse from "./components/course/ListCourse"
import AddCourse from "./components/course/AddCourse"
import ShowCourse from "./components/course/ShowCourse"

import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"

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
            <Route exact path={"/"} component={ListCourse} />
            <PrivateRoute path="/add" component={AddCourse} />
            <PrivateRoute path="/courses/:id" component={ShowCourse} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/class/:id" component={ListClass} />
            <Route path="/404" component={() => <p>Not found</p>}/>
            <Route path="/500" component={() => <p>Server error</p>}/>
            
        </Switch>
    </Router>
);

export default Routes;

      