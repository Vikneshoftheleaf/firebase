// pages/index.js
"use client";
import { auth } from '../../firebase';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
const HomePage = () => {
    const user = auth.currentUser;

    if (user) {
        return (
            <>
            <h1>{user.uid}</h1>
            {
                (user.photoURL)?<Image className='rounded-full' src={user.photoURL} alt='User Profile' width={100} height={100}></Image>:<h1>No</h1>
                
            }
            <br />
            {
                (user.displayName)?<h1>{user.displayName}</h1>:<h1>No</h1>
                
            }
            <br />
            <button onClick={()=>{signOut(auth).then(console.log('signed off'))}}>SignOut</button>
            <br />
            <Link href={'dash'}>Dashboard</Link>
           </>
        )
    }
    else {
        return (
            <>
                <Link href={'login'}>Login</Link>
                <br />
                <Link href={'signup'}>Signup</Link>

            </>
        )
    }

}
export default HomePage;
