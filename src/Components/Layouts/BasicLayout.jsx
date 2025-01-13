import React from 'react'
import Navbar from '../BasicLayoutComponents/Common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../BasicLayoutComponents/Common/Footer'

const BasicLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default BasicLayout