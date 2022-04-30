import { useState, useEffect } from "react";
import Axios from 'axios'

export default function Crud() {
    const [movieName, setMovieName] = useState('')
    const [review, setReview] = useState('')
    const [movieReviewList, setMovieList] = useState([])
    const [newReview, setNewReview] = useState('')

    useEffect(() => {
      Axios.get('http://localhost:3030/api/get').then((response)=> {
        setMovieList(response.data);
      })
    }, [])

    const submitReview = () => {

      Axios.post("http://localhost:3030/api/insert", {
        movieName: movieName,
        movieReview: review,
      })

      setMovieList([
        ...movieReviewList,
        {movieName: movieName, movieReview: review}
      ])
   
    }

    const deleteReview = (movie) => {
      Axios.delete(`http://localhost:3030/api/delete/${movie}`)
    }

    const updateReview = (movie) => {
      Axios.put("http://localhost:3030/api/update", {
        movieName: movie,
        movieReview: newReview
      })
      setNewReview("")
    }

    return (
      <main className="text-3xl font-bold text-slate-200">
        <h2>Crud 💾</h2>
        <div class="flex flex-col items-center justify-center">
          <label>Movie name:</label>
          <input  class="px-2 m-2 rounded-cool text-orange-800" 
                  type="text" 
                  name="movieName" 
                  onChange={(e) => {
                    setMovieName(e.target.value)
                  }}
          />
          <label>Review:</label>
          <input  class="px-2 m-2 rounded-cool text-orange-800" 
                  type="text" 
                  name="review" 
                  onChange={(e) => {
                    setReview(e.target.value)
                  }}
          />
          <button 
            class="rounded-cool p-1.5 m-2 bg-slate-700  hover:text-orange-300 hover:bg-gray-600"
            onClick={submitReview}
          >
            Submit
          </button>
        </div>
        <p>{movieName}</p>
        <div class="grid grid-cols-2">
        {movieReviewList.map((val)=>{
          return(
            
            <div class=" p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                     hover:bg-gray-700
                    transition-all ">
              <h1>
                {val.movieName}
              </h1>
              <p class=" text-2xl ">
                Review:&nbsp;
              </p>
              <p class=" text-2xl italic ">
                {val.movieReview}
              </p>
              <br/>
              <br/>
              <input class="px-2 m-2 rounded-cool text-orange-800" type="text" onChange={(e) => {
                setNewReview(e.target.value)
              }}/>
              <button class="hover:text-orange-300" onClick={() => {updateReview(val.movieName)}}> &nbsp;Update ♻️</button>
              <button>&nbsp;|&nbsp;</button>
              <button class="hover:text-orange-300" onClick={() => {deleteReview(val.movieName)}}> Delete ❌</button>
            </div>
            
          ) 
        }) }
        </div>
      </main>
    );
  }