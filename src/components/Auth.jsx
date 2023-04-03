import React from "react";
import {auth, provider} from "../firebase-config.js"
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie"
import "../styles/Auth.css";

const cookies = new Cookies()

const Auth = (props) => {
  const {setIsAuth} = props

    const signInWithGoogle = async () => {
        try { 
        const result =  await signInWithPopup(auth, provider) // It gives bunch of information about us  // It gives access token which can be used and stored in cookie
        console.log(result);
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true)
        } catch(err){
            console.log(err);
        }
    }

  return <div className="auth">
    <p>Sign In with google to continue</p>
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  </div>;
};

export default Auth;
