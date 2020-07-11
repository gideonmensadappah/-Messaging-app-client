import React, { useState, useCallback } from "react";
import "./login.css";
import fire from "../../config/fire";
import { Link } from "react-router-dom";

const LogIn: React.FC = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleEmailChange = useCallback((event) => {
    const { value } = event.target;
    setUserEmail(value);
  }, []);
  const handlePasswordChange = useCallback((event) => {
    const { value } = event.target;
    setUserPassword(value);
  }, []);

  const handleSignIn = useCallback(
    (event) => {
      event.preventDefault();
      fire
        .auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .catch((err) => alert(err.message));
    },
    [userEmail, userPassword]
  );

  return (
    <div className="form-container">
      <div className="form">
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            value={userEmail}
            onChange={handleEmailChange}
            className="email form-input"
            placeholder="Email"
          />
        </div>

        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            value={userPassword}
            onChange={handlePasswordChange}
            className="password form-input"
            placeholder="password"
          />
        </div>
        <div className="form-control form-btn">
          <button type="submit" onClick={handleSignIn} className="form-button">
            LogIn
          </button>
          <Link to="/register-new-user">
            <button type="submit" className="form-button">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
