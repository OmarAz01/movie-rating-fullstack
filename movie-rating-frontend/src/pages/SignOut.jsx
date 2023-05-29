import React, { useEffect } from 'react'
import '../App.css'

const SignOut = () => {

    localStorage.removeItem('user')

    useEffect(() => {
            setTimeout(() => {
                window.location.href = '/'
            }, 5000)
    }, [])

  return (
    <>
        <div className='littleMessage'> You Have Been Signed Out </div>
        <div className='littleMessage'> You Will Be Redirected To The Home Page In 5 Seconds </div>
    </>
    
    
  )
}

export default SignOut