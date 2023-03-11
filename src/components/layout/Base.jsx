import { Sidebar } from "./Sidebar/Sidebar";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useEffect, useState } from "react";
import { findUserById } from "../../lib/firebase/actions";
import { Header } from "../header/Header";

export const UserContext = createContext();

export const BaseLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    // user UID that we are getting from firebase SDK
    const userUID = user?.uid;

    if (userUID) {
      // when we having the user UID,
      // we fetching to see his data from database
      findUserById(userUID, setUserData);
    }
  }, [user]);

  if (!user || !userData?.role) {
    // TODO: Redirect in case user not logged-in // <Connection user={user} />
    return;
  }

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <div className="container">
          <div className="header">
            <Header user={user} />
          </div>
          <main className="main-content">
            <Sidebar />
            {children}
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
};
