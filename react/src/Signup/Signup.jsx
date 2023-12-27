import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
    const [data,setData] = useState([])
    const [signup,setSignup] = useState({
      username:"",
      email:"",
      phone:"",
      password:"",
      cpassword:"",
    })
    const navigate = useNavigate()
    const handlesubmit = (e)=>{
         e.preventDefault()
        fetchsignup()
         
    }
    const handlesignchange = (e)=>{
          setSignup((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
          }))
    }
    const api = "https://movieapp-server-ax0c.onrender.com/user/signup"
    const fetchsignup = async()=>{
     try {
      const response = await axios(api,{
        method:"POST",
        data:signup,
       })
       setData(response);
       toast.success("signup succesfuly")
       navigate("/login")
     } catch (error) {
      toast.error("signup failed")
       setData(error.response,"===error");
     }
    }
  return (
    <div className='w-screen h-screen bg-slate-200 flex flex-col justify-center items-center gap-8 '>
      <form action=""  className='flex flex-col gap-4 w-fit bg-white p-4 rounded-md shadow-xl'>
      <h2 className='font-bold text-lg text-center'>Signup</h2>
        <div className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">Username</label>
            <input type="text"
            className='w-full shadow-md  outline-none pl-2 border-solid border-b border-slate-500'
            name='username'
            placeholder='username'
            onChange={handlesignchange}
            />
        </div>
        <div className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">Email</label>
            <input type="email"
            className='w-full shadow-md outline-none pl-2 border-solid border-b border-slate-500' 
            name='email'
            placeholder='email'
            required
            onChange={handlesignchange}
            />
        </div>
        <div className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">Phone</label>
            <input type="text"
            className='w-full shadow-md outline-none pl-2 border-solid border-b border-slate-500' 
            name='phone'
            placeholder='phone'
            onChange={handlesignchange}
            />
        </div>
        <div className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">Password</label>
            <input type="password"
            className='w-full shadow-md  outline-none pl-2 border-solid border-b border-slate-500'
            placeholder='password' 
            name='password'
            onChange={handlesignchange}
            />
        </div>
        <div className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">Confirm Password</label>
            <input type="password"
            className='w-full shadow-md  outline-none pl-2 border-solid border-b border-slate-500'
            placeholder='conform password' 
            name='cpassword'
            onChange={handlesignchange}
            />
        </div>
        <button onClick={handlesubmit} className='bg-blue-900 hover:bg-blue-500 text-white p-1 rounded-md ' >Signup</button>
        {data && <p className={data.status !== 200 ?"text-red-500 text-center":"text-green-500 text-center"}>{data.data}</p>}
        <h2 className='text-center'>
          Already have Account or Login <Link className='border-solid border-b border-blue-500 text-blue-500' to="/login">Click here</Link>
          </h2>
        <ToastContainer/>
      </form>
    </div>
  )
}

export default Signup
