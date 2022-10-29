import logo from './logo.svg';
import './App.css';
import { Main } from './components/main/Main';
import Login from './components/auth/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase/index"
import Register from './components/auth/Register';
import Connection from './components/auth/Connection';
import { useEffect } from 'react';
import { findUserById } from './lib/firebase/actions';


function App() {
  /*
  1. to lookup in DB on users table
  2. to get the role of the user by the id
  3. put it on a global state
  */
  const [user, loading, error] = useAuthState(auth);


  if (!user) {
    return (<div className="App">
      <Connection user={user} />
    </div>)
  }

  // useEffect(() => {
  //   if (user) {
  //     findUserById(user.uid).then((res) => {
  //       console.log("r", res)
  //     })
  //   }
  // }, [])

  return (
    <div className="App">
      <Main user={user} />
    </div>
  );
}

export default App;
