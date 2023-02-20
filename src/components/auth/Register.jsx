import { Button } from "@mui/material";
import React, { useState } from "react";
import { addNewUser, removeVerification } from "../../lib/firebase/actions";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../lib/firebase/auth";
import styles from "./Auth.module.css";

const Register = ({ verificationId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hasSubmitError, setHasSubmitError] = useState(null);

  const onSubmit = async () => {
    // to add if statements for all the states

    const res = await registerWithEmailAndPassword(email, password);
    addNewUser(
      {
        email: res.user.email,
        role: "unverified",
        name,
        dateOfBirth,
        phoneNumber,
        specialization,
      },
      res.user.uid
    );
    removeVerification(verificationId);
  };

  return (
    <div>
      <div className={styles.registerData}>
        <h1>Join Us To Work Beter</h1>
        <div className={styles.inputContainer}>
          <label>Email: </label>
          <input
            type="email"
            placeholder=" aaa@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password: </label>
          <input
            type="password"
            placeholder="please enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Name: </label>
          <input
            type="text"
            placeholder="full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Date of Birth: </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Specialization: </label>
          <input
            type="text"
            placeholder="plase enter your specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />

          <label>Phone Number: </label>
          <input
            type="tel"
            placeholder="plase enter your number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <Button variant="contained" onClick={() => onSubmit()}>
            Register
          </Button>
        </div>
      </div>
      {hasSubmitError && hasSubmitError}
    </div>
  );
};

export default Register;
