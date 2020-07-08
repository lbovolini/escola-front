import React from "react"
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom"

import { isAuthenticated } from "./services/auth"

import ListCourse from "./components/course/ListCourse"
import AddCourse from "./components/course/AddCourse"
import ShowCourse from "./components/course/ShowCourse"

import Login from "./pages/Login"

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
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={ListCourse} />
        <PrivateRoute path="/add" component={AddCourse} />
        <PrivateRoute path="/courses/:id" component={ShowCourse} />
        <Route path="/login" component={Login} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
  
  export default Routes;

      