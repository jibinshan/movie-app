import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
// import { useMovieupload } from '../context/movieContext';
import { ToastContainer,toast } from 'react-toastify';
import { useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchgenre } from '../redux/Genreredux';
import { descriptionhandle, filehandle, ratinghandle, submithandle, titlechangehandle } from '../redux/Movieredux';

function Movie() {
  const checked = useRef(true)
  const fileinputref = useRef("")
  const {uploads,genreupdates,movieids,ratings} = useSelector((state)=>state.Movie)
  const {genres} = useSelector(state => state.Genres)
  const dispatch = useDispatch()
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  // const {upload,setUpload,rating,setRating,genreupdate,movieid,setMovieid,setGenreupdate} = useMovieupload()
  const [check,setcheck] = useState([])
  // const [genre,setGenre] = useState([])
  const [UIimage,setUIimage] = useState("")


  const handletitlechange =(e)=>{
      // setUpload((prev)=>({
      //   ...prev,
      //   title:e.target.value
      // }))
    dispatch(titlechangehandle(e.target.value))
  }
  const handledescriptionchange = (e)=>{
    // setUpload((prev)=>({
    //   ...prev,
    //   description:e.target.value
    // }))
    dispatch(descriptionhandle(e.target.value))
  }
const handlefile = (e)=>{
   
      const img = e.target.files[0]
      // setUpload((prev) => ({
      //   ...prev,
      //   Image: img,
      // }));
      dispatch(filehandle(img))
      if (img) {
        
        setUIimage(URL.createObjectURL(img))  
      }
    }
const api = "http://localhost:2010/movie"
// const genreapi = "http://localhost:2010/genre"
const jsonstring =JSON.stringify(check)
const handlesubmit = async()=>{
  setLoading(true);
  const file = uploads.Image
  const Formdata = new FormData()
  Formdata.append("_id",movieids ? movieids : "")
  Formdata.append("upload_file",file)
  Formdata.append("title",uploads.title)
  Formdata.append("rating",ratings)
  Formdata.append("description",uploads.description)
  Formdata.append("genre",jsonstring)


  try {
    console.log(movieids,"==movieids");
    const response = await axios(api,{
      method:"POST",
      headers:{
        "Content-Type":"multipart/form-data",
      },
     
      data:Formdata
    })
    setData(response)
    // setMovieid(null)
    // setUpload({
    //   Image:"",
    //   title:"",
    //   description:"",
    // })
    // setRating(0)
    // setMovieid("")
    setcheck([])
    // setGenreupdate([])
    dispatch(submithandle())
    setUIimage("")
    if (fileinputref.current) {
      fileinputref.current.value = '';
    }
    checked.current = true
    toast.success(response.data)
  } catch (error) {
    toast.error("error")
    setData(error.response);
  }finally {
    setLoading(false); 
  }
  
  
  
}
// const fetchdata =async ()=>{
//   try {
    
//     const response = await axios(genreapi)
//     setGenre(response.data)
//   } catch (error) {
//     console.log(error.data);
//   }
// }
const handlecheckchange = (e)=>{
  const files = e.target.value

 if (e.target.checked) {
   setcheck([...check,files])
 }else{
  let filter=check.filter((chck)=> chck !== e.target.value)
  setcheck(filter)
 }
}
let gnr=genreupdates.map((genreid)=>genreid._id)
useEffect(()=>{
dispatch(fetchgenre())
if (movieids) {
  setcheck(gnr)
}
},[])
const handleratingchange = (e)=>{
  // setRating(e.target.value)
  dispatch(ratinghandle(e.target.value))

}
  return (
    <div className='w-full bg-slate-200 h-screen flex flex-col xl:flex-row '>
      <Sidebar/>
      <div className="flex w-full xl:w-4/5  h-screen  justify-center items-center mt-24 xl:ml-40 xl:mt-0">
        <div className="mt-8 border-solid bg-white shadow-xl w-fit h-fit  p-6 flex flex-col gap-3 text-left  rounded-md bg-slate-200">
        <h2 className='font-bold text-lg text-center'>UPLOAD MOVIE</h2>
            <input type="file" placeholder='image' name='image' onChange={ handlefile } className='w-full' ref={fileinputref}/>
            {UIimage || uploads.Image ? <img className='h-24 w-24' src={UIimage === "" ? uploads.Image : UIimage} alt="" />:""}
            <div className="title">
            <h4 className='font-bold'>Title</h4>
            <input value={uploads.title} className='w-full border pl-1 shadow outline-none rounded-md' type="text" name='title' placeholder="Title" onChange={handletitlechange}/>
            </div>
            <div className="description">
            <h4 className='font-bold'>Description</h4>
            <input value={uploads.description} className='w-full border pl-1 shadow outline-none rounded-md h-14' type="text" name='description' placeholder="Description" onChange={handledescriptionchange}/>
            </div>
            <div className="rating">
            <h4 className='font-bold'>Rating</h4>
            <input className='w-full' value={ratings} type="range" min={1} max="5"  step="1" onChange={handleratingchange}/>
            <div className='flex justify-between'>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='font-bold'>Genre</h4>
                <div className="grid grid-cols-3 gap-y-3">

               {
                 genres.map((genres,key)=>{
                  return(
                    <div key={key} className="flex gap-1">
                    <label htmlFor="">{genres.title}</label>
                 
                      <input type="checkbox" value={genres._id} checked={check.includes(genres._id) || false}  onChange={handlecheckchange}/>
            
                    
                    </div>
                  )
                })
              }
              </div>
            </div>
            <button className="bg-blue-500 p-1 rounded-md hover:bg-blue-900 text-white focus:bg-blue-900" onClick={handlesubmit} > {loading ? (
            <div className='flex items-center justify-center'>
              <ClipLoader color='#36D7B7' loading={loading} size={30} />
            </div>
          ):"SUBMIT"}</button>
            {data.status !== 200 && <p  className= "text-center text-red-700">{data.data}</p>}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Movie
