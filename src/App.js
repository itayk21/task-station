import logo from './logo.svg';
import './App.css';
import { Main } from './components/main/Main';
import Login from './components/auth/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase/index"
import Register from './components/auth/Register';
import Connection from './components/auth/Connection';


function App() {
  const [user, loading, error] = useAuthState(auth);

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
