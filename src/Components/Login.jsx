import { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGIN_BACKGROUND } from '../utils/constants';


const Login = () => {

    const [isSignInForm , setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = ()=>{
        //Validate the form data
        const message = checkValidData(email.current.value,password.current.value,!isSignInForm ? name.current.value : null)
        setErrorMessage(message);
        if(message) return;

        //Sign in sign up logic
        if(!isSignInForm){
            //Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                    // Profile updated!
                        const {uid, email , displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
                    // ...
                    }).catch((error) => {
                    // An error occurred
                       setErrorMessage(error.message);
                    });

                
                // ...
             })
            .catch((error) => {
                 const errorCode = error.code;
                 const errorMessage = error.message;
                 setErrorMessage(errorCode+" - "+errorMessage)
            // ..
             });
        }
        else{
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+' - '+errorMessage);
                });    //Sign in logic
            }
}
  return (
    <div>
            <Header/>
            <div className='w-full absolute'>
                <img className='w-full h-screen object-cover' src={LOGIN_BACKGROUND} alt="login-background" />
            </div>
        <form onSubmit={(e)=>e.preventDefault()} className='absolute  md:w-1/3 lg:w-1/4 w-11/12 bg-black my-28 sm:my-28 md:my-36 mx-auto  right-0 sm:p-8 md:p-12 left-0 p-6 rounded-lg bg-opacity-80 sm:w-4/5'>
            <h1 className='font-bold text-3xl text-white py-4 '>{isSignInForm?`Sign In` : `Sign Up`}</h1>
            {
                !isSignInForm && <input type="text" ref={name} placeholder='Name' className='p-4 my-4 w-full rounded-lg bg-gray-800 text-white'/>
            }
            <input type="text" ref={email} placeholder='Email Address' className='p-4 my-4 text-white w-full  rounded-lg bg-gray-800'/>
            <input type="password" ref={password} placeholder='Password' className='p-4 my-4 w-full rounded-lg text-white bg-gray-800'/>
            <p className='text-red-500 font-bold'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 hover:bg-red-800 w-full text-white rounded-lg' onClick={handleButtonClick}>{isSignInForm?`Sign In`:`Sign Up`}</button>
            <p className='py-4 text-gray-400'>{isSignInForm ? `New to Netflix?` : `Already a User?`} <span className='hover:underline text-white cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? `Sign Up Now` : `Sign In`}</span></p>
        </form>
    </div>
  )
}

export default Login