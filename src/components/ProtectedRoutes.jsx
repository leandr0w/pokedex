import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

    const trainer = useSelector(state => state.trainer)

    if(trainer){
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }

   
}  

export default ProtectedRoute