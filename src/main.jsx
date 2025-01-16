import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BasicLayout from './Components/Layouts/BasicLayout';
import DashboardLayout from './Components/Layouts/DashboardLayout';
import Home from './Components/BasicLayoutComponents/HomePage/Home';
import DataProvider from './Components/ContexApi/DataProvider';
import { ToastContainer } from 'react-toastify';
import SignUp from './Components/SignIn&SignUp/SignUp';
import SignIn from './Components/SignIn&SignUp/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import PackageDetails from './Components/Routes/PublicRoutes/PackageDetails';
import Community from './Components/Routes/PublicRoutes/Community';
import AllTrips from './Components/Routes/PublicRoutes/AllTrips';
import AboutUs from './Components/Routes/PublicRoutes/AboutUs';
import TourGuideProfile from './Components/Routes/PublicRoutes/TourGuideProfile';
import UserRoute from './Components/Routes/UserRoutes/UserRoute';
import ManageProfile from './Components/Routes/UserRoutes/ManageProfile';
import JoinTourGuide from './Components/Routes/UserRoutes/JoinTourGuide';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: <SignUp/>
      },
      {
        path: "/login",
        element: <SignIn/>
      },
      {
        path: "/all-stories",
        element: <Community/>
      },
      {
        path: "/about",
        element: <AboutUs/>
      },
      {
        path: "/all-trips",
        element: <AllTrips/>
      },
      {
        path: "/package-details/:id",
        element: <PackageDetails/>
      },
      {
        path: "/tour-guide-profile",
        element: <TourGuideProfile/>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <UserRoute><DashboardLayout /></UserRoute>,
    children: [
      {
        path: "/dashboard/manage-profile",
        element: <ManageProfile/>
      },
      {
        path: "/dashboard/join-tour-guide",
        element: <JoinTourGuide/>
      }
    ]
  },
]);

{/* <Link to="/dashboard/manage-profile" ><SidebarLink icon={<FaUser />} label="Manage Profile" />
<Link to="/dashboard/my-bookings" ><SidebarLink icon={<FaBook />} label="My Bookings" /></Link>
<Link to="/dashboard/manage-stories" ><SidebarLink icon={<FaRegNewspaper />} label="Manage Stories" /></Link>
<Link to="/dashboard/add-stories" ><SidebarLink icon={<FaPlusCircle />} label="Add Stories" /></Link>
<Link to="/dashboard/join-tour-guide" ><SidebarLink icon={<FaUserTie />} label="Join as Tour Guide" /></Link> */}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
    <ToastContainer />
      <RouterProvider router={router} />
    </DataProvider>
  </StrictMode>,
)
