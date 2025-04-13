import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo  from '../assets/logo.png';

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <div className="welcome-box">
        {/* Logo Section - updated to match login page */}
        <img src={logo} alt="Logo" className="logo" />

        <h1>Welcome to Live Collab</h1>
        <p className="quote">"Connect, Create, Collaborate"</p>
        <div className="buttons">
          <Link to="/login" className="btn" onClick={() => navigate('/Login')}>Login</Link>
          <Link to="/signup" className="btn" onClick={() => navigate('/Signup')}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;

