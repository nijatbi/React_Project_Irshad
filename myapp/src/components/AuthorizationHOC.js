import React from 'react'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const AuthorizationHOC=(WrappedComponent,allowedRoles)=>{
    return(props)=>{
      let token = localStorage.getItem('token');
      if (token==null) {
          token=sessionStorage.getItem("token")
      }
      if (!token) {
        // Handle the case where the token is not present (e.g., redirect to login)
        return <Navigate to={`/login?redirectUrl=${encodeURIComponent(window.location.pathname)}`} />;
      }
      const decodedToken = jwtDecode(token);
         const userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  
      if (!userRoles) {
        // Handle the case where the 'role' property is not present in the decoded token
        return <Navigate to={`/login?redirectUrl=${encodeURIComponent(window.location.pathname)}`} />;
      }
  
      // Convert single role to an array for consistent handling
      const userRolesArray = Array.isArray(userRoles) ? userRoles : [userRoles];
  
      // Check if the user has the required roles
      const isAuthorized = allowedRoles.some(role => userRolesArray.includes(role));
  
      if (isAuthorized) {
        return <WrappedComponent {...props} />;
      } else {
        // Redirect to login with redirectUrl
        return <Navigate to={`/login?redirectUrl=${encodeURIComponent(window.location.pathname)}`} />;
      }
    };
}
export default AuthorizationHOC;