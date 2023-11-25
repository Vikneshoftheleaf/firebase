"use client";
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase"
export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signInUser(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });
    }

    //signin with google
    const provider = new GoogleAuthProvider();
    function googleSignIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log(user.uid)

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorMessage)
            });
    }


    return (
        <div className='h-screen w-1/2 flex flex-col justify-center align-center'>
            <form onSubmit={(e) => signInUser(e)} className='flex gap-2'>
                <input className='border border-2' type="email" onChange={(e) => setEmail(e.target.value)} />
                <input className='border border-2' type="password" onChange={(e) => setPassword(e.target.value)} />
                <button className='px-4 py-2 bg-slate-900 text-slate-50' type='submit'>Signup</button>
            </form>
            <br />
            <button className='px-4 py-2 bg-blue-500 text-slate-50' onClick={()=>googleSignIn()}>Sign Up with Google!</button>
        </div>
    )
}