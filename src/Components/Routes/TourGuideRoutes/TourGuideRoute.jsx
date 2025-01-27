import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import useTourGuide from "../../Hooks/useTourGuide";
import { Contex } from "../../ContexApi/Contex";




const TourGuideRoute = ({ children }) => {
    const { user, loading } = useContext(Contex)
    const [isTourGuide, isTourGuideLoading] = useTourGuide() 
    const location = useLocation();

    if (loading || isTourGuideLoading) {
        return (
            <div className="min-h-screen">
                <progress className="progress w-56"></progress>
            </div>
        )
    }

    if (user && isTourGuide) {
        return children;
    }

    return <Navigate to="/" state={{ from: location.pathname }} replace></Navigate>

};

export default TourGuideRoute;