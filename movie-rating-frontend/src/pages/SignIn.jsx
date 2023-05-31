import axios from 'axios'
import React, {useState} from 'react'

const SignIn = () => {
  const [userDetails, setUserDetails] = useState({ "username": "", "password": ""})
  const VITE_URL = import.meta.env.VITE_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(VITE_URL + '/api/auth/authenticate', userDetails)
      localStorage.setItem('user', JSON.stringify(response.data))
      window.location.href = '/movies'    
       
    }catch  (error) {
      if (error.response.status === 403) {
        window.alert('Incorrect Username or Password')
      }
      else {
        console.log(error)
      }
    }    
  }
  

  const signUp = () => {
    window.location.href = '/signup'
  }

  return (
    <div className='loginContainer'>
      <h1>Sign In</h1>
      <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' required autoComplete='off' value={userDetails.username} onChange={(e) => setUserDetails({...userDetails, username: e.target.value})} />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />
        <div className="signInButtons">
          <button type='submit'>Sign In</button>
          <button type="button" onClick={() => signUp()}>Sign Up</button>
        </div>        
      </form> 
    </div>
  )
}

export default SignIn;