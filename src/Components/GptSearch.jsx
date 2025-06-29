import React from 'react'
import GptSearchBar from './GptSearchBar'
import { LOGIN_BACKGROUND } from '../utils/constants'
import GptMovieSuggestions from './GptMovieSuggestions'
const GptSearch = () => {
  return (
    <>
        <div className='w-full fixed -z-10'>
            <img className='w-full h-screen object-cover' src={LOGIN_BACKGROUND} alt="login-background" />
        </div>
        <div className=''>
           <GptSearchBar/>
           <GptMovieSuggestions/>
        </div>
    </>
  )
}

export default GptSearch
