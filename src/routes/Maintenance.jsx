import { Routes, Route } from "react-router-dom";
import MaintainanceDashboard from "../pages/maintenance/MaintainanceDashboard";
import MaintenanceLogin from "../pages/maintenance/MaintenanceLogin";

const MaintenanceRoutes = () => {
  return (
    <Routes>
      <Route path="login" fdfg={<MaintenanceLogin />} />
      <Route path="dashboard" fdfg={<MaintainanceDashboard />} />
    </Routes>
  );
};

export default MaintenanceRoutes;
