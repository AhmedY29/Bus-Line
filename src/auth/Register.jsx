import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async () => {
    if (!formData.email.trim()) {
      toast.error("Please Enter Your Email");
      return;
    }
    const emailRgex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const correctEmail = emailRgex.test(formData.email);
    if (!correctEmail) {
      toast.error("Please Enter Valid Email EX: example@example.com");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Please Enter Your Username");
      return;
    }
    if (!formData.role.trim()) {
      toast.error("Please Enter Your Role");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Please Enter Your Password");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!confirmPassword.trim()) {
      toast.error("Please Enter Your Confirm Password");
      return;
    }
    if (confirmPassword.trim() != formData.password) {
      toast.error("Password Doesn't Match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    console.log(formData);
    try {
      setIsLoading(true);
      const user = await axios.post(
        `https://bus-line-backend.onrender.com/api/auth/signup`,
        formData
      );
      if (user.data.error) {
        toast.error(user.data.error.message);
        return;
      }
      localStorage.setItem("user", JSON.stringify(user?.data?.user));
      localStorage.setItem("token", user.data.token);

      const role = user?.data?.user.role;
      if (role == "admin") {
        navigate("/admin");
      } else if (role == "student" || role == "parent") {
        navigate("/student");
      } else {
        navigate("/driver");
      }
    } catch (error) {
      toast.error(error.response.data.error.message);
      console.log("ERROR IN SIGN IN:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "bg-white",
            color: "text-neutral-900",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 2000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <nav className="h-[10vh] bg-white flex justify-start items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3 mr-2">
            <img src="/logoPng.png" alt="Logo" className="h-10 w-10 " />
            <h1 className="text-xl font-bold">BusLine</h1>
          </div>
        </Link>
      </nav>
      <div className="bg-white flex justify-center items-center w-full h-[90vh]">
        <div className="lg:flex  justify-center items-center hidden w-1/2 h-full">
          <div className="flex flex-col gap-10  h-full justify-center ">
            <video className="w-35" src="/bus.webm" autoPlay loop muted></video>
            <h1 className="text-6xl font-bold text-neutral-900">
              Register to <span className="  text-[#0165AD]">BusLine</span>
            </h1>
            <p className="text-neutral-700 text-lg">
              If you already have an account <br />
              You can{" "}
              <Link to="/login" className="text-blue-500">
                Login here !
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  w-full md:w-1/2 bg-white h-full">
          <div className="flex flex-col gap-6  w-72 md:w-80 lg:w-96">
            <h1 className="text-2xl font-bold">Register</h1>
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-blue-50 p-4 rounded-md h-12 placeholder:text-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-50  text-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter Username"
              className="bg-blue-50 p-4 rounded-md h-12 placeholder:text-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-50  text-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <select
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="bg-blue-50 px-4 py-1 rounded-md h-12 placeholder:text-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-50  text-blue-500"
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-blue-50 p-4 rounded-md h-12 placeholder:text-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-50 w-full pr-12 text-blue-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                {showPassword ? (
                  <HiEyeOff className="text-xl" />
                ) : (
                  <HiEye className="text-xl" />
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="bg-blue-50 p-4 rounded-md h-12 placeholder:text-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-50 w-full pr-12 text-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                {showConfirmPassword ? (
                  <HiEyeOff className="text-xl cursor-pointer" />
                ) : (
                  <HiEye className="text-xl cursor-pointer" />
                )}
              </button>
            </div>

            <button
              disabled={isLoading}
              onClick={handleRegister}
              className="flex justify-center items-center bg-blue-500 text-white rounded-md p-4 h-12 w-full cursor-pointer hover:bg-blue-600 transition-colors duration-200 shadow-lg shadow-blue-200"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
            <div className="flex w-full flex-col gap-2 justify-center items-center py-4">
              <p className="lg:hidden text-neutral-400 text-center">
                If you already have an account <br />
                You can{" "}
                <Link to="/login" className="text-blue-500">
                  Login here !
                </Link>
              </p>
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

export default Register;
