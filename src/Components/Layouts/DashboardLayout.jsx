import React from 'react'
import Sidebar from '../DashboardLayoutComponents/CommonLayout/Slidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='max-w-screen-2xl mx-auto'>
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-8">
        <Outlet/>
      </div>
    </div>
    </div>
  )
}

export default DashboardLayout