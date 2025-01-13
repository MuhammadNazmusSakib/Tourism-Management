import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import { Contex } from '../../ContexApi/Contex';

const ForgotPassword = () => {

    const { resetPassword } = useContext(Contex)

    const location = useLocation();
    // const navigate = useNavigate();

    const [email, setEmail] = useState(location.state?.email || ''); // Pre-fill email from location.state

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        resetPassword(email)
            .then(() => {
                toast.success('Password reset email sent! Check your inbox.');
                window.location.href = "https://mail.google.com"    // Redirect to Gmail
            })
            .catch((error) => {
                toast.error('Failed to send reset email. Please try again.');
                toast("Password reset Failed. Please, try again.")
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password?</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
