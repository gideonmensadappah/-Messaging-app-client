import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import fire from "./config/fire";
import Home from "./pages/home";
import LogIn from "./pages/login";
import Register from "./pages/register";
import "./App.css";

type State = {
  user: firebase.User | null;
};

export default class App extends Component<{}, State> {
  constructor(props: State) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            {this.state.user ? <Home /> : <LogIn />}
          </Route>
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    );
  }
}
