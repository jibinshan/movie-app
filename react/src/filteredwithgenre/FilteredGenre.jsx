import axios from 'axios'
import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'

function FilteredGenre({selectedgenre}) {
    const {genres} = useSelector((state)=>state.Genres)
    const [data,setData] = useState([])
    const skeleton = [1,2,3,4]
    const [loading,setLoading] = useState(true)
    const api ="https://movieapp-server-ax0c.onrender.com/movie/filter"
    const fetchdata = async()=>{
        try {
            const response = await axios(api,{
                params:{
                    genretitle:selectedgenre
                }
            })
         setData(response)
         setLoading(false)
        } catch (error) {
                setLoading(false)
               console.log(error.response);
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])
    genres.filter((genres)=>
    genres.title.toLowerCase().includes(selectedgenre.toLowerCase())
    )
    
  return (
    <div className='bg-slate-200 h-screen'>
        <Sidebar/>
        <div className='bg-slate-200 h-screen xl:ml-40 flex flex-col p-4'>
        {loading ?
             <div className="flex flex-col justify-between  border-slate-700 items-center xl:pr-4 shadow-lg w-full h-fit pt-24 xl:pt-0 ">
             {skeleton.map((i)=>{
               return(
                 <div className='flex  gap-3 w-full bg-zinc-800 rounded-md overflow-hidden h-60 mb-4'key={i}>
                <div className='w-2/6 h-full xl:w-1/5'> <Skeleton height={"100%"}/> </div>
               <div className='flex justify-between items-center pl-2 pr-2 w-full'>
               <h4 className='font-bold text-md xl:text-lg text-slate-200 text-center w-full text-start '> <Skeleton/> </h4>
               </div>
             </div>
                  )
                 })
                }
                 </div>:
                 <div>

       {  data.status === 200 ?
        
        <div className='flex flex-col gap-2 mt-24 xl:mt-0'>
          
            {data.data.map((movie,key)=>{
                return(
                    <div key={key} className='flex justify-between border-2 border-slate-700 items-center xl:pr-4 shadow-lg w-full h-fit '>
                    <img className='w-2/6 h-full xl:w-1/5' src={movie.imagepath} alt="" />
                    <h4 className='font-bold text-sm xl:text-xl w-2/6 xl:w-2/5 overflow-hidden break-words'>{movie.title}</h4>
                    <div className='grid justify-end  w-2/6 xl:w-2/5 xl:flex xl:justify-between p-1 overflow-hidden xl:pl-4'>
                    {
                        movie.genre.map((genres,key)=>{
                            return(
                                   <p key={key} className='rounded-md border-2 border-slate-700 p-1 text-xs text-slate-700 xl:text-lg'>{genres.title}</p>
                                   )
                                })
                            }
                            </div>
                    </div>
                )
            })}
            </div>
        
        : <h1 className='h-screen flex justify-center items-center font-bold text-lg '>Genre you entered not found</h1>
        }
     
        </div>
}
        </div>
    </div>
  )
}

export default FilteredGenre
