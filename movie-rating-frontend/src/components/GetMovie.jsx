import React, { useState, useEffect } from 'react'
import '../App.css'
import { FaStar } from 'react-icons/fa'

import axios from 'axios'

const GetMovie = ({ id }) => {

    const VITE_URL = import.meta.env.VITE_URL
    const [movie, setMovie] = useState([])
    const [favorite, setFavorite] = useState(0)
    const [rating, setRating] = useState({ movieId: id, userId: 1, rating: 0, description: ""})
    const [hover, setHover] = useState(null)
  

    useEffect(() => {
        axios.get(VITE_URL + '/api/moviedb/' + id).then((response) => {
            setMovie(response.data)}).catch((error) => {
                console.log(error)
            });
    }, [])

    const addToFav = (id) => {
        axios.post(VITE_URL + '/api/user/favorites' + {id}).then((response) => {
            setFavorite(response.data)
        }).catch(() => {
            window.alert("Sign in to add to favorites")
        })
    }

    const rateMovie = (e) => {    
      e.preventDefault()

      axios.post(VITE_URL + '/api/rating/add', rating).then(() => {
          window.alert("Movie Rated")
      }).catch(() => {
          window.alert("Sign in to rate movies")
      })
    }


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
          <button onClick={() => {addToFav()}}> Add to Favorites </button>          
        </div>                    
      </div>
        <div className="movieRating">            
            <form className='rateMovie'>
              <h2> Rate The Movie</h2>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label key={index}>
                    <input type="radio" name="rating"  value={currentRating} onClick={() => {setRating({...rating, rating: currentRating})}}/>
                    <FaStar size={30} className='star' color={currentRating <= (hover || rating.rating) ? "#ffc107" : "#e4e5e9"} 
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)} />
                  </label>
                )
              })}
              <textarea placeholder='Leave a review' rows={20} cols={40} className='ratingComment' maxLength={250} value={rating.description} 
              onChange={(e) => setRating({...rating, description: e.target.value })}/>  
              <button type='submit' className='submitRating' onClick={(e) => {rateMovie(e)}}> Submit </button>            
            </form>
        </div>     
    </>
    
  )
}

export default GetMovie