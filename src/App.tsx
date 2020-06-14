import React, { Component, Props } from "react";
import "./App.css";
import MessagingHome from "./components/messagingHome/home";
import { LogIn } from "./components/loginSystem/login";
import fire from "./config/fire";
type User = {
  email: "";
  password: "";
};

export default class App extends Component {
  constructor(props: User) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return <>{this.state.user ? <MessagingHome /> : <LogIn />} </>;
  }
}
