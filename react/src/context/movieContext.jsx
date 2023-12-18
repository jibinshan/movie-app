import { createContext, useContext, useState } from "react"


export const MovieContext = createContext()

export const Movieprovider = ({children})=>{
    const [genreupdate,setGenreupdate] = useState([])
    const [movieid,setMovieid] = useState(null)
    const [upload,setUpload] = useState({
        Image:"",
        title:"",
        description:"",
   })  
   const [rating,setRating] = useState(0)
    return(
        <MovieContext.Provider value={{upload,setUpload,setRating,rating,genreupdate,setGenreupdate,movieid,setMovieid}}>
            {children}
        </MovieContext.Provider>
    )
}

export const useMovieupload = ()=>{
    return useContext(MovieContext)
}
