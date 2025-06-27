import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { FaCaretDown , FaCaretUp } from "react-icons/fa";
import { toggleGptSearchView } from '../utils/gptSlice';
import { LOGO, SUPPORTED_LANGUAGES, USER_ICON } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user)
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch);
  const [showVisible,setShowVisible] = useState(false);
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
  // Sign-out successful.
    }).catch((error) => {
      navigate('/error')
  // An error happened.
  });
  }
  useEffect(()=>{
     const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email , displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
          navigate('/browse')
        } else {
        // User is signed out
          dispatch(removeUser());
          navigate('/')
        }
      });
      //Unsubscribe when component unmounts 
      return ()=> unsubscribe();
    },[])
  const handleDropdown = ()=>{
    setShowVisible(!showVisible);
  }
  const handleGptSearch = ()=>{
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e)=>{
    // console.log(e.target.value)
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className='absolute bg-gradient-to-b from-black w-full z-10 flex justify-between'>
      <img src={LOGO} className='w-48 mt-4' alt="logo" />

      {user && <div className='flex p-2 mr-12 my-4'>
        {
          showGptSearch &&
        <select className='p-2 bg-gray-900 m-2 text-white cursor-pointer' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option className='cursor-pointer' key={ lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>
        }
        <button onClick={handleGptSearch} className=' px-4  bg-purple-800 hover:bg-purple-700 text-white rounded-lg mx-4 py-0 mt-1'>{showGptSearch?"Homepage":"GPT Search"}</button>
        <img onMouseOver={handleDropdown}  className='w-10 cursor-pointer mt-2 h-10' src={USER_ICON} alt="usericon" />
          <div className='mr-8'>
            <button className='mt-4 ml-1 text-lg' onMouseOver={handleDropdown} >{!showVisible?<FaCaretDown className='text-white'/>:<FaCaretUp className='text-white'/>}</button>
            {
              showVisible && 
              <div onMouseLeave={()=>setShowVisible(!showVisible)} className='w-28 rounder-lg h-16 mt-6 ml-[-70px] border-black border-2 absolute bg-black bg-opacity-50 flex justify-center rounded-xl'>
                <button className='font-bold text-white hover:underline' onClick={handleSignOut}>Sign Out</button>
              </div>
            }
            
          </div>
        
      </div>}
    </div>
  )
}

export default Header