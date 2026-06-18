import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTES from './routes/routePaths';

const LandingPage = () => {
  // Redirect root directly to user login since the user deleted the public landing page UI
  return <Navigate to={ROUTES.USER.LOGIN} replace />;
};

export default LandingPage;
