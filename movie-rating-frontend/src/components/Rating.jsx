import React, { useState, useEffect } from 'react'
import '../App.css'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'


const Rating = (ratingProp) => {
    console.log(ratingProp)
    const VITE_URL = import.meta.env.VITE_URL
    const user = localStorage.getItem('user')
    const userId = JSON.parse(user).id

    const [hover, setHover] = useState(null)
    const [rating, setRating] = useState({ movieId: ratingProp.movieId, title: ratingProp.title, userId: userId, rating: 0, description: "", posterPath: ratingProp.posterPath})

    useEffect(() => {
        console.log(ratingProp)

    }, [])

    const rateMovie = (e) => {    
        e.preventDefault()
        if (user) {
          axios.post(VITE_URL + '/api/rating/add', rating, {headers: { 'Authorization': `Bearer ${JSON.parse(user).jwt}` }}).then(() => {
            window.alert("Movie Rated")
          }).catch((error) => {
            console.log(error)
          })
        } else {
          window.alert("Sign in to rate movies")
        }
        
      }
    return (
        <>
        <form className='rateMovie'>
            <h2> Rate This Movie</h2>
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
        </>
  )
}

export default Rating