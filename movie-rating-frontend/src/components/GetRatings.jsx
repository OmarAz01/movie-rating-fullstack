import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../App.css'
     
const GetRatings = () => {
  const VITE_URL = import.meta.env.VITE_URL;
  const [ratings, setRatings] = useState([]);
  const user = localStorage.getItem('user');
  
  useEffect(() => {

    const fetchRatings = async () => {
      try {
        axios.get(`${VITE_URL}/api/rating/all/${JSON.parse(user).id}`, {headers: { 'Authorization': `Bearer ${JSON.parse(user).jwt}`}})
        .then((response) => setRatings(response.data))
        .catch((error) => console.log(error))
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchRatings();
    }

  }, [user]);

  const deleteRating = (id) => {
    axios.delete(`${VITE_URL}/api/rating/delete/${id}`, {headers: { 'Authorization': `Bearer ${JSON.parse(user).jwt}` }}).then((response) => {
      if (response.status === 200) {
        window.location.reload()
      }
    }).catch((error) => console.log(error))
  }

  return (
    <>
      {!user && (
        <>
          <div className='littleMessage'>Please sign in to view your ratings</div>
          <button className='signInButton' type="button" onClick={() => window.location.href = '/signin'}>Sign In</button>
        </>
      )}
      {user && ratings.length > 0 ? (
        ratings.slice(0, ratings.length > 15 ? 15 : ratings.length).map((rating) => (
          <div className="rating" key={rating.id}>
            <img src={'https://image.tmdb.org/t/p/original' + rating.posterPath} alt={rating.title} />
            <div className="ratingRightContainer">
              <div className="ratingInfo">
                <h2>{rating.title}</h2>
                <h4>Rating: {rating.rating}/5</h4>
                <p>{rating.description}</p>
              </div>
              <div className="ratingButtons">
                <button className='deleteButton' type="button" onClick={() => {
                  const confirmBox = window.confirm("Do you really want to delete this rating?");
                  if (confirmBox === true) {
                    deleteRating(rating.id);
                  }
                }}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        user && ratings.length === 0 && <div className='littleMessage'>You have not rated any movies yet</div>
      )}
    </>
  );
};

export default GetRatings