import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResults } from '../utils/gptSlice'

const GptSearchBar = () => {
  const langKey = useSelector(store=>store.config.lang)
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async(movie)=>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS);

    const json = await data.json();
    return json.results;
  }
  const handleGptSearchClick = async()=>{
    //Make an API call to get the movie results

    const gptQuery = "Act as a movie recommendation system and suggest some movies for the query : " + searchText.current.value + ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Don, Sholay, War, The Amazing Spiderman, Ironman 2"
    const gptResults =  await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: gptQuery },
        ],
      });

      if(!gptResults.choices){
        return <h1 clasName = "text-3xl">Error fetching the movies</h1>
      }
      const gptMovies = gptResults.choices[0]?.message?.content.split(",");

      const promiseArray = gptMovies.map(movie=>searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMovieResults({movieNames : gptMovies , movieResults: tmdbResults}));
      console.log(tmdbResults);
  }
  return (
    <div className='md:pt-[10%] pt-[50%]  flex justify-center'>
        <form action="" className='  bg-black rounded-lg w-full md:w-1/2 grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type="text" className='p-4 rounded-lg m-4 text-sm md:text-lg col-span-9' placeholder={lang[langKey].gptSearchPlaceholder} />
            <button className='py-2 px-4 m-4 col-span-3 bg-red-700 hover:bg-red-600 text-sm md:text-lg text-white rounded-lg' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar
