import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://movie-app-server-jibinshans-projects.vercel.app/genre"
export const fetchgenre = createAsyncThunk("Genre/fetchgenre", async()=>{
    try {
       const response = await axios.get(api) 
       return response
    } catch (error) {
        throw error
    }
})
const initialState = {
    genres:[]
}
const GenreSlice = createSlice({
    name:"Genre",
    initialState:initialState,
    reducers:{
      remove : (state,action)=>{
           state.genres = action.payload
      },
      post : (state,action)=>{
         state.genres = action.payload
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchgenre.pending,(state,action)=>{
            console.log("pending");
        })
        builder.addCase(fetchgenre.fulfilled,(state,action)=>{
            console.log("start");
            state.genres = action.payload.data
        })
        builder.addCase(fetchgenre.rejected,(state,action)=>{
            console.log("end");
        })

    },
})

export const { update,remove,post } = GenreSlice.actions;
export default GenreSlice.reducer