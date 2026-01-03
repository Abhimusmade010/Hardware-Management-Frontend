import {Routes,Route} from "react-router-dom"

import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"

import PublicLayout from "../components/Layouts/PublicLayout"

import Home from "../pages/public/Home"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PublicLayout><Home/></PublicLayout>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}  

export default AppRoutes

