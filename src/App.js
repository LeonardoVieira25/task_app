import './App.css';
import SignIn from './SignIn';
import { useState } from 'react';

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {

  const [user] = useAuthState(auth);
  function signOut (){
    auth.signOut();
  }
  return (
    <div className="App">
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
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
