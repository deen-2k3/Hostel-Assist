import React from "react";
import Imgur from "../assets/Imgur.gif";

const Login = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex w-full h-full">
        {/* First div taking 50% width for the Login and SignUp buttons */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-black">
          <img src={Imgur} alt="login" className="w-full h-full" />
        </div>

        {/* Second div taking 50% width for the Login Form */}
        <div className="w-1/2 flex items-center justify-center bg-[#ffebd2]">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  ml-[150px] mb-4">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                {/* Remember me */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Remember me
                  </label>
                </div>

                {/* Forgot Password */}
                <div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline text-white"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
