import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user)
  const dispatch = useDispatch();
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
  return (
    <div className='absolute bg-gradient-to-b from-black w-full z-10 flex justify-between'>
      <img src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" className='w-48 mt-4' alt="logo" />

      {user && <div className='flex p-2 mr-12 my-4'>
        <img onMouseOver={handleDropdown}  className='w-12 cursor-pointer h-12' src="https://occ-0-6502-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4" alt="usericon" />
          <div className='mr-8'>
            <button className='mt-4 ml-1 text-lg' onMouseOver={handleDropdown} >{!showVisible?'⬇️':'⬆️'}</button>
            {
              showVisible && 
              <div onMouseLeave={()=>setShowVisible(!showVisible)} className='w-28 rounder-lg h-16 mt-6 ml-[-70px] border-black border-2 absolute bg-black bg-opacity-80 flex justify-center rounded-xl'>
                <button className='font-bold text-white hover:underline' onClick={handleSignOut}>Sign Out</button>
              </div>
            }
            
          </div>
        
      </div>}
    </div>
  )
}

export default Header