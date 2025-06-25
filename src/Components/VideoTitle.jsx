import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4 text-justify ml-1'>{overview}</p>
      <div className=''>
        <button className='bg-white text-xl font-bold text-black py-3 px-16 rounded-lg hover:bg-opacity-80'>▶️Play</button>
        <button className='bg-gray-300 text-xl font-bold text-white mx-2 py-3 px-16 bg-opacity-50 rounded-lg hover:bg-opacity-30'>ℹ️More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle