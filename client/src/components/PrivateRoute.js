import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ isLoggedIn,children}) {

    if (isLoggedIn) {
        return children;   //Children is a react feature to call children route
    }
    else {
        return <Navigate to="/login"></Navigate>;
    }

}
