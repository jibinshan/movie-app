import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  toast } from 'react-toastify';

const api = "http://localhost:2010/user/login"
export const loginAsync = createAsyncThunk("Auth/login",async (input,{dispatch})=>{
    try {
        const response = await axios(api,{
        method:"POST",
        data:input
    })
    toast.success("successfuly logged in");
    await dispatch(loginsuccess(response))
    return response
} catch (error) {
    toast.error("login failed");
    if (!error.response) {
         console.log(error,"=====!error");
    }
    await dispatch(loginfailed(error.response))
    return error?.response
}
})
const initialState = {
  isAuthenticated : false,
  daata:{},
  loadings:false,
}

const Authslice = createSlice({
    name:"Auth",
    initialState:initialState,
    reducers:{
       loginsuccess : (state,action)=>{
          state.isAuthenticated = true
            state.daata = action.payload
            localStorage.setItem("acesstocken",action.payload.data.acesstocken)
            localStorage.setItem("username",action.payload.data.username)
            localStorage.setItem("role",action.payload.data.role)
            localStorage.setItem("userid",action.payload.data._id)
       },
       loginfailed : (state,action)=>{
          state.isAuthenticated = false
          state.daata = action.payload
       },
    },
    extraReducers:(builder)=>{
        builder.addCase(loginAsync.pending,(state,action)=>{
            console.log("pending");
            state.loadings = true
        })
        builder.addCase(loginAsync.fulfilled,(state,action)=>{
            console.log("start");
            state.loadings = false
            
        })
        builder.addCase(loginAsync.rejected,(state,action)=>{
            console.log("end");
           state.loadings = false
        })

    },
})

export const { loginsuccess,loginfailed } = Authslice.actions;
export default Authslice.reducer