import React from 'react';


import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div
                className="card shadow border-0 rounded-4 p-4 w-100"
                style={{ maxWidth: '500px', backgroundColor: '#023047', color: 'white' }}
            >
                {/* Top Illustration */}
                <div className="text-center mb-4">
                    <img
                        src="https://i.ibb.co/KjTVLSrr/Login-rafiki-1.png"
                        alt="Login Illustration"
                        className="img-fluid"
                        style={{ maxHeight: '200px' }}
                    />
                </div>

                {/* Username Input */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white fw-semibold">
                        Username:
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control border-primary-subtle"
                            placeholder="Enter your Username"
                            id="username"
                        />
                        <span className="input-group-text bg-white">
                            <i className="bi bi-person-fill" style={{ color: '#023047' }}></i>
                        </span>
                    </div>
                </div>

                {/* Password Input */}
                <div className="mb-2">
                    <label htmlFor="password" className="form-label text-white fw-semibold">
                        Password:
                    </label>
                    <div className="input-group">
                        <input
                            type="password"
                            className="form-control border-primary-subtle"
                            placeholder="***************"
                            id="password"
                        />
                        <span className="input-group-text bg-white">
                            <i className="bi bi-arrow-right-circle-fill" style={{ color: '#023047' }}></i>
                        </span>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="text-end mb-3">
                    <a href="#" className="text-decoration-none text-white small">
                        Forgot Password?
                    </a>
                </div>

                {/* Divider */}
                <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1 text-white" />
                    <span className="mx-2 text-white small">or</span>
                    <hr className="flex-grow-1 text-white" />
                </div>

                {/* Social Login Icons */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                    {['google', 'facebook-f', 'instagram'].map((platform) => (
                        <button
                            key={platform}
                            className="btn rounded-circle"
                            style={{
                                backgroundColor: 'white',
                                color: '#FFB803',
                                width: '45px',
                                height: '45px',
                            }}
                        >
                            <i className={`fab fa-${platform}`}></i>
                        </button>
                    ))}
                </div>

                {/* Login Button */}
                <div className="d-grid mb-3">

                    <Link to="/dashboard" className="text-decoration-none">
                        <button
                            type="button"
                            className="btn rounded-pill py-2 fs-5 fw-bold shadow-sm w-100"
                            style={{
                                backgroundColor: 'white',
                                color: '#023047',
                                transition: 'all 0.3s ease',
                                border: '2px solid #023047',
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#FFB803';
                                e.target.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = '#023047';
                            }}
                        >
                            Login
                        </button>
                    </Link>

                </div>

                {/* Sign Up Prompt */}
                <div className="text-center">
                    <span className="text-white">Don’t have an account?</span>{' '}
                    <a href="/signup" className="text-decoration-none fw-semibold" style={{ color: '#FFB803' }}>
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
