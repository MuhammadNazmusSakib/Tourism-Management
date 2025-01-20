import React from 'react'
import Sidebar from '../DashboardLayoutComponents/CommonLayout/Slidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../BasicLayoutComponents/Common/Footer'

const DashboardLayout = () => {
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className="flex flex-col h-full md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 px-3 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardLayout