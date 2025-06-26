import React from 'react'
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4 text-justify ml-1'>{overview}</p>
      <div className='flex'>
        <button className='bg-white text-2xl font-bold flex items-center text-black  px-8 rounded-lg hover:bg-opacity-80'><span className='mr-3 text-2xl'><FaPlay /></span>Play</button>
        <button className='bg-gray-300 text-2xl font-bold text-white mx-2 py-3  flex items-center px-12 bg-opacity-50 rounded-lg hover:bg-opacity-30'><span className='mr-3 text-3xl'><IoIosInformationCircleOutline /></span>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
