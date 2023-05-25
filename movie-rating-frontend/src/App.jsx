import React from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Home, Movies, SignIn, MyRatings, Movie, SignUp } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/" className='linkLeft'>
          <h4 className='nav'> Home </h4>
        </Link>
        <Link to="/movies" className='link'>
          <h4 className='nav'> Movies </h4>
        </Link>
        <Link to="/signin" className='link'>
          <h4 className='nav'> Sign In </h4>
        </Link>
        <Link to="/myratings" className='link'>
          <h4 className='nav'> My Ratings </h4>
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myratings" element={<MyRatings />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
    </main>
    </BrowserRouter>

    
  )
}

export default App
