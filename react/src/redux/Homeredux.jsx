import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const api = "https://movieapp-server-ax0c.onrender.com/movie/pagination"
export const homeasync = createAsyncThunk("Home/homeasync",async (currentpage,{dispatch})=>{
    try {
        const response = await axios(api,{
          method:"GET",
          headers:{
            authorization:localStorage.getItem("acesstocken")
          },
          params: {
            page: currentpage,
            limit: 4,
     
          },
        },
        )
        await dispatch(fetchsucces(response))
        return response
} catch (error) {
    
         console.log(error,"=====!error");
         throw error
    
}
})
export const homedeleteasync = createAsyncThunk("Home/homedeleteasync",async (movieid,{dispatch})=>{
    try {
        const response = await axios(`https://movieapp-server-ax0c.onrender.com/movie/delete/${movieid}`,{
          method:"DELETE"
        })
        await dispatch(deletesucces(response))
        return response
       } catch (error) {
    
         console.log(error,"=====!error");
         throw error
    
}
})
const initialState = {
   result:{},
   movie:[],
   totalPages:1,
   loading:true
}

const Homeslice = createSlice({
   name:"Home" ,
   initialState:initialState,
   reducers:{
    fetchsucces:(state,action)=>{
      state.movie = action.payload.data.data
      state.totalPages = action.payload.data.totalpages
      if (state.movie.length !== 0 ) {
        state.loading = false
      }
    },
    deletesucces:(state,action)=>{
      state.movie = action.payload.data.data
      state.totalPages = action.payload.data.totalpages
    }
   },
   extraReducers:(builder)=> { builder.addCase(homeasync.fulfilled, (state, action) => {
    state.result = action.payload;
  })
   },
})

export const { fetchsucces,deletesucces } = Homeslice.actions;
export default Homeslice.reducer