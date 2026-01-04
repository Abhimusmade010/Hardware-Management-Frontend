import {Routes,Route} from "react-router-dom"

import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"

import PublicLayout from "../components/Layouts/PublicLayout"
import Form from "../pages/form/Form"
import Home from "../pages/public/Home"
import Dashboard from "../pages/dashboard/Dashboard"
import Footer from "../components/Layouts/Footer"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PublicLayout><Home/></PublicLayout> }/>
        <Route path="/signup" element={<PublicLayout ><Signup/></PublicLayout>}/>
        <Route path="/login" element={<PublicLayout ><Login/></PublicLayout>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route  path="/form" element={<PublicLayout flag='false' ><Form/></PublicLayout>}/>

        {/* <Footer/> */}
        {/* <Route path/> */}
    </Routes>
  )
}  

export default AppRoutes

