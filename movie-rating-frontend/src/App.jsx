import React, { useEffect, useState} from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Home, Movies, SignIn, MyRatings, Movie, SignUp } from './pages'
import axios from 'axios'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const VITE_URL = import.meta.env.VITE_URL

  useEffect( () => {
    const user = localStorage.getItem('user')

    if (user) {
      const token = JSON.parse(user).jwt

      const id = JSON.parse(user).id
    
      axios.get((VITE_URL + '/api/user/' + id), {headers: { 'Authorization': `Bearer ${token}` }}).then((response) => {
      setLoggedIn(true); console.log(response)}).catch((error) => { console.log(error)})
        
      
    }
    else {
      setLoggedIn(false)
    }    
  }, [])


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
