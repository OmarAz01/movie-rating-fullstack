import React from 'react'
import '../App.css'

const Home = () => {
  return (
    <>
      <container className='welcomeContainer'>
        <h1 className='pageTitle'> 
          Track and Rate Your Favorite Movies!
        </h1>
        <p className='pageDesc'>
          Discover new movies and curate your own list of ratings. Keep track of your favorite films and ratings all in one place!
        </p>
        <button className='signUp'> Sign Up Here </button>
      </container>
    </>

  )
}

export default Home;