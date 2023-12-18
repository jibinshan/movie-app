
import { Navigate, Outlet } from 'react-router-dom'

 const ProtectedRoute=() =>{
    if(localStorage.getItem("acesstocken")){
        return <Outlet/>
    }else{

        return <Navigate to="/login"/>
    }

}
export default ProtectedRoute

