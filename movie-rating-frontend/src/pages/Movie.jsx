import React from 'react'
import GetMovie from "../components/GetMovie"

const Movie = () => {
  const movieId = window.location.pathname.split('/')[2]

  return (
    <>
      <div className="moviePageContainer">
        <GetMovie id = {movieId} />
      </div>    
    </>
    
  )
}

export default Movie;