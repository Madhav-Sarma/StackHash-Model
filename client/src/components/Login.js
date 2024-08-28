import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css"; // Ensure this path is correct according to your project structure
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Login = () => {
let navigate=useNavigate();


  const [isLoginActive, setIsLoginActive] = useState(true);

  // useForm hooks for Login and Signup forms
  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm();
  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm();

  const handleSlide = () => {
    setIsLoginActive(!isLoginActive);
  };

  // Handle form submissions
  const onLoginSubmit = (data) => {
    console.log("Login Data: ", data);
    let username=data.username
    let password=data.password
    // Handle login logic here, e.g., call an API using axios
    axios.post('http://localhost:5000/api/users/login',{username,password})
    .then(res=>{console.log(res)
      if (res.data.message === 'Login successful' && res.data.role === 'user'){
      navigate('/')
      }
      else if(res.data.message === 'Login successful' && res.data.role === 'admin'){
        navigate('/admin')
      }
      else{
        console.log('no user found')
      }
    })
    .catch(err=>console.log(err))
  };

  async function onSignupSubmit(data) {
    console.log("Signup Data: ", data);
    // Handle signup logic here, e.g., call an API using axios
    let username=data.username
    let password=data.password
    let email=data.email
    axios.post('http://localhost:5000/api/users/register',{username,email,password})
    .then(result=> {console.log(result)
      if(result.data.message==="User registered successfully"){
      navigate('/login') //while splitting sign up and sign in pages see that both have different url paths and imporve it
      }else{
        console.log(result.error)
      }
    })
    .catch(err=> console.log(err))
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
