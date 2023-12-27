import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { MdDelete } from "react-icons/md";
import { GiEmptyChessboard } from "react-icons/gi";
import { ToastContainer,toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'


function Watchlater() {
    let userid = localStorage.userid
    const [later,setLater] = useState([])
    const [loading,setLoading] = useState(true)
    const skeleton = [1,2,3,4,5,6]
    const api = `https://movieapp-server-ax0c.onrender.com/user/watchlater/${userid}`
    const fetchdata = async()=>{
      const response = await axios(api)
      setLater(response.data.movie);
      setLoading(false)
    }
    useEffect(()=>{
        fetchdata()
    },[])
    const handledelete = async(movieid,title)=>{
     try {
      const response = await axios(api,{
        method:"DELETE",
        data:{
          movieid,
        }
       })
       setLater(response.data);
       toast.success(`${title} deleted from watchlater`)
     } catch (error) {
      console.log(error);
     }
    }
  return (
    <div className='flex bg-slate-200'>
       <Sidebar/>
         <div className="bg-slate-200 w-screen xl:ml-40 h-screen mt-24 xl:mt-0 p-4 flex flex-col gap-4">
          {later.length !== 0 && 
             <h1 className='font-bold text-lg text-center'>WATCHLATER</h1>
          }
             {loading ?
             <div className="flex flex-col xl:grid xl:grid-cols-3 gap-2 xl:gap-10">
             {skeleton.map((i)=>{
               return(
                 <div className='flex flex-col gap-3 w-full bg-zinc-800 rounded-md overflow-hidden h-60 mb-4'key={i}>
                <div className='h-4/5'> <Skeleton height={"100%"}/> </div>
               <div className='flex justify-between items-center pl-2 pr-2 w-full'>
               <h4 className='font-bold text-md xl:text-lg text-slate-200 text-center w-full text-start '> <Skeleton/> </h4>
               </div>
             </div>
                  )
                 })
                }
                 </div>:
         later.length !== 0 ? 
               <div className="flex flex-col xl:grid xl:grid-cols-3 gap-2 xl:gap-10">
                {
                    later?.map((movie,key)=>{
                        return(
                            <div key={key} className='flex flex-col gap-3 w-full bg-slate-800 rounded-md overflow-hidden h-60 mb-4'>
                               <img className='h-4/5 object-cover' src={movie.imagepath} alt="" />
                              <div className='flex justify-between items-center pl-2 pr-2 w-full'>
                              <h4 className='font-bold text-md xl:text-lg text-slate-200 text-center w-4/5 text-start '>{movie.title}</h4>
                               <div className='font-bold text-md xl:text-lg text-slate-200 text-center hover:text-slate-400' onClick={()=>handledelete(movie._id,movie.title)}>
                                  <MdDelete/>
                               </div>
                              </div>
                            </div>
                        )
                    })
                }
             </div>:
             <div className='text-xl text-blue-600 h-full flex flex-col justify-center items-center'>
              <div className='text-6xl'>
               <GiEmptyChessboard/>
              </div>
              <h1>Watchlater is empty</h1>
             </div>
             
            }
         </div>
         <ToastContainer/>
    </div>
  )
}

export default Watchlater
