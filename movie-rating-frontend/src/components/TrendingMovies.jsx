import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { Movie } from '../pages'

const TrendingMovies = () => {

    const [trending, setTrending] = useState([])
    const VITE_URL = import.meta.env.VITE_URL

    useEffect(() => {

        axios.get(VITE_URL + '/api/moviedb/trending').then((response) => {
        setTrending(response.data)}).catch((error) => {
            console.log(error)
        });  
    }, [])

    const handleClick = (id) => {
        window.location.href = `movie/${id}`      
    }
    


  return (      
        trending.slice(0, 15).map((trending) => (
            <div className='trendingMovie' key={trending.id}>  
                <img src={'https://image.tmdb.org/t/p/original' + trending.poster_path} alt={trending.title} onClick={() => handleClick(trending.id)}/>
            </div>        
        )) 
  )
}

export default TrendingMovies