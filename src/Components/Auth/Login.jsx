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
                navigate("/manager/dashboard");
            } else if (user.role === "Salesperson") {
                navigate("/salesperson-dashboard");
            }
        } else {
            toast.error("Invalid email or password"); // This will show the error toast
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#023047" }}>
            <div className="bg-white rounded-3xl w-full max-w-6xl overflow-hidden shadow-xl flex mainlogin">
                <ToastContainer position="top-right" autoClose={2000} />
                {/* Left Panel - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                    <div className="mb-8">
                        <div className="flex items-center mb-12">
                            <img
                                src="https://i.postimg.cc/T37mZZ0p/89b720af-5154-4d70-bb52-6882c2d51803.png"
                                alt="Motorlogical Logo"
                                className="img-fluid sidebar-logo"
                                style={{ maxHeight: '60px' }}
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back</h1>

                        <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 fs-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    className="w-full px-4 fs-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between items-center mb-5">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                                        checked={keepLoggedIn}
                                        onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Keep me logged in</span>
                                </label>
                            </div>
                            <button
                                onClick={handleLogin}
                                className="w-full text-white py-3 rounded-lg flex items-center justify-center cursor-pointer whitespace-nowrap !rounded-button fs-5"
                                style={{ backgroundColor: "#023047", border: "0" }}
                            >
                                <span>Log in</span>
                                <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Right Panel - Illustration */}
                <div className="hidden md:block md:w-1/2 bg-blue-100 p-8 md:p-12 relative">
                    <div className="flex justify-center items-center h-3/4 mt-5">
                        <img
                            src="https://file.aiquickdraw.com/imgcompressed/img/compressed_a0698d76179ca0e6b38e1dfc7f1a458c.webp"
                            alt="Digital Connection"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mb-16 opacity-70"></div>
                    <div className="absolute top-1/4 left-0 w-16 h-16 bg-blue-200 rounded-full -ml-8 opacity-70"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
