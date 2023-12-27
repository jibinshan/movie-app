import { Route, Routes } from 'react-router-dom';
import Genre from './Genre/Genre';
import Login from './Login/Login';
import Movie from './Movie/Movie';
import Signup from './Signup/Signup';
import Home from './home/Home';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import Watchlater from './Watchlater/Watchlater';
import { useState } from 'react';
import FilteredGenre from './filteredwithgenre/FilteredGenre';
import Forgotpassword from './forgot password/Forgotpassword';
import Verifyotp from './forgot password/Verifyotp';
import Newpassword from './forgot password/Newpassword';
import './App.css';
import Roleprotected from './protectedRoute/Roleprotected';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  const [selectedgenre,setSelectedgenre] = useState('')
  return (
    <div className="bg-slate-200">
        <SkeletonTheme baseColor="#808080" highlightColor="#ccc">
      <Routes>
        <Route path='/' element={<Home setSelectedgenre={setSelectedgenre}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
         <Route path='/filtered' element={<FilteredGenre selectedgenre={selectedgenre}/>}/>
         <Route path='/forgottenpassword' element={<Forgotpassword/>}/>
         <Route path='/verifyotp' element={<Verifyotp/>}/>
         <Route path='/newpassword' element={<Newpassword/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route element={<Roleprotected/>}>
         <Route path='/movie' element={<Movie/>}/>
         <Route path='/genre' element={<Genre/>}/>  
         </Route>
         <Route path="/watchlater/:userid" element={<Watchlater/>}/>
        </Route>
      </Routes>
  </SkeletonTheme>
      
    </div>
  );
}

export default App;
