import { Routes, Route } from "react-router-dom";
import PublicLayout from "../components/Layouts/PublicLayout";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Home from "../pages/public/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Form from "../pages/form/Form";
import Dashboard from "../pages/dashboard/Dashbaord";
import Pending from "../pages/dashboard/Pending";
import Resolved from "../pages/dashboard/Main/Resolved";
import Analytics from "../pages/dashboard/Main/Analytics";
import Settings from "../pages/dashboard/Main/Settings";
import Profile from "../pages/profile/Profile";

// import MaintainanceDashboard from "./pages/maintenance/MaintainanceDashboard"
// import ComplaintModal from "../pages/Details/ComplaintModal"
const UserRoutes = () => {
  return (
    <Routes>
        <Route path="home" element={<PublicLayout><Home/></PublicLayout> }/>

        <Route path="signup" element={<PublicLayout ><Signup/></PublicLayout>}/>

        <Route path="login" element={<PublicLayout ><Login/></PublicLayout>}/>
        
        <Route  path="form" element={<PublicLayout flag='false' ><Form/></PublicLayout>}/>
        

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pending" element={<Pending />} />
          <Route path="resolved" element={<Resolved />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />

        </Route>
        
        
        <Route path="profile" element={<Profile/>}/>
        {/* <Route path="/ComplaintModal" element={<ComplaintModal/>}/> */}

        

    </Routes>
  )
}  

export default UserRoutes

