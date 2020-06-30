import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LogIn } from "../loginSystem/login";
import Register from "../registerSystem/register";

const LogInOrRegister = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/register-new-user" component={Register} />
        </Switch>
      </Router>
    </>
  );
};

export default LogInOrRegister;
