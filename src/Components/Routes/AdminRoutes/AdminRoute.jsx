import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Contex } from "../../ContexApi/Contex";
import useAdmin from "../../Hooks/useAdmin";



const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(Contex)
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location.pathname }} replace></Navigate>

};

export default AdminRoute;