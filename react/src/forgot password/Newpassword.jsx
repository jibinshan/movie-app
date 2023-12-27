import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';

function Newpassword() {
    const [loading,setLoading] = useState(false)
    const [input,setInput] = useState({
      email:"",
      password:"",
    })
    const navigate = useNavigate()
    const api = "https://movieapp-backend-pdqb.onrender.com/user/changepassword"
    const handlesubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios(api,{
                method:"POST",
                data:input,
            })
            console.log(response);
            navigate("/login")
        } catch (error) {
          console.log(error);
          toast("invalid email")
        }finally{
          setLoading(false)
        }
      }
      const handleinputchange = (e)=>{
        setInput((prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
      }
  return (
    <div>
       <div className='w-screen h-screen bg-slate-200 flex flex-col justify-center items-center gap-8'>
      <form action="" className='flex flex-col gap-4 w-fit bg-white p-4 rounded-md shadow-xl'>
      <h2 className='font-bold text-lg'>NEW PASSWORD</h2>
      <div  className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">email</label>
            <input type="email" 
            className='w-full shadow-md  outline-none pl-2 border-solid border-b border-slate-500'
            name='email'
            placeholder='Username'
            onChange={handleinputchange}
            />
        </div>
        <div className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">Password</label>
            <input type="password" 
            className='w-full shadow-md  outline-none pl-2 border-solid border-b border-slate-500'
              name='password'
              placeholder='Password'
              onChange={handleinputchange}
            />
        </div>
        <button className='bg-blue-900 hover:bg-blue-500 text-white p-1 rounded-md '  onClick={handlesubmit}>{loading ?
        <div className='text-center'>
          <ClipLoader color='#36D7B7' loading={loading} size={30}/>
        </div>
        :"Submit"}</button>
      <div>
        <p>click here to <Link className='border-solid border-b border-blue-500 text-blue-500' to="/login">Login</Link> </p>
        <p>forgottenpassword <Link className='border-solid border-b border-blue-500 text-blue-500' to="/forgottenpassword">click here</Link> </p>
      </div>
        {/* {data.status !== 200 && <p className="text-red-500 text-center">{data.data}</p>} */}
      </form>
        <ToastContainer />
    </div>
    </div>
  )
}

export default Newpassword

