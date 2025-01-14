import React from 'react'
import Banner from './Banner'
import WhyChoose from './WhyChoose'
import Overview from './Overview'
import TourismGuideSection from './TourismGuideSection'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Overview/>
      <TourismGuideSection/>
      <WhyChoose/>
    </div>
  )
}

export default Home