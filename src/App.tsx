import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import fire from "./config/fire";
import Home from "./pages/home";
import LogIn from "./pages/login";
import Register from "./pages/register";
import UpdateProfile from "./pages/UpdateProfile";
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
          {this.state.user ? (
            <>
              <Route path="/" exact component={Home} />
              <Route path="/update" exact component={UpdateProfile} />
            </>
          ) : (
            <Route path="/" exact component={LogIn} />
          )}

          <Route path="/register" exact component={Register} />
          {/* <Route  path="**" component={PageNotFound}/> */}
        </Switch>
      </Router>
    );
  }
}
