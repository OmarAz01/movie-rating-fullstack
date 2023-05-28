import axios from 'axios'
import React, { useState, useEffect } from 'react'

const GetRatings = () => {
    const VITE_URL = import.meta.env.VITE_URL
    const [ratings, setRatings] = useState([])
    
    let movie = [];

    useEffect(() => {
          axios.get(VITE_URL + '/api/rating/all/' + userId).then((response) => {setRatings(response.data)})
          .catch((error) => { console.log(error) });
              
    }, [])

    const getMovie = (movieId) => {
      axios.get(VITE_URL + '/api/movie/' + movieId).then((response) => {movie = response.data})
      .catch((error) => { console.log(error) });      
    }


  return ( 
    ratings.slice(0, 15).map((rating) => (     
      getMovie(rating.movieId).then(() => {
       <div className="rating" key={rating.id}>
        <img src={'https://image.tmdb.org/t/p/original' + movie.poster_path} alt={movie.title} />
        <div className="ratingInfo">
          <h2>{movie.title}</h2>
          <h4>{rating.rating}</h4>
          <p>{rating.description}</p>
        </div>
      </div>
            
      }))
  ))
}

export default GetRatings