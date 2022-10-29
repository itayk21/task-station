import logo from './logo.svg';
import './App.css';
import { Main } from './components/main/Main';
import Login from './components/auth/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase/index"
import Register from './components/auth/Register';
import Connection from './components/auth/Connection';
import { useEffect, useState } from 'react';
import { findUserById } from './lib/firebase/actions';


function App() {
  /*
  1. to lookup in DB on users table
  2. to get the role of the user by the id
  3. put it on a global state
  */
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(true);

  useEffect(() => {
    if (user) {
      const test = findUserById(user.uid, setUserData);
      console.log("r", test);
    }
  }, [])

  useEffect(() => {
    console.log("s", userData);
  }, [userData])

  if (!user) {
    return (<div className="App">
      <Connection user={user} />
    </div>)
  }


  return (
    <div className="App">
      <Main user={user} />
    </div>
  );
}

export default App;
