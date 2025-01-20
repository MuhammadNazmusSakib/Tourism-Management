import React from "react";
import { Link } from "react-router-dom";
import useDynamicTitle from "../../Hooks/useDynamicTitle";


const ErrorPage = () => {
    useDynamicTitle("Error | 404 ")
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white bg-slate-100">
      <div className="text-center">
        {/* Error Message */}
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Options */}
        <div className="mt-6">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>

        {/* Illustration */}
        <div className="mt-8">
          <img
            src="https://i.ibb.co.com/5hDxF8j/404.png"
            alt="Page Not Found"
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
