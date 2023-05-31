import axios from 'axios'
import React, {useState} from 'react'

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({ "username": "", "password": "", "repeatPassword": ""})
  const VITE_URL = import.meta.env.VITE_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (userDetails.password === userDetails.repeatPassword) {
      try {
        const response = await axios.post(VITE_URL + '/api/auth/register', userDetails)
        if (response.data.username === "Username already exists") {
          window.alert("Username already exists")
        }
        else {
          localStorage.setItem('user', JSON.stringify(response.data))
          window.alert("Account created successfully")
          window.location.href = '/'
        }         
        
      }catch  (error) {
        console.log(error)
      }  
    }  
    else {
      alert("Passwords do not match")
    }
  }

  const signIn = () => {
    window.location.href = '/signin'
  }

  return (
    <div className='loginContainer'>
      <h1>Sign Up</h1>
      <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' required autoComplete='off' value={userDetails.username} onChange={(e) => setUserDetails({...userDetails, username: e.target.value})} />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />
        <label htmlFor='password'>Re-enter Password</label>
        <input type='password' name='password' required value={userDetails.repeatPassword} onChange={(e) => setUserDetails({...userDetails, repeatPassword: e.target.value})} />
        <div className="signInButtons">
          <button type='submit'>Sign Up</button>
          <button type="button" onClick={() => signIn()}>Sign In</button>
        </div>
        
      </form> 
    </div>
  )
}

export default SignUp;