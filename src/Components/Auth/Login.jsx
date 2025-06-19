import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Static credentials
        const users = [
            { email: "admin@example.com", password: "123", role: "Admin" },
            { email: "manager@example.com", password: "123", role: "Manager" },
            { email: "salesperson@example.com", password: "123", role: "Salesperson" }
        ];

        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            // Store role in localStorage
            localStorage.setItem("role", user.role);
            toast.success("Login Successfully!"); // This will show the success toast
            // Redirect based on role
            if (user.role === "Admin") {
                navigate("/dashboard");
            } else if (user.role === "Manager") {
                navigate("/manager-dashboard");
            } else if (user.role === "Salesperson") {
                navigate("/salesperson-dashboard");
            }
        } else {
            toast.error("Invalid email or password"); // This will show the error toast
        }
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h1>

        <div className="border-b border-gray-300 mb-6"></div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Your Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
