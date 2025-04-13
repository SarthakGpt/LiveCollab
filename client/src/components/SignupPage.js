import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import "react-toastify/dist/ReactToastify.css";
import logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';



function SignupPage() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const url = `http://localhost:5000/api/auth/signup`; // Adjust if you add /api
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || "Something went wrong");
      } else {
        handleError(message || "Signup failed");
      }

    } catch (err) {
      handleError(err.message || "Server error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Create an Account</h2>

        <form onSubmit={handleSignup}>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={signupInfo.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={signupInfo.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SignupPage;
