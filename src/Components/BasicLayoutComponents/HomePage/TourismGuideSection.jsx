import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OurPackages from './OurPackages';
import MeetTourGuides from './MeetTourGuides';

const TourismGuideSection = () => {
  const packages = [
    {
      id: 1,
      title: "Beach Paradise",
      description: "Relax and unwind on pristine beaches with crystal-clear water.",
      price: "$299",
    },
    {
      id: 2,
      title: "Mountain Adventure",
      description: "Explore breathtaking mountain trails and stunning vistas.",
      price: "$499",
    },
    {
      id: 3,
      title: "Cultural Immersion",
      description: "Dive deep into the vibrant culture and traditions of the region.",
      price: "$399",
    },
  ];

  const tourGuides = [
    {
      id: 1,
      name: "John Doe",
      expertise: "Adventure Tours",
      description: "Experienced guide with a passion for thrilling outdoor adventures.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      expertise: "Cultural Tours",
      description: "Specialist in local history, traditions, and culinary experiences.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Michael Brown",
      expertise: "Wildlife Tours",
      description: "Nature enthusiast with extensive knowledge of local flora and fauna.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section id="tourism-guide" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Tourism and Travel Guide</h2>
        <Tabs>
          {/* Tab Headers */}
          <TabList className="flex justify-center mb-6 space-x-6">
            <Tab className="px-4 py-2 cursor-pointer border-b-2 border-transparent focus:outline-none hover:border-blue-500">
              Our Packages
            </Tab>
            <Tab className="px-4 py-2 cursor-pointer border-b-2 border-transparent focus:outline-none hover:border-blue-500">
              Meet Our Tour Guides
            </Tab>
          </TabList>

          {/* Tab Content */}
          <TabPanel>
            {/* Our Packages Content */}

            <OurPackages/>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <span className="text-blue-500 font-bold text-lg">{pkg.price}</span>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Book Now
                  </button>
                </div>
              ))}
            </div> */}
          </TabPanel>

          <TabPanel>
            {/* Meet Our Tour Guides Content */}

            <MeetTourGuides/>
            
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tourGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{guide.name}</h3>
                  <p className="text-blue-500 mb-1">{guide.expertise}</p>
                  <p className="text-gray-600">{guide.description}</p>
                </div>
              ))}
            </div> */}
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TourismGuideSection;
