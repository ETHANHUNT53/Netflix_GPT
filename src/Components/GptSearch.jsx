import React from 'react'
import GptSearchBar from './GptSearchBar'
import { LOGIN_BACKGROUND } from '../utils/constants'
const GptSearch = () => {
  return (
    <div>
        <div className='w-full absolute -z-10'>
            <img className='w-full' src={LOGIN_BACKGROUND} alt="login-background" />
        </div>
      <GptSearchBar/>
    </div>
  )
}

export default GptSearch
