import {Routes,Route} from "react-router-dom"

import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"

import PublicLayout from "../components/Layouts/PublicLayout"
import Form from "../pages/form/Form"
import Home from "../pages/public/Home"
// import Dashboard from "../pages/dashboard/Main/StatCards"
import Dashboard from "../pages/dashboard/Dashbaord"
// import Footer from "../components/Layouts/Footer"
// const {isAuthenticated } = useAuth();
import DashboardLayout from "../pages/dashboard/DashboardLayout"
import Pending from "../pages/dashboard/Pending"
import Resolved from "../pages/dashboard/Main/Resolved"
import Analytics from "../pages/dashboard/Main/Analytics"
import Settings from "../pages/dashboard/Main/Settings"
import Profile from "../pages/profile/Profile"
// import ComplaintModal from "../pages/Details/ComplaintModal"
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PublicLayout><Home/></PublicLayout> }/>
        <Route path="/signup" element={<PublicLayout ><Signup/></PublicLayout>}/>
        <Route path="/login" element={<PublicLayout ><Login/></PublicLayout>}/>
        <Route path="/dashboard" element={<PublicLayout ><Dashboard/></PublicLayout>}/>
        <Route  path="/form" element={<PublicLayout flag='false' ><Form/></PublicLayout>}/>
        

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pending" element={<Pending />} />
          <Route path="resolved" element={<Resolved />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/ComplaintModal" element={<ComplaintModal/>}/> */}
    </Routes>
  )
}  

export default AppRoutes

