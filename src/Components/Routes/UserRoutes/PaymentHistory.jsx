import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Contex } from "../../ContexApi/Contex";



const PaymentHistory = () => {
  const { user } = useContext(Contex); // Get user from Context API
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const response = await axiosSecure.get(`/paymentsHistory/${user?.email}`);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [axiosSecure, user?.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center h-screen flex items-center justify-center">
        <p className="text-gray-600">No payment history available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment History</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Package Name</th>
                <th className="px-4 py-2 border">Price (BDT)</th>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Date</th>
                {/* <th className="px-4 py-2 border">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{payment.packageName}</td>
                  <td className="px-4 py-2 border">{payment.price}</td>
                  <td className="px-4 py-2 border">{payment.transactionId}</td>
                  <td className="px-4 py-2 border">
                    {new Date(payment.date).toLocaleString()}
                  </td>
                  {/* <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded ${
                        payment.status === "In Review"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
