import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTES from './routes/routePaths';

// it simply redirects to the user login page 
const LandingPage = () => {
  return <Navigate to={ROUTES.USER.LOGIN} replace />;
};
// old url : http://localhost:5173/
// new url : http://localhost:5173/user/login
// here replacement happens because of replace prop 
// so if user goes back from login page it will not come to landing page instead it will go to the previous page before landing page
export default LandingPage;
