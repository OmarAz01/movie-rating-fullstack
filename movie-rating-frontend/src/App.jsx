import React, { useEffect, useState} from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Home, Movies, SignIn, MyRatings, Movie, SignUp, SignOut } from './pages'
import axios from 'axios'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const VITE_URL = import.meta.env.VITE_URL
  const user = localStorage.getItem('user')
  useEffect( () => {  

    if (user) {
      const token = JSON.parse(user).jwt
    
      axios.get((VITE_URL + '/api/auth/validate'), {headers: { 'Authorization': `Bearer ${token}` }}).then((response) => {
      if (response.status === 200) {
        setLoggedIn(true)
        console.log('Logged In')
      }
      })
      .catch((error) => {
        localStorage.removeItem('user')
        
        if (error.response.status === 404) {
          setLoggedIn(false)
        }
        else if (error.response.status === 403) {
          setLoggedIn(false)
        }     
        else {
          console.log(error)
        }

       })       
      
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
        {loggedIn ? (
        <Link to="/signout" className='link'>
          <h4 className='nav'> Sign Out </h4>
        </Link>
        ) : 
        <Link to="/signin" className='link'>
          <h4 className='nav'> Sign In </h4>
        </Link>}
        <Link to="/myratings" className='link'>
          <h4 className='nav'> My Ratings </h4>
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myratings" element={<MyRatings />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
    </main>
    <footer>
      <p>Created by <a className='footerLink' href="https://github.com/OmarAz01" target="_blank" rel='noreferrer'>Omar Alzoubi</a></p>    
    </footer>
    </BrowserRouter>

    
  )
}

export default App
