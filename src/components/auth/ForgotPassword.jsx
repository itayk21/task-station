import { Header } from "../header/Header";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { resetPassword } from "../../lib/firebase/actions";

const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState();
  const [hasSent, setHasSent] = useState(false);

  const onResetPassword = (auth, email) => {
    resetPassword(auth, email);
    setHasSent(true);

    setTimeout(() => {
      window.open("/login", "_self");
    }, 3000);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <label>Enter your email:</label>
      {!hasSent && (
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      )}
      {!hasSent && (
        <button onClick={() => onResetPassword(auth, email)}>
          Reset password
        </button>
      )}
      {hasSent && <p>Sent successfully. please check your mail soon.</p>}
    </div>
  );
};

export default ForgotPassword;
