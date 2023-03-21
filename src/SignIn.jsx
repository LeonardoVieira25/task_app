import React from 'react'
import './SignIn.scss'

import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";


export default function SignIn(user,setUser) {
const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
};

  return (
    <div className='SignIn'>
        <h1>
            Faça login para acessar as coisas
        </h1>
        <button
        onClick={googleSignIn}
        >
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327'></img>
            <p>
                Login
            </p>
        </button>
    </div>
  )
}