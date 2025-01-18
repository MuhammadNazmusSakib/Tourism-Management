import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { Contex } from '../ContexApi/Contex';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { setUser, createNewUser, updateUserProfile, googleSignIn, theme } = useContext(Contex)
  const [error, setError] = useState({})
  const [seePassword, setSeePassword] = useState(false)
  const axiosPublic = useAxiosPublic()

  // see Password
  const handleSeePassword = () => setSeePassword((prev) => (!prev))

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target)
    const name = form.get("name")
    const email = form.get("email")
    const photo = form.get("photo")
    const password = form.get("password")
    if (password.length < 6) {
      setError({ ...error, name: 'Password must be at least 6 characters long.' })
      return
    }
    if (!/[A-Z]/.test(password)) {
      setError({ ...error, name: 'Password must have at least one uppercase letter.' })
      return
    }
    if (!/[a-z]/.test(password)) {
      setError({ ...error, name: 'Password must have at least one lowercase letter.' })
      return
    }


    createNewUser(email, password)
      .then(result => {
        const user = result.user
        setUser(user)

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            const userInfo = {
              displayName: name,
              photoURL: photo,
              email: user.email,
              role: 'Tourist',
              bio: '',
              phone: '',
              language: '',
              specialization: '',
              experience: ''
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('user added.')
                }
              })
            const redirectPath = location.state?.from || "/"
            navigate(redirectPath)
          }).catch(() => {
            toast("Failed!!")
          })
      })
      .catch(() => {
        toast("Registar Failed ! Please try again.", {
          position: "top-center",
          autoClose: 2000, // Close after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  //  Handle Google Login 
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user
        setUser(user)
        const userInfo = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          role: 'Tourist',
          bio: '',
          phone: '',
          language: '',
          specialization: '',
          experience: ''
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              console.log('google signin user added.')
            }
          })

        const redirectPath = location.state?.from || "/"
        navigate(redirectPath)
      })
      .catch(() => {
        toast('Google login Failed. Please try again.');
      })
  };

  return (
    <div className={`${theme === 'dark' ? '' : 'bg-purple-100'} flex items-center justify-center min-h-screen`}>
      <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="bg-gray-200 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="bg-gray-200 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Photo URL Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoURL">
              Photo URL
            </label>
            <input
              id="photoURL"
              name="photo"
              type="url"
              placeholder="Enter a photo URL"
              className="bg-gray-200 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={!seePassword ? "password" : "text"}
              placeholder="Enter your password"
              className="bg-gray-200 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <buttton onClick={handleSeePassword} className="absolute mt-2 -ml-10 text-2xl">
              {
                !seePassword ? <IoEyeOffSharp /> : <IoEyeSharp />
              }
            </buttton>

            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-tr from-blue-600 to-purple-500 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center mt-6">
          <button
            className="flex items-center justify-center w-full bg-gradient-to-tr from-blue-600 to-purple-500 text-white py-2 px-4 rounded-md transition duration-200"
            onClick={handleGoogleLogin}
          >
            Sign up with Google
          </button>
        </div>

        {/* Redirect to Login */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            className="text-purple-600 hover:underline"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
