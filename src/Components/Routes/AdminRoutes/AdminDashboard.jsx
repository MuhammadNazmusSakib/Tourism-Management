import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalPayment: 0,
    totalTourGuides: 0,
    totalPackages: 0,
    totalClients: 0,
    totalStories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const [paymentRes, guidesRes, packagesRes, clientsRes, storiesRes] =
          await Promise.all([
            axiosSecure.get("/admin/totalPayment"),
            axiosSecure.get("/users/tourist-guides"),
            axiosSecure.get("/allTourPackages"),
            axiosSecure.get("/users/tourist"),
            axiosSecure.get("/stories"),
          ]);

        setStats({
          totalPayment: paymentRes.data.totalPayment || 0,
          totalTourGuides: guidesRes.data.length || 0,
          totalPackages: packagesRes.data.length || 0,
          totalClients: clientsRes.data.length || 0,
          totalStories: storiesRes.data.length || 0,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Payment */}
          <div className="bg-white text-center shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-700">Total Payment</h2>
            <p className="text-2xl text-blue-600 mt-4">
              ${stats.totalPayment.toLocaleString()}
            </p>
          </div>
          {/* Total Tour Guides */}
          <div className="bg-white text-center shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-700">Total Tour Guides</h2>
            <p className="text-2xl text-green-600 mt-4">{stats.totalTourGuides}</p>
          </div>
          {/* Total Packages */}
          <div className="bg-white text-center shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-700">Total Packages</h2>
            <p className="text-2xl text-purple-600 mt-4">{stats.totalPackages}</p>
          </div>
          {/* Total Clients */}
          <div className="bg-white text-center shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-700">Total Clients</h2>
            <p className="text-2xl text-pink-600 mt-4">{stats.totalClients}</p>
          </div>
          {/* Total Stories */}
          <div className="bg-white text-center shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-700">Total Stories</h2>
            <p className="text-2xl text-yellow-600 mt-4">{stats.totalStories}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
