import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchgenre, post, remove } from '../redux/Genreredux';
function Genre() {
  const {genres} = useSelector(state=>state.Genres)
  const dispatch = useDispatch()
  const [addgenre,setAddgenre] = useState("")
  const [genreid,setGenreid] = useState(null)
  const [error,seterror] = useState("")
  const api = "https://movieapp-server-ax0c.onrender.com/genre"
  useEffect(()=>{
    dispatch(fetchgenre())
  },[])
  const handlegenredelete = async(genreid,title)=>{

    try {
        
      const response = await axios(api,{
       method:"DELETE",
       data:{
         _id:genreid,
       }
      })
       await dispatch(remove(response.data))
       toast.success(`${title} deleted`)
      } catch (error) {
        console.log(error);
    }
     
  }
  const handleinputchange = (e)=>{
    setAddgenre(e.target.value)
  }
  const handlesubmit = async()=>{
    try {
      if (addgenre !== "") {
        const response = await axios(api,{
          method:"POST",
          data:{
            _id:genreid,
            title:addgenre
          }
        })
        await dispatch(post(response.data))
        setAddgenre("")
        setGenreid(null)
       toast.success("successful")
      }else{
        return genres
      }
    } catch (error) {
      toast.error("error occured")
     seterror(error.response.data);
    }
  }
  const handleupdate = (genrid,genretitle)=>{
        setGenreid(genrid)
        setAddgenre(genretitle)
  }
  return (
    <div className='w-screen flex bg-slate-200 h-screen'>
      <Sidebar/>
      <div className="mt-24 xl:mt-0 xl:ml-44 w-screen flex justify-center items-center text-slate-200">
        <div className="flex flex-col gap-4 bg-slate-800 w-fit h-fit p-4 rounded-md shadow-xl">
        <h2 className='text-center font-bold text-lg'>UPLOAD NEW GENRE</h2>
            <div className="flex flex-col">
            <h4 className='text-left font-bold'>Genre</h4>
            <div className='flex gap-2 w-full'>
            <input value={addgenre} type="text" placeholder="genre" className='rounded-sm shadow-lg p-2 pl-4 text-black w-4/5' onChange={handleinputchange}/>
            <button className='rounded-md bg-blue-300 text-black text-sm p-1 hover:bg-blue-400 pl-3 pr-3' onClick={handlesubmit}>SUBMIT</button>
             </div>
            </div>
            <div className="grid gap-3 grid-cols-2">
                   {genres.map((genres,key)=>{
                    return(
                      <div key={key} className='bg-slate-600 rounded-md p-1 flex gap-1 justify-center items-center shadow-lg p-4'>
                        <p>{genres.title}</p>
                        <div className='w-full flex gap-2 justify-end '>
                          <div className='hover:text-slate-400' onClick={()=>handleupdate(genres._id,genres.title)}>
                          <FaPen/>
                          </div>
                          <div className='hover:text-slate-400' onClick={()=>handlegenredelete(genres._id,genres.title)}>
                          <MdDelete/>
                          </div>
                        </div>
                      </div>
                    )
                   })}
            </div>
            {error ? <p className='text-red-600 text-center text-md'>{error}</p>:""}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Genre
