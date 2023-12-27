import axios from "axios";
import {  createContext, useContext, useEffect, useState } from "react";


export const GenreContext = createContext()

export const GenreProvider = ({children})=>{
    const [genre,setGenre] = useState([])
    const api = "https://movieapp-server-ax0c.onrender.com/genre"
    const fetchmovie = async()=>{
      try {
        const response = await axios(api)
        setGenre(response.data); 
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
        fetchmovie()
    },[])
    return(
       <GenreContext.Provider value={{genre,setGenre}}>
        {children}
       </GenreContext.Provider>
    )
}
export const useGenre = ()=>{
   return useContext(GenreContext)
} 