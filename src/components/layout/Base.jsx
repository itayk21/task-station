import { Sidebar } from "./Sidebar/Sidebar";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useEffect, useState } from "react";
import { findUserById } from "../../lib/firebase/actions";
import { Header } from "../header/Header";

export const UserContext = createContext();

export const BaseLayout = ({ user, children }) => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <Header user={user} />
        </div>
        <main className="main-content">
          <Sidebar user={user} />
          {children}
        </main>
      </div>
    </div>
  );
};
