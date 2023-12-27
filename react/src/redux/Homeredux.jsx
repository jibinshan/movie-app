import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://movieapp-server-ax0c.onrender.com/movie/pagination"
export const fetchdataasync =  createAsyncThunk("Home/fetchdataasync",async(currentpage,{dispatch})=>{
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
     await dispatch(loginsuccess(response))
     return response
   } catch (error) {
     console.log(error.message);
     }
   })
const initialState = {
    responses:[]
}
const HomeSlice = createSlice({
    name:"Home",
    initialState:initialState,
    reducers:{
        loginsuccess:(state,action)=>{
            state.responses = action.payload
        }
    }
})
export const { loginsuccess } = HomeSlice.actions;
export default HomeSlice.reducer