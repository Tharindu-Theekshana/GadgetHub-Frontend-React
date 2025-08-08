import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../service/AuthService";
import Navbar from "./Navbar";

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onRegister = async (data) => {
    setIsLoading(true);
    const role = "customer";
    try {
      const response = await register(data, role);
      alert(response.message);
      resetRegister();
      setIsLogin(true); // Switch to login after successful registration
    } catch (e) {
      console.error("error in register user ", e);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data);

      localStorage.setItem("isLoggedIn", response.isLogged);
      localStorage.setItem("name", response.name);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem('userRole', response.role);

      alert(response.message);

      const userRole = response.role;

      if (userRole === 'CUSTOMER') {
        navigate('/customerDashboard');
      } else if (userRole === 'DISTRIBUTOR') {
        navigate('/distributorDashboard');
      }

      resetLogin();
    } catch (e) {
      console.error("error in login user ", e);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleForm = (loginMode) => {
    setIsLogin(loginMode);
    // Reset both forms when switching
    resetRegister();
    resetLogin();
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:bg-white/15">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-300 text-sm">
              {isLogin ? "Sign in to your account" : "Join us today"}
            </p>
          </div>

          {/* Form Toggle */}
          <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1 mb-8">
            <button
              type="button"
              onClick={() => handleToggleForm(true)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleToggleForm(false)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          <div className="transition-all duration-500">
            {!isLogin ? (
              <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      {...registerRegister("name")}
                      placeholder="Full Name"
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                    {registerErrors.name && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{registerErrors.name.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      {...registerRegister("email")}
                      placeholder="Email Address"
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                    {registerErrors.email && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{registerErrors.email.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      {...registerRegister("password")}
                      placeholder="Password"
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                    {registerErrors.password && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{registerErrors.password.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      {...registerRegister("confirmPassword")}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{registerErrors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      {...registerLogin("email")}
                      placeholder="Email Address"
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                    {loginErrors.email && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{loginErrors.email.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      {...registerLogin("password")}
                      placeholder="Password"
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                    {loginErrors.password && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{loginErrors.password.message}</p>
                    )}
                  </div>
                </div>

                

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}