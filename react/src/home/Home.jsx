import  { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton'
import StarRating from '../components/StarRating'
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive'
// import { useMovieupload } from '../context/movieContext';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch } from 'react-redux';
import { updatehandle } from '../redux/Movieredux';
import Homeskeleton from './Homeskeleton';
function Home({setSelectedgenre}) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1025px)' })
   const dispatch = useDispatch()
  //  const {setUpload,setRating,setGenreupdate,setMovieid} = useMovieupload()
   const navigate = useNavigate()
    const [movie,setMovie] = useState([])
    const [loading,setLoading] = useState(true)
    const [currentpage,setCurrentpage] = useState(1)
    const [totalPages,setTotalpages] = useState(1)
    const userapi = `https://movieapp-backend-pdqb.onrender.com/user/watchlater/${localStorage?.userid}`
    const api = "https://movieapp-backend-pdqb.onrender.com/movie/pagination"
    const fetchdata = async()=>{
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
        const data = response.data
        setMovie(data.data);
        setTotalpages(data.totalpages)
        setLoading(false)
      } catch (error) {
        console.log(error.message);
        }
      }
      useEffect(()=>{
        fetchdata()

    },[currentpage])
    const handlePageChange = (e)=>{
      setCurrentpage(e.selected+1)
    }
    const handlewatchlater = async(movieid,title)=>{
      try {
        const response = await axios(userapi,{
          method:"PUT",
          data:{
            movieid,
          }
         })
         console.log(response);
         toast.success(`${title} added to watchlater`)
        } catch (error) {
          console.log(error);
      }
    }
    const handlegenreinput= (e)=>{
      setSelectedgenre(e.target.value);
    }
    const handlesearch = ()=>{
      
      navigate("/filtered")
    }
    const handledeletemovie = async(movieid,title)=>{
       try {
        const response = await axios(`https://movieapp-backend-pdqb.onrender.com/movie/delete/${movieid}`,{
          method:"DELETE"
        })
        setMovie(response.data.data)
        setTotalpages(response.data.totalpages)
        toast.success(`${title} deleted`)
       } catch (error) {
        console.log("internal error")
       }
    }
    const handleupdate = async(movieid,movieimage,movietitle,movierating,moviedescription,genreid)=>{
       try {
        // setRating(movierating)
        // setUpload({
        //   Image:movieimage,
        //   title:movietitle,
        //   description:moviedescription,
        // })
        // setGenreupdate(genreid)
        // setMovieid(movieid)
        
        await dispatch(updatehandle({movieid,
          movieimage,
          movietitle,
          movierating,
          moviedescription,
          genreid}))
        
           navigate("/movie")
      } catch (error) {
        console.log(error);
      }
    }
    return (
    <div className='mt-0 flex flex-col xl:flex bg-slate-200 h-fit xl:h-screen'>
      <Sidebar/>
      <div className="flex flex-col mt-24 xl:mt-0  ">
         <div className="flex p-2  xl:p-5 bg-slate-500 xl:bg-slate-900 text-white fixed w-full gap-3 xl:gap-0 ">
         {isTabletOrMobile ?"": <h3 className='xl:w-1/4 xl:text-red-400 xl:font-bold xl:text-xl xl:text-left '>cinecipher</h3> } 
         <div className='flex xl:w-3/4 xl:pl-32 w-full gap-2 '>
         <input className='pl-2 w-4/5 xl:w-1/2 bg-slate-600 outline-none rounded-md shadow-lg' placeholder={isTabletOrMobile ? 'genre' : 'search your fav genre'} type="text" onChange={handlegenreinput}/>
         <button className='bg-blue-300 p-1 pl-3 pr-3 rounded-lg text-black hover:bg-blue-200 ' onClick={handlesearch}>search</button>
           </div>
           </div>
      <div className="flex flex-col mt-16 xl:mt-20 xl:ml-44 xl:w-10/12 p-2 pb-4 xl:p-4">
        <div className='flex flex-col gap-4 xl:grid  xl:grid-cols-2 xl:gap-4'>
        {loading && 
        <Homeskeleton card={[1,2,3,4]}/> 
        }  

       {
         movie.map((movies,key)=>{
             return(
                <div key={key} className="flex w-full bg-slate-800 rounded-md overflow-hidden h-60">
                <img className='w-1/2 object-cover' src={movies.imagepath} alt="" />
                <div className="w-1/2 p-2 flex flex-col justify-between xl:justify-start ">
                <div className="flex items-center gap-1 xl:mb-4">
                <h4 className='font-bold text-md xl:text-lg  xl:ms-2 text-slate-200 '>{movies.title}</h4>
                <div className='flex text-slate-200 justify-end items-end gap-6 xl:text-2xl w-full'>
               {
                localStorage.role === "admin"?
                <div className='hover:text-slate-400' onClick={()=>handledeletemovie(movies._id,movies.title)}>
                <MdDelete/>
              </div>
              : ""
               }
                {
                localStorage.role === "admin"?
              <div className='hover:text-slate-400 text-md' onClick={()=>handleupdate(movies._id,movies.imagepath,movies.title,movies.rating,movies.description,movies.genre)}>
                  <FaPen/>
              </div> 
              : ""
               }
                <div className='hover:text-slate-400' onClick={()=>handlewatchlater(movies._id,movies.title)}>
                    < MdWatchLater/>
                </div>
                </div>
                </div>
                <div className="flex items-center gap-1 xl:ms-2 xl:mb-4">
                <StarRating rating={movies.rating}/>
                </div>
                <p className='text-slate-200 text-left text-sm xl:text-md xl:ms-2 xl:mb-4'>{movies.description}</p>
                <div className="flex justify-between xl:justify-start text-slate-200">
                {
                movies.genre.map((genres,key)=>{
                return(
                
                <p key={key} className='border-2 rounded-lg text-center xl:ms-2 text-xs xl:text-sm w-fit p-1 mb-2'>{genres.title}</p>
                
                )
             }) }
                </div>
                </div>
            </div>
             )
            })
          }
          </div>
       

      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={2}
        marginPagesDisplayed={0}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        
      />
      
      </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
