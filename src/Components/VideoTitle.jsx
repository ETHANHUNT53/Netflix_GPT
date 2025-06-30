import React from 'react'
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video opacity-30 md:opacity-100'>
      <h1 className='md:text-5xl text-xl md:font-bold font-semibold'>{title}</h1>
      <p className='py-6 hidden md:inline-block text-lg w-1/4 text-justify ml-1'>{overview}</p>
      <div className='flex my-2 md:m-0 '>
        <button className='bg-white md:text-2xl md:py-2 font-bold flex items-center
        text-lg text-black md:px-8 px-6 rounded-lg hover:bg-opacity-80 py-2'><span className='mr-3 text-xl md:text-3xl'><FaPlay /></span>Play</button>
        <button className='bg-gray-300 hidden  text-2xl font-bold text-white mx-2 md:flex md:py-4  items-center px-12 bg-opacity-50 rounded-lg hover:bg-opacity-30'><span className='mr-3 text-3xl'><IoIosInformationCircleOutline /></span>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
