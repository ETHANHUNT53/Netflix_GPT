import React, { useEffect, useRef } from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
    console.log(movies)
      const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);   
  return (
    <div className='px-6  text-white'> 
        <h1 className='text-3xl py-4'>{title}</h1>
        <div ref={scrollRef} className='flex overflow-x-scroll scrollbar-hide'>
            <div className='flex gap-6 z-30'>
                { movies?.map((movie)=> <MovieCard key={movie?.id} posterPath={movie?.poster_path}/>)}
            </div>
        </div>
    </div>
  )
}

export default MovieList