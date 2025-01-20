import React from 'react'
import Banner from './Banner'
import WhyChoose from './WhyChoose'
import Overview from './Overview'
import TourismGuideSection from './TourismGuideSection'
import TouristStorySection from './TouristStorySection'
import TestimonialsAndMemories from './TestimonialsAndMemories'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Overview/>
      <TourismGuideSection/>
      <TouristStorySection/>
      <WhyChoose/>
      <TestimonialsAndMemories/>
    </div>
  )
}

export default Home