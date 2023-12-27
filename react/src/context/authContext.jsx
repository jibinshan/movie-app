import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
   const [auth,setAuth] = useState(false)
   const [data,setData] = useState('')
   const api = "https://movieapp-backend-pdqb.onrender.com/user/login"
   const login = async(input)=>{
    try {
        const response = await axios(api,{
            method:"POST",
            data:input
        })
        setAuth(true) 
        setData(response)
        console.log(response);
     
        navigate("/")
    } catch (error) {
       setData(error.response) 
       console.log(error.response,"===error");
    }
   
   }
const logout =()=>{
    setAuth(false)
}

    return(
        <AuthContext.Provider value={{auth,logout,login,data,setData}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}