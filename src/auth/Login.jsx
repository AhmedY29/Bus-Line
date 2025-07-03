import axios from "axios";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!loginData.email.trim()) {
      alert("Please Enter Your Email");
      return;
    }
    if (!loginData.password.trim()) {
      alert("Please Enter Your Email");
      return;
    }

    try {
      setIsLoading(true);
      const user = await axios.post(
        `https://bus-line-backend.onrender.com/api/auth/signin`,
        loginData
      );
      if (user.data.error) {
        alert(user.data.error.message);
        return;
      }
      console.log(user);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", JSON.stringify(user?.data?.user));

      const role = user?.data?.user.role;
      if (role == "admin") {
        navigate("/admin");
      } else if (role == "student") {
        navigate("/student");
      } else {
        navigate("/driver");
      }
    } catch (error) {
      console.log("ERROR IN SIGN IN:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="h-[10vh] bg-white flex justify-start items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3 mr-2">
            <img src="./public/logo.png" alt="Logo" className="h-10 w-10 " />
            <h1 className="text-xl font-bold">BusLine</h1>
            <h1 className="text-xl font-bold">Bus Line</h1>
          </div>
        </Link>
      </nav>
      <div className="bg-white flex justify-center items-center w-full h-[90vh]">
        <div className="lg:flex  justify-center items-center hidden w-1/2 h-full">
          <div className="flex flex-col gap-10  h-full justify-center ">
            <h1 className="text-6xl font-bold text-neutral-900">
              Login to <span className="  text-[#0165AD]">BusLine</span>
            </h1>

            <p className="text-neutral-700 text-lg">
              If you don’t have an account <br />
              You can{" "}
              <Link to="/register" className="text-blue-500">
                Register here !
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  w-full md:w-1/2 bg-white h-full">
          <div className="flex flex-col gap-6  w-72 md:w-80 lg:w-96">
            <h1 className="text-2xl font-bold">Login</h1>
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-blue-50 p-4 rounded-md h-12 placeholder:text-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-50  text-blue-500"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-blue-50 p-4 rounded-md h-12 placeholder:text-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-50 w-full pr-12 text-blue-500"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                {showPassword ? (
                  <HiEyeOff className="text-xl cursor-pointer" />
                ) : (
                  <HiEye className="text-xl cursor-pointer" />
                )}
              </button>
            </div>
            <div className="flex w-full justify-end">
              <p className="text-neutral-400 text-sm  cursor-pointer">
                forgot password?
              </p>
            </div>
            <button
              disabled={isLoading}
              onClick={handleLogin}
              className="flex justify-center items-center bg-blue-500 text-white rounded-md p-4 h-12 w-full cursor-pointer hover:bg-blue-600 transition-colors duration-200 shadow-lg shadow-blue-200"
            >
              {isLoading ? "Logged in ..." : "Login"}
            </button>
            <div className="flex w-full justify-center items-center py-4">
              <p className="text-neutral-400 text-sm">Or continue with</p>
            </div>
            <div className="flex justify-center items-center gap-6">
              <img
                src="facebook.png"
                alt="Facebook"
                className="h-8 w-8 cursor-pointer"
              />
              <img
                src="apple.png"
                alt="Apple"
                className="h-8 w-8 cursor-pointer"
              />
              <img
                src="google.png"
                alt="Google"
                className="h-8 w-8 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
