import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../App.css'

const SearchMovies = () => {
    const VITE_URL = import.meta.env.VITE_URL
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    useEffect(() => {

        if (query === '') {
            let search = 'a';
            axios.get(VITE_URL + '/api/moviedb/search/' + search).then((response) => {
            setMovies(response.data)}).catch((error) => {
                console.log(error)
            })
        }

        else {
            axios.get(VITE_URL + '/api/moviedb/search/' + query).then((response) => {
            setMovies(response.data)}).catch((error) => {
                console.log(error)
            })
        }  
        
    }, [])

    const handleClick = (id) => {
        window.location.href = `movie/${id}`
    }

    const handleSearch = (e) => {
        e.preventDefault()

        if (query === '') {
            let search = 'a';
            axios.get(VITE_URL + '/api/moviedb/search/' + search).then((response) => {
            setMovies(response.data)}).catch((error) => {
                console.log(error)
            })
        }

        else {
            axios.get(VITE_URL + '/api/moviedb/search/' + query).then((response) => {
            setMovies(response.data)}).catch((error) => {
                console.log(error)
            })
        } 
    }


  return (
    <>
        <form className='searchBar' onSubmit={handleSearch}>
            <input type='text' placeholder='Search for a movie' value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
        
        <div className="searchedMovies">
            {movies.slice(0, 15).map((movies) => (
                <div className='searchedMovie' key={movies.id}>  
                    <img src={'https://image.tmdb.org/t/p/original' + movies.poster_path} alt={movies.title} onClick={() => handleClick(movies.id)}/>
                </div>        
            )) }
        </div>
        
    </>
   
  )
}

export default SearchMovies