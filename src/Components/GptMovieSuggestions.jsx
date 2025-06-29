import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'
const GptMovieSuggestions = () => {

  const {movieResults, movieNames} = useSelector(store=> store.gpt);
  if(!movieNames) return null;

  return (
    <div className='p-4 m-4 text-white bg-black bg-opacity-70'>
      <div>
        {movieNames.map((movie,index)=> <MovieList key={movie} title= {movie} movies = {movieResults[index]}/>)}
        
      </div>

    </div>
  )
}

export default GptMovieSuggestions
