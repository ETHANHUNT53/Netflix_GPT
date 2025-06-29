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
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className='absolute bg-gradient-to-b from-black w-full z-10 flex flex-col justify-between md:flex-row'>
      <div className='flex'>
        <img src={LOGO} className='w-48 mx-auto md:mx-0 mt-4' alt="logo" />
        {user && <img onMouseOver={handleDropdown}  className='w-10 cursor-pointer mt-9 h-10 md:hidden ' src={USER_ICON} alt="usericon" />}
        {
          user &&
         <div className='mr-8 md:hidden mt-9'>
            <button className='mt-4 ml-1 text-lg' onMouseOver={handleDropdown} >{!showVisible?<FaCaretDown className='text-white'/>:<FaCaretUp className='text-white'/>}</button>
               {
                showVisible &&
                  <div onMouseLeave={()=>setShowVisible(!showVisible)} className='w-28 rounder-lg h-16 mt-6 ml-[-70px] border-black border-2 absolute bg-black bg-opacity-50 flex justify-center rounded-xl'>
                    <button className='font-bold text-white hover:underline' onClick={handleSignOut}>Sign Out</button>
                  </div>
              }
            
          </div>
        }
      </div>

      {user && <div className='flex p-2 md:ml-40 ml-16 md:mr-12 my-4'>
        {
          showGptSearch &&
        <select className='md:p-2 bg-gray-900 md:m-2 text-white cursor-pointer p-3 mr-8' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option className='cursor-pointer' key={ lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>
        }
        <button onClick={handleGptSearch} className=' md:px-4 py-2 px-3 ml-12  bg-purple-800 hover:bg-purple-700 text-white rounded-lg md:mx-4  md:py-0 mt-1'>{showGptSearch?"Homepage":"GPT Search"}</button>
        <img onMouseOver={handleDropdown}  className='md:w-10 cursor-pointer md:mt-2 md:h-10 md:inline-block hidden' src={USER_ICON} alt="usericon" />
          <div className='md:mr-8 hidden md:inline-block'>
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