import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Imgur from "../assets/Imgur.gif";
import { apiConnector } from "../services/apiConnector";
import { loginUrl } from "../services/apis";
import Cookies from "js-cookie"; // Import Cookies to manage cookies

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiConnector("POST", loginUrl, data);
      console.log(res);
      // Add this line to debug

      if (res) {
        const userId = Cookies.get("userId");
        console.log(userId);
        if (data.role === "warden") {
          navigate("/warden-dashboard"); // Change to your actual warden dashboard path
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ml-[150px] mb-4">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
                  value={data.email}
                  onChange={onChangeHandler}
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
                  value={data.password}
                  onChange={onChangeHandler}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <Link to="/forgot" className="text-sm text-white hover:underline">
                Forgot Password?
              </Link>
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
                  value={data.role}
                  onChange={onChangeHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="student">student</option>
                  <option value="warden">warden</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
