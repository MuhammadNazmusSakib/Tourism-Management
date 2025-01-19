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
import MyBookings from './Components/Routes/UserRoutes/MyBookings';
import AddStory from './Components/Routes/UserRoutes/AddStory';
import ManageStories from './Components/Routes/UserRoutes/ManageStories';

import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import EditStory from './Components/Routes/UserRoutes/EditStory';
import AssignedTours from './Components/Routes/TourGuideRoutes/AssignedTours';
import Payment from './Components/Routes/UserRoutes/Payment';
import ManageUsers from './Components/Routes/AdminRoutes/ManageUsers';
import ManageCandidates from './Components/Routes/AdminRoutes/ManageCandidates';
import AddPackage from './Components/Routes/AdminRoutes/AddPackage';
import PaymentHistory from './Components/Routes/UserRoutes/PaymentHistory';

const queryClient = new QueryClient()

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
        element: <SignUp />
      },
      {
        path: "/login",
        element: <SignIn />
      },
      {
        path: "/all-stories",
        element: <Community />
      },
      {
        path: "/about",
        element: <AboutUs />
      },
      {
        path: "/all-trips",
        element: <AllTrips />
      },
      {
        path: "/package-details/:id",
        element: <PackageDetails />
      },
      {
        path: "/tour-guide-profile/:id",
        element: <TourGuideProfile />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <UserRoute><DashboardLayout /></UserRoute>,
    children: [
      {
        path: "/dashboard/manage-profile",
        element: <ManageProfile />
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings />
      },
      {
        path: "/dashboard/add-stories",
        element: <AddStory />
      },
      {
        path: "/dashboard/manage-stories",
        element: <ManageStories />
      },
      {
        path: "/dashboard/edit-story/:id",
        element: <EditStory/>
      },
      {
        path: "/dashboard/join-tour-guide",
        element: <JoinTourGuide />
      },
      {
        path: "/dashboard/payment",
        element: <Payment/>
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory/>
      },
      // Tour Guide Route
      {
        path: "/dashboard/my-assigned-tours",
        element: <AssignedTours/>
      },
      // Admin Route
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers/>
      },
      {
        path: "/dashboard/manage-candidates",
        element: <ManageCandidates/>
      },
      {
        path: "/dashboard/add-package",
        element: <AddPackage/>
      }
    ]
  },
]);

{/* <Link to="/dashboard/manage-profile" ><SidebarLink icon={<FaUser />} label="Manage Profile" />
<Link to="/dashboard/my-bookings" ><SidebarLink icon={<FaBook />} label="My Bookings" /></Link>
<Link to="/dashboard/manage-stories" ><SidebarLink icon={<FaRegNewspaper />} label="Manage Stories" /></Link>
<Link to="/dashboard/add-stories" ><SidebarLink icon={<FaPlusCircle />} label="Add Stories" /></Link>
<Link to="/dashboard/join-tour-guide" ><SidebarLink icon={<FaUserTie />} label="J</Link> */}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DataProvider>
  </StrictMode>,
)
