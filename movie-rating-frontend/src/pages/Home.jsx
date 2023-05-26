import React from 'react'
import '../App.css'
import background from '../assets/background.jpg'
import TrendingMovies from '../components/TrendingMovies'

const Home = () => {
  return (
    <>
      <div className='welcomeContainer'>
        <div className='welcomeContent'>
          <h1 className='pageTitle'> 
            Track and Rate Your Favorite Movies!
          </h1>
          <p className='pageDesc'>
            Discover new movies, curate your own list of ratings, and keep track of your favorite films all in one place!
          </p>
          <button className='signUp'> Sign Up Here </button>
        </div>
      </div>
        <h1 className='trendingMoviesHeader'> This Week's Trending Movies </h1>    
      <div className='trendingMovieContainer'>            
        <TrendingMovies />
      </div>
    </>

  )
}

export default Home;