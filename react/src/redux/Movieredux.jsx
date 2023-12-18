import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   genreupdates :[],
   movieids:null,
   uploads : {
        Image:"",
        title:"",
        description:"",
   },
   ratings:0, 
}
const movieSlice = createSlice({
    name:"movie",
    initialState:initialState,
    reducers:{
      updatehandle: (state, action) => {
        state.genreupdates = action.payload?.genreid
        state.uploads.title=action.payload?.movietitle
        state.uploads.description=action.payload?.moviedescription
        state.uploads.Image = action.payload?.movieimage
        state.movieids=action.payload?.movieid
        state.ratings=action.payload?.movierating
      },
      titlechangehandle:(state,action)=>{
          state.uploads.title = action.payload
          
      },
      filehandle:(state,action)=>{
        state.uploads.Image = action.payload
        
    },
    descriptionhandle :(state,action)=>{
      state.uploads.description = action.payload
   
    },
    ratinghandle:(state,action)=>{
      state.ratings = action.payload
    },
    submithandle:(state,action)=>{

      state.genreupdates = []
      state.uploads.title=""
      state.uploads.description=""
      state.uploads.Image =""
      state.movieids=null
      state.ratings=0
    }
    }
})

export const { updatehandle,titlechangehandle,filehandle,descriptionhandle,submithandle,ratinghandle } = movieSlice.actions;
export default movieSlice.reducer