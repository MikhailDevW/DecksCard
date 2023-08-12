<<<<<<< HEAD
import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children  }) => {
  return loggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
=======
import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children  }) => {
  return loggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
>>>>>>> 6e74c0a3aec6ba4adcc65121d292aafa40b04daf
