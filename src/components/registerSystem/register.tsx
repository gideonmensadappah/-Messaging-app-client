import React, { Component } from "react";
import "./register.css";
import fire from "../../config/fire";
import { Link } from "react-router-dom";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

class Register extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleClick = () => {
    console.log(this.state);
    // fire
    //   .auth()
    //   .createUserWithEmailAndPassword(
    //   );
  };

  render() {
    const { firstName, lastName, email, phone, password } = this.state;
    return (
      <div className="form-container">
        <div className="form-div">
          <div className="form-control">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              className="input-control"
              placeholder="first Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label-text">Last Name</label>
            <input
              type="text"
              value={lastName}
              name="lastName"
              className="input-control"
              placeholder="last Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label-text"> Email</label>
            <input
              type="text"
              name="email"
              value={email}
              className="input-control"
              onChange={this.handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-control">
            <label className="label-text"> Phone</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={this.handleChange}
              className="input-control"
              placeholder="Phone"
            />
          </div>
          <div className="form-control">
            <label className="label-text"> Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className="input-control"
              placeholder="Password"
            />
          </div>
          <div className="button-control">
            <button type="submit" onClick={this.handleClick} className="link">
              Create accout
            </button>
            <span className="signIn">already have account?</span>
            <Link to="/">
              <button className="link" type="submit">
                sign
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
