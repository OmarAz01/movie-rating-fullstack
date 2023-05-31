import React, { useState, useEffect } from 'react'
import '../App.css'
import { FaStar } from 'react-icons/fa'


import axios from 'axios'

const GetMovie = ({ id }) => {

    const VITE_URL = import.meta.env.VITE_URL
    const [movie, setMovie] = useState([])
    const [hover, setHover] = useState(null)
    const [rating, setRating] = useState({ movieId: id, title: "", userId: 0, rating: 0, description: "", posterPath: ""})  
    const user = localStorage.getItem('user')

    useEffect(() => {
        
        axios.get(VITE_URL + '/api/moviedb/' + id).then((response) => { 
          if (user) {
            const userid = JSON.parse(user).id
            setRating({...rating, userId: userid, posterPath: response.data.poster_path, title: response.data.title});
            setMovie(response.data)
          }
          else {
            setMovie(response.data)            
          }         
        }).catch((error) => { console.log(error)})
            
    }, [])

    const rateMovie = (e) => {    
      e.preventDefault()
      if (user) {
        axios.post(VITE_URL + '/api/rating/add', rating, {headers: { 'Authorization': `Bearer ${JSON.parse(user).jwt}` }}).then(() => {
          window.alert("Movie Rated")
        }).catch((error) => {
          if (error.response.status === 403) {
            window.alert('You have been logged out, please sign in again')
            localStorage.removeItem('user')
            window.location.href = '/signin'
          }
          else {
            console.log(error)
          }
        })
      } else {
        window.alert("Sign in to rate movies")
      }
      
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
          <form className='rateMovie'>
            <h2> Leave A Review </h2>
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
            <textarea placeholder='Leave a review' rows={20} cols={40} className='ratingComment' maxLength={150} value={rating.description} 
            onChange={(e) => setRating({...rating, description: e.target.value })}/>  
            <button type='submit' className='submitRating' onClick={(e) => {rateMovie(e)}}> Submit </button>            
        </form>   
        </div>                    
      </div>  
    </>
    
  )
}

export default GetMovie