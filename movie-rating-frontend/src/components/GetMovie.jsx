import React, { useState, useEffect } from 'react'

import axios from 'axios'

const GetMovie = ({ id }) => {

    const VITE_URL = import.meta.env.VITE_URL
    const [movie, setMovie] = useState([])

    useEffect(() => {
        axios.get(VITE_URL + '/api/moviedb/' + id).then((response) => {
            setMovie(response.data)}).catch((error) => {
                console.log(error)
            });
    }, [])


  return (
    <>
      <div className="movieBackdrop">
        <img src={'https://image.tmdb.org/t/p/original/' + movie.backdrop_path} alt={movie.title}/>
      </div>
      <div className="movieDetails">
        <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} alt={movie.poster_path}/>
        <div className="movieDescription">
          <h1>{movie.title}</h1>
          <h4>Release Date {movie.release_date} </h4>
          <h4>Runtime {movie.runtime} </h4> 
          <p>{movie.overview}</p>
        </div>             
      </div>    
    </>
    
  )
}

export default GetMovie