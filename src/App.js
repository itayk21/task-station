import logo from './logo.svg';
import './App.css';
import { Main } from './components/main/Main';
import Login from './components/auth/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase/index"
import Register from './components/auth/Register';
import Connection from './components/auth/Connection';
import { createContext, useEffect, useState } from 'react';
import { findUserById } from './lib/firebase/actions';

export const UserContext = createContext();

function App() {
  /*
  1. to lookup in DB on users table
  2. to get the role of the user by the id
  3. put it on a global state
  */
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

  // If there is no user data, or user role value
  // redirect them to login page.
  if (!user || !userData?.role) {
    return (<div className="App">
      <Connection user={user} />
    </div>)
  }

  // otherwise,
  // show them our main controller route.
  return (
    <div className="App">
      <UserContext.Provider value={userData}>
        <Main user={user} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
