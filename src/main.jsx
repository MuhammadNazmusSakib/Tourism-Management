import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BasicLayout from './Components/Layouts/BasicLayout';
import DashboardLayout from './Components/Layouts/DashboardLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout/>,
    children: [
      {}
    ]
  },
  {
    path: "/",
    element: <DashboardLayout/>,
    children: [
      {}
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
