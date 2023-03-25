import './App.css';
import SignIn from './SignIn';
import { useState } from 'react';

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from './Home';

function App() {

  const [user] = useAuthState(auth);
  function signOut (){
    auth.signOut();
  }
  return (
    <div className="App">
      {user ? (
        <>
          <Home
          signOut={signOut}
          />
        </>
      ) : (
        <>
          <h1>Bem vindo</h1>
          <SignIn 
            user = {user}
          />
        </>
      )}
      
    </div>
  );
}

export default App;
