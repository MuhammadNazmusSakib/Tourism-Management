import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Contex } from "../../ContexApi/Contex";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(Contex)
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location.pathname }} replace></Navigate>
};

export default PrivateRoute;