import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { loginUser, loginFail } from './redux/actions/userActions'; // Import actions

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch(); 

  const [isLoginActive, setIsLoginActive] = useState(true);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState(''); // New state for signup success message

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm();
  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm();

  const handleSlide = () => {
    setIsLoginActive(!isLoginActive);
  };

  const onLoginSubmit = async (data) => {
    console.log("Login Data: ", data);
    const { username, password } = data;

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
      console.log(res);

      if (res.data.message === 'Login successful') {
        // Dispatch login action to update Redux state
        dispatch(loginUser(res.data.user)); // Ensure res.data.user contains the correct user data

        // Navigate based on user role
        if (res.data.role === 'user') {
          navigate('/');  // Navigate to user home
        } else if (res.data.role === 'admin') {
          navigate('/admin');  // Navigate to admin home
        }
      } else {
        console.log('No user found or login failed');
        dispatch(loginFail('No user found or login failed')); // Dispatch login fail if the response indicates failure
      }
    } catch (err) {
      console.error('Login Error: ', err.response?.data?.error || err.message);
      dispatch(loginFail(err.response?.data?.error || err.message)); // Dispatch login fail with error message
      alert(err.response?.data?.error || 'An error occurred during login.');
    }
  };

  const onSignupSubmit = async (data) => {
    console.log("Signup Data: ", data);
    const { username, email, password } = data;

    try {
      const result = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      console.log(result);

      if (result.data.message === "User registered successfully") {
        setSignupSuccessMessage("Account created successfully!"); // Display success message
      } else {
        console.error('Signup Error: ', result.data.error);
        alert(result.data.error || 'An error occurred during registration.');
      }
    } catch (err) {
      console.error('Signup Error: ', err.response?.data?.error || err.message);
      alert(err.response?.data?.error || 'An error occurred during registration.');
    }
  };
  
  return (
    
    <div className="wrapper">
      <div className="title-text">
        <div>
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
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="login">
            <h2 className="text-center pb-2">Login Form</h2>
            <div className="field">
              <input
                type="text"
                placeholder="Username"
                {...registerLogin("username", { required: "Username is required" })}
              />
              {loginErrors.username && <p className="error">{loginErrors.username.message}</p>}
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                {...registerLogin("password", { required: "Password is required" })}
              />
              {loginErrors.password && <p className="error">{loginErrors.password.message}</p>}
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
          <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="signup">
            <h2 className="text-center pb-2">Registration Form</h2>
            <div className="field">
              <input
                type="text"
                placeholder="Username"
                {...registerSignup("username", { required: "Username is required" })}
              />
              {signupErrors.username && <p className="error">{signupErrors.username.message}</p>}
            </div>
            <div className="field">
              <input
                type="email"
                placeholder="Email Address"
                {...registerSignup("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" } })}
              />
              {signupErrors.email && <p className="error">{signupErrors.email.message}</p>}
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                {...registerSignup("password", { required: "Password is required" })}
              />
              {signupErrors.password && <p className="error">{signupErrors.password.message}</p>}
            </div>
            <div className="field">
              <input type="submit" value="Signup" />
            </div>
            {signupSuccessMessage && <p className="success">{signupSuccessMessage}</p>} {/* Display success message */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
