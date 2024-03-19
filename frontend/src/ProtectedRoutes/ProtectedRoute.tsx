import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
const useAuth = () => {
  // get auth state and user role
  const role  = sessionStorage.getItem('userRole');
  console.log(role)
  return role;
};
const ProtectedRoute = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace state={{ from: location }} />;
  } else if (!allowedRoles.includes(auth)) {
    // Redirect to unauthorized page if not authorized
    return <Navigate to="/unauthorized" replace />;
  }
  //Create more else if there more redirects 

  return <Outlet />; // Render children routes if authorized
};
export default ProtectedRoute;