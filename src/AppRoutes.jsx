import { Routes, Route } from "react-router-dom";
import ROUTES from "./routes/routePaths";

import LandingPage from "./LandingPage";
import UserRoutes from "./routes/UserRoutes";
import MaintenanceRoutes from "./routes/Maintenance";
import AdminRoutes from "./routes/AdminRoutes";

// 
const AppRoutes = () => {
  return (

    <Routes>

      <Route path={ROUTES.ROOT} element={<LandingPage />} />

      <Route path={`${ROUTES.USER.ROOT}/*`} element={<UserRoutes/>} />

      <Route
        path={`${ROUTES.MAINTENANCE.ROOT}/*`}
        element={<MaintenanceRoutes />}
      />

      <Route path="/admin/*" element={<AdminRoutes />} />
      
    </Routes>
    
  );
};



export default AppRoutes;
