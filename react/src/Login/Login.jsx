import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../redux/Authredux';

function Login() {
  const navigate = useNavigate()
  const {daata,loadings} = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [input,setInput] = useState({
    username:"",
    password:"",
  })
    
    const handlesubmit = (e)=>{
         e.preventDefault()
         try {
             dispatch(loginAsync(input)).then((result)=>{
              if (result.payload.status === 200) {
                navigate("/")
              }
             })
           
         } catch (error) {
          console.log(error);
         }
    }
    
    const handleinputchange = (e)=>{
      setInput((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
    }
  return (
    <div className='w-screen h-screen bg-slate-200 flex flex-col justify-center items-center gap-8'>
      <form action="" className='flex flex-col gap-4 w-fit bg-white p-4 rounded-md shadow-xl'>
      <h2 className='font-bold text-lg text-center'>Login</h2>
        <div  className="flex flex-col text-left">
            <label className='font-bold' htmlFor="">Username</label>
            <input type="text" 
            className='w-full shadow-md  outline-none pl-2 border-solid border-b border-slate-500'
            name='username'
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
        <button className='bg-blue-900 hover:bg-blue-500 text-white p-1 rounded-md pt-2 pb-2 font-extrabold'  onClick={handlesubmit}>{loadings ?
        <div className='text-center'>
          <ClipLoader color='#36D7B7' loading={loadings} size={30}/>
        </div>
        :"Login"}</button>
        {daata.status !== 200 && <p className="text-red-500 text-center">{daata.data}</p>}
       <div>
       <p><Link className='border-solid border-b border-blue-500 text-blue-500' to="/signup">click here</Link> to create account or Signup</p>
        <p className='text-center'>Forgotten password <Link className='border-solid border-b border-blue-500 text-blue-500' to="/forgottenpassword">click here</Link> </p>
       </div>
      </form>
        <ToastContainer />
    </div>
  )
}

export default Login
