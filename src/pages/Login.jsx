// src/pages/Login.jsx

import { Mail, LockKeyhole } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid lg:grid-cols-2">
        
        {/* Left Side */}
        <div className="bg-red-600 text-white p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>

          <p className="mt-6 text-lg text-red-100">
            Login to continue saving lives through blood donation.
          </p>

          <img
            src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-7988.jpg"
            alt=""
            className="mt-10 rounded-2xl"
          />
        </div>

        {/* Right Side */}
        <div className="p-10 lg:p-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Login
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your details to continue
          </p>

          <form className="space-y-6">
            
            <div>
              <label className="font-medium text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <Mail className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full p-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <LockKeyhole className="text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full p-4 outline-none"
                />
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;