import React from 'react'
import Banner from './Banner'
import WhyChoose from './WhyChoose'
import Overview from './Overview'
import TourismGuideSection from './TourismGuideSection'
import TouristStorySection from './TouristStorySection'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Overview/>
      <TourismGuideSection/>
      <TouristStorySection/>
      <WhyChoose/>
    </div>
  )
}

export default Home