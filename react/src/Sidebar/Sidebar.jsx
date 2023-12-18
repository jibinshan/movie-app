import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { IoMdHome } from "react-icons/io";
import { RiVideoAddFill } from "react-icons/ri";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import { MdWatchLater } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
function Sidebar() {
  const [menu,setMenu] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1025px)' })
    const navigate = useNavigate()
    const handlemenu = ()=>{
      setMenu((prev)=>
         !prev
      )
    }
  return (
    <div className={isTabletOrMobile ?" fixed":"w-40 fixed"}>
    {isTabletOrMobile 
      ? 
      <div className='flex flex-col'>

      
        <div className='flex items-center justify-between p-4 text-white bg-slate-900 h-24 w-screen '>
           <h2 className='font-bold  text-red-500 p-3 text-lg'>CineCipher</h2>
           <div className='  focus:text-red-300 text-xl' onClick={handlemenu}>
             {menu?<IoMdClose/>: <IoMenu/>} 
          </div>
        </div>
       
       <div className={menu ?"flex flex-col items-center justify-center gap-4 bg-slate-800 p-4 w-1/2 mr-3 align text-white mr-0 ml-auto rounded-md" : "hidden"}>
            <h3 className='flex  items-center  gap-2 hover:bg-slate-400  focus:bg-slate-400 w-full text-left' onClick={()=>navigate("/")}>
            <IoMdHome/>
              HOME
              </h3>
              {localStorage.role === "admin" ?
           <h3 className='flex  items-center gap-2 hover:bg-slate-400  focus:bg-slate-400 w-full text-left' onClick={()=>navigate("/movie")}>
           <RiVideoAddFill/>
           ADD MOVIE
           </h3>
           :
           ""
         }
          {localStorage.role === "admin" ?
            <h3 className='flex  items-center  gap-2 hover:bg-slate-400  focus:bg-slate-400 w-full text-left' onClick={()=>navigate("/genre")}>
              <TfiThemifyFaviconAlt/>
              GENRE
              </h3>
          :
        ""
        }
            <h3 className='flex  items-center  gap-2 hover:bg-slate-400  focus:bg-slate-400 w-full text-left' onClick={()=>navigate(`/watchlater/${localStorage.userid}`)}>
              <MdWatchLater/>
              WATCHLATER
              </h3>
        <h3 className='flex  items-center  gap-2 hover:bg-slate-400  focus:bg-slate-400 w-full text-left' onClick={()=>{
           localStorage.clear()
          navigate("/login")}
          }>
            <IoLogIn/>
            {localStorage.getItem("acesstocken") ? "LOGOUT":"LOGIN"}
            </h3>
        </div>
       
      </div>
      
      
      
      :
    <div className='h-screen  rounded-r-2xl  bg-slate-900 flex flex-col justify-between py-3'>
        <div className="flex flex-col gap-2">
          <h2 className='font-bold text-lg text-red-500 p-3 text-left'>CineCipher</h2>
            <h3 className='font-bold cursor-pointer text-white hover:bg-slate-300 focus:bg-slate-300  text-md flex items-center gap-2 p-3' onClick={()=>navigate("/")}>
            <IoMdHome/>
              HOME
              </h3>
          {localStorage.role === "admin" ? 
          <h3 className='font-bold cursor-pointer text-white hover:bg-slate-300 focus:bg-slate-300  text-md flex items-center  gap-2 p-3' onClick={()=>navigate("/movie")}>
          <RiVideoAddFill/>
          ADD MOVIE
          </h3>
          :
          ""  
        }
             {localStorage.role === "admin" ? 
        <h3 className='font-bold cursor-pointer text-white hover:bg-slate-300 focus:bg-slate-300  text-md flex items-center  gap-2 p-3' onClick={()=>navigate("/genre")}>
          <TfiThemifyFaviconAlt/>
          GENRE
          </h3>
          
          :
          ""  
        }
            <h3 className='font-bold cursor-pointer text-white hover:bg-slate-300 focus:bg-slate-300  text-md flex items-center  gap-2 p-3' onClick={()=>navigate(`/watchlater/${localStorage.userid}`)}>
              <MdWatchLater/>
              WATCHLATER
              </h3>
        </div>
        <h3 className='font-bold cursor-pointer text-white hover:bg-slate-300 focus:bg-slate-300 text-md flex items-center  gap-2 p-3' onClick={()=>{
           localStorage.clear()
          navigate("/login")}
          }>
            <IoLogIn/>
            {localStorage.getItem("acesstocken") ? "LOGOUT":"LOGIN"}
            </h3>
    </div>
    }
    </div>
  )
}

export default Sidebar
