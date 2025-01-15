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
        path: "/package-details",
        element: <PackageDetails/>
      },
      {
        path: "/tour-guide-profile",
        element: <TourGuideProfile/>
      }
    ]
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {}
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
    <ToastContainer />
      <RouterProvider router={router} />
    </DataProvider>
  </StrictMode>,
)
