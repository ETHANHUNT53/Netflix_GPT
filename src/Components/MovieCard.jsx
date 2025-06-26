import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48 cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:z-30'>
        <img src={IMG_CDN+posterPath} alt="Movie Card" />
    </div>
  )
}

export default MovieCard