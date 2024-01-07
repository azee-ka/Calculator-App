// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuthContext } from './utils/context/authentication';

function PrivateRoute({ element, ...rest }) {
  const { authState } = useAuthContext();

  console.log(authState.isAuthenticated);

    return (
        <Route {...rest} element={element} />
    )

//   return authState.isAuthenticated ? 
//   (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/access/login" replace />
//   );
}

export default PrivateRoute;
