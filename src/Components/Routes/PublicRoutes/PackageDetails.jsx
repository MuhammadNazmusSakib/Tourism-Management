import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BookingForm from './BookingForm';
import Information from './Information';
import TourPlan from './TourPlan';
import Gallery from './Gallery';
import AllTourGuides from './AllTourGuides';
import Location from './Location';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';

const PackageDetails = () => {

    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const [packageDetails, setPackageDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            axiosPublic.get(`allTourPackages/${id}`)
                .then(res => {
                    // console.log('API Response:', res.data);
                    setPackageDetails(res.data);
                    setLoading(false)
                })
                .catch(err => console.error('API Error:', err));
        }
    }, [id, axiosPublic]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        )
    }



    return (
        <div className='pb-20'>
            <section className="max-w-screen-2xl mx-auto relative -mt-[72px]">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop
                    className="h-[500px] md:h-[600px]"
                >
                    {packageDetails.gallery.map((image, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="relative w-full h-full bg-cover bg-center flex items-center justify-center text-white"
                                style={{ backgroundImage: `url(${image.src})` }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                <div className="relative z-10 text-center max-w-3xl px-6">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                        {packageDetails.title}
                                    </h1>
                                    <p className="text-lg md:text-xl mb-6">{packageDetails.description}</p>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <div className='relative -mt-12 z-10 max-w-7xl mx-auto'>
                <Tabs>
                    {/* Tab Headers */}

                    <TabList className="bg-white flex justify-center mb-6  py-4 space-x-6">
                        <div className='flex flex-col w-full sm:justify-center sm:flex-row'>
                            <Tab className="px-4 py-2 cursor-pointer border-b-2 border-transparent focus:outline-none hover:border-blue-500">
                                INFORMATION
                            </Tab>
                            <Tab className="px-4 py-2 cursor-pointer border-b-2 border-transparent focus:outline-none hover:border-blue-500">
                                TOUR PLAN
                            </Tab>
                            <Tab className="px-4 py-2 cursor-pointer border-b-2 border-transparent focus:outline-none hover:border-blue-500">
                                GALLERY
                            </Tab>
                            <Tab className="px-4 py-2 cursor-pointer border-b-2 border-transparent focus:outline-none hover:border-blue-500">
                                MEET TOUR GUIDES
                            </Tab>
                            <Tab className="px-4 py-2 cursor-pointer border-b-2 border-transparent focus:outline-none hover:border-blue-500">
                                LOCATION
                            </Tab>
                        </div>
                    </TabList>

                    <div className='flex flex-col lg:flex-row lg:space-x-6 mt-6'>
                        <div className='w-full lg:w-3/4'>
                            {/* Tab Content */}
                            <TabPanel className={`pt-10`}>
                                {/* Our Packages Content */}

                                <Information packageDetails={packageDetails} />

                            </TabPanel>

                            <TabPanel>
                                {/* Meet Our Tour Guides Content */}

                                <TourPlan packageDetails={packageDetails} />

                            </TabPanel>

                            <TabPanel>
                                {/* Meet Our Tour Guides Content */}

                                <Gallery packageDetails={packageDetails} />

                            </TabPanel>

                            <TabPanel>
                                {/* Meet Our Tour Guides Content */}

                                <AllTourGuides  />

                            </TabPanel>

                            <TabPanel>
                                {/* Meet Our Tour Guides Content */}

                                <Location packageDetails={packageDetails} />

                            </TabPanel>
                        </div>
                        <div className='w-full lg:w-1/4 mt-4'>
                            <BookingForm packageDetails={packageDetails}/>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default PackageDetails