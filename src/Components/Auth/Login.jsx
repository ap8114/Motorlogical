import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS
import api from "../../../utils/axiosInterceptor";
import axios from "axios";
import BASE_URL from "../../../utils/Config";
import Swal from "sweetalert2";
const Login = () => {
  const [login, setLogin] = useState()

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);
      console.log("response", response);

      const { token, user } = response.data;


      if (user?.role && token) {
        setLogin(user.role);
        localStorage.setItem("login", user.role);
        localStorage.setItem("role", user.role);
        localStorage.setItem("authToken", token);
        localStorage.setItem("login_detail", JSON.stringify(user));


        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        setTimeout(() => {
          const role = user.role.toLowerCase();
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "manager") {
            navigate("/manager/dashboard");
          } else if (role === "salesperson") {
            navigate("/salesperson/salespersondashboard");
          }
          else if (role === "finance") {
            navigate("/finance/financedashboard");
          }
        }, 300);

      } else {
        toast.error("Invalid credentials! Please check your email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials! Please try again.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  const autoLogin = (email, password) => {
    setFormData({ email, password }); // Only set the fields, no login
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#023047" }}>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 md:py-16 bg-[#023047]">
        <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          <ToastContainer position="top-right" autoClose={2000} />

          {/* Left Panel - Login Form */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center mb-8">
                <img
                  src="https://i.postimg.cc/T37mZZ0p/89b720af-5154-4d70-bb52-6882c2d51803.png"
                  alt="Motorlogical Logo"
                  className="max-h-12"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>



              <div className="">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  placeholder="Your Password"
                  name="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
                  value={formData.password}
                  onChange={handleChange}
                />

                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 rounded mr-2"
                    checked={keepLoggedIn}
                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                  />
                  Keep me logged in
                </label>

                <button
                  onClick={handleLogin}
                  className="w-full text-white py-3 rounded-lg flex items-center justify-center text-base"
                  style={{ backgroundColor: "#023047" }}
                >
                  <span>Log in</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
                <div className="row mt-3 p-1">
                  <div className="col-sm-4">
                    <button
                      className="text-white rounded-lg text-base p-2 w-full"
                      style={{ backgroundColor: "#023047" }}
                      onClick={() => autoLogin("admin@gmail.com", "admin@123")}
                    >
                      Admin
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button
                      className="text-white rounded-lg text-base p-2 w-full"
                      style={{ backgroundColor: "#023047" }}
                      onClick={() => autoLogin("manager@gmail.com", "manager@123")}
                    >
                      Manager
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button
                      className="text-white rounded-lg text-base p-2 w-full"
                      style={{ backgroundColor: "#023047" }}
                      onClick={() => autoLogin("salesperson@gmail.com", "salesperson@123")}
                    >
                      Salesperson
                    </button>
                  </div>
                </div>


              </div>
            </div>
          </div>

          {/* Right Panel - Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-blue-100 p-6 md:p-10 relative items-center justify-center">
            <img
              src="https://file.aiquickdraw.com/imgcompressed/img/compressed_a0698d76179ca0e6b38e1dfc7f1a458c.webp"
              alt="Digital Connection"
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-200 rounded-full -mr-10 -mb-10 opacity-70"></div>
            <div className="absolute top-1/4 left-0 w-12 h-12 bg-blue-200 rounded-full -ml-6 opacity-70"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
