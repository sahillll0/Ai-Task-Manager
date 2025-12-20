import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

import axios from 'axios';

const RegisterPage = () => {

  const navigate = useNavigate()
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handelChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, fromData)
        .then((res) => {
          if (res.status === 200) {

            showNotification("Register Successful!", "success")
            navigate("/login")
            localStorage.setItem("token", res.data.token)
          }
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";

          showNotification(errorMessage, 'error')

        })

    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";

      showNotification(errorMessage, 'error')

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-300">Join AI Task Manager today</p>
        </div>

        <form onSubmit={handelSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="Full Name"
              name="name"
              value={fromData.name}
              onChange={handelChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="Email Address"
              name="email"
              value={fromData.email}
              onChange={handelChange}

            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="Password"
              name="password"
              value={fromData.password}
              onChange={handelChange}


            />
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 px-4 rounded-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-pink-300 font-medium transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;