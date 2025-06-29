import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='md:w-48 w-36 cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:z-30'>
        <img src={IMG_CDN+posterPath} alt="Movie Card" />
    </div>
  )
}

export default MovieCard