import './App.scss';
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

  const [loading, setLoading] = useState(true)

  auth.onAuthStateChanged((user)=>{
    setLoading(false)
  })
  return (
    <div className="App">
      {!loading?
        user ? (
          <>
            <Home
            signOut={signOut}
            />
          </>
        ) : (
          <div className='land'>
            <h1>TaskTracker</h1>
            <SignIn 
              user = {user}
            />
          </div>
        )
      :<div className='loading'>
        <h1>
          carregando...
        </h1>
      </div>}
      
    </div>
  );
}

export default App;
