import React from 'react'

const GetRatings = () => {
    const VITE_URL = import.meta.env.VITE_URL
    const [ratings, setRatings] = useState([])
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(VITE_URL + '/api/rating/all' + userID).then((response) => {
            setRatings(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }





  return (
    <div>GetRatings</div>
  )
}

export default GetRatings