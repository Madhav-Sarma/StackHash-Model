import React, { useState } from "react";
import "./Login.css"; // Ensure this path is correct according to your project structure

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleSlide = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLoginActive ? "login" : "signup"}`}>
          {isLoginActive ? "Login Form" : "Signup Form"}
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLoginActive}
            onChange={handleSlide}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLoginActive}
            onChange={handleSlide}
          />
          <label
            htmlFor="login"
            className="slide login"
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </label>
          <label
            htmlFor="signup"
            className="slide signup"
            onClick={() => setIsLoginActive(false)}
          >
            Signup
          </label>
          <div className="slide-tab"></div>
        </div>
        <div className="form-inner" style={{ marginLeft: isLoginActive ? "0%" : "-100%" }}>
          {/* Login Form */}
          <form action="#" className="login">
            <h2 className="text-center pb-2">Login Form</h2>
            <div className="field">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="pass-link">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="field">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginActive(false); }}>Signup Now</a>
            </div>
          </form>

          {/* Signup Form */}
          <form action="#" className="signup">
          <h2 className="text-center pb-2">Registration Form</h2>
            <div className="field">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="field">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
