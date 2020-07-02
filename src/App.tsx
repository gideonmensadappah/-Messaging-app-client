import React, { Component } from "react";
import "./App.css";
import MessagingHome from "./components/messagingHome/home";
import LogInOrRegister from "./components/loginRegister/loginRegister";
import fire from "./config/fire";

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
    return <>{this.state.user ? <MessagingHome /> : <LogInOrRegister />}</>;
  }
}
