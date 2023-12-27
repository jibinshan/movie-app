import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
       
       <div className={menu ?"flex flex-col items-center justify-center gap-4 bg-slate-800 p-4 w-1/2 mr-3 align text-white mr-0 ml-auto rounded-md z-40" : "hidden"}>
           <NavLink to={"/movie"} className={({isActive})=> isActive ? 'flex  items-center text-slate-900  gap-2 bg-slate-300 w-full text-left':'flex  items-center  gap-2 hover:bg-slate-400 w-full text-left'}>

            <h3 className='flex gap-2 items-center pl-2'>
            <IoMdHome/>
              HOME
              </h3>
           </NavLink>
              {localStorage.role === "admin" ?
              <NavLink to={"/"} className={({isActive})=> isActive ? 'flex  items-center text-slate-900  gap-2 bg-slate-300 w-full text-left':'flex  items-center  gap-2 hover:bg-slate-400 w-full text-left'}>
           <h3 className='flex gap-2 items-center pl-2'>
           <RiVideoAddFill/>
           ADD MOVIE
           </h3>
              </NavLink>
           :
           ""
         }
          {localStorage.role === "admin" ?
          <NavLink to={"/genre"} className={({isActive})=> isActive ? 'flex  items-center text-slate-900  gap-2 bg-slate-300 w-full text-left':'flex  items-center  gap-2 hover:bg-slate-400 w-full text-left'}>

            <h3 className='flex gap-2 items-center pl-2'>
              <TfiThemifyFaviconAlt/>
              GENRE
              </h3>
          </NavLink>
          :
        ""
        } 
           <NavLink to={`/watchlater/${localStorage.userid}`} className={({isActive})=> isActive ? 'flex  items-center text-slate-900  gap-2 bg-slate-300 w-full text-left':'flex  items-center  gap-2 hover:bg-slate-400 w-full text-left'}>
             <h3 className='flex  gap-2 items-center pl-2'>
              <MdWatchLater/>
              WATCHLATER
              </h3>
           </NavLink>
        <h3 className='flex  items-center  gap-2  hover:text-slate-900 hover:bg-slate-400  focus:bg-slate-400 w-full text-left pl-2' onClick={()=>{
           localStorage.clear()
          navigate("/login")}
          }>
            <IoLogIn/>
            {localStorage.getItem("acesstocken") ? "LOGOUT":"LOGIN"}
            </h3>
        </div>
       
      </div>
      
      
      :
    <div className='h-screen    bg-slate-900 flex flex-col justify-between py-3'>
        <div className="flex flex-col gap-2">
          <h2 className='font-bold text-lg text-red-500 p-3 text-left'>CineCipher</h2>
          <NavLink to={"/"} className={({isActive})=>(isActive?'font-bold cursor-pointer text-slate-900 bg-slate-300  text-md flex items-center  gap-2 p-3' :'font-bold cursor-pointer text-slate-300 hover:text-slate-900 hover:bg-slate-300 text-md flex items-center  gap-2 p-3')}>
             <h3 className="flex justify-center items-center gap-2">
            <IoMdHome/>
              HOME
              </h3>
          </NavLink>
          {localStorage.role === "admin" ? 
          <NavLink to={"/movie"} className={({isActive})=>(isActive ?'font-bold cursor-pointer text-slate-900 bg-slate-300  text-md flex items-center  gap-2 p-3' :'font-bold cursor-pointer text-slate-300 hover:text-slate-900 hover:bg-slate-300 text-md flex items-center  gap-2 p-3' )}>

          <h3 className="flex justify-center items-center gap-2">
          <RiVideoAddFill/>
          ADD MOVIE
          </h3>
          </NavLink>
          :
          ""  
        }
             {localStorage.role === "admin" ? 
        <NavLink to={"/genre"} className={({isActive})=>(isActive ?'font-bold cursor-pointer text-slate-900 bg-slate-300  text-md flex items-center  gap-2 p-3' :'font-bold cursor-pointer text-slate-300 hover:text-slate-900 hover:bg-slate-300 text-md flex items-center  gap-2 p-3' )}>
         <h3 className="flex justify-center items-center gap-2">
          <TfiThemifyFaviconAlt/>
          GENRE
          </h3>
             </NavLink>
          
          :
          ""  
        }
             <NavLink to={`/watchlater/${localStorage.userid}`} className={({isActive})=>(isActive ?'font-bold cursor-pointer text-slate-900 bg-slate-300  text-md flex items-center  gap-2 p-3' :'font-bold cursor-pointer text-slate-300 hover:text-slate-900 hover:bg-slate-300 text-md flex items-center  gap-2 p-3' )}>

            <h3 className="flex justify-center items-center gap-2">
              <MdWatchLater/>
              WATCHLATER
              </h3>
             </NavLink>
        </div>
        <h3 className='font-bold cursor-pointer text-slate-300 hover:text-slate-900 hover:bg-slate-300 focus:bg-slate-300 text-md flex items-center  gap-2 p-3' onClick={()=>{
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
