import { Button } from "@mui/material";
import React, { useState } from "react";
import { logInWithEmailAndPassword } from "../../lib/firebase/auth";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/forgotpassword");
  };

  return (
    <div className={styles.body}>
      <div className={styles.loginRegister}>
        <div>
          <h1 className={styles.loginTitle}>Connect To Work Better</h1>
        </div>

        <div>
          <label>Email Adress: </label>
          <input
            className={styles.login}
            type="text"
            value={email}
            required
            placeholder="Please enter your mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            className={styles.login}
            type="password"
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className={styles.BtLogin}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Lets Start
        </button>

        <div>
          <button onClick={handleNavigation}>Forgot my password</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
