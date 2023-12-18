
import { Navigate, Outlet } from 'react-router-dom'

 const Roleprotected=() =>{
    if(localStorage.role === "admin"){
        return <Outlet/>
    }else{

        return <Navigate to="/"/>
    }

}
export default Roleprotected
