import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Navbar from "./Navbar";
import { login, register } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

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

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onRegister = async (data) => {
    const role = "customer";
    try{

        const response = await register(data,role);
        alert(response.message);

    }catch(e){
        console.error("error in register user ",e);
    }
    resetRegister();
    setIsLogin(!isLogin)
  };

  const onLogin = async (data) => {
    try{

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

    }catch(e){
        console.error("error in login user ",e);
    }
    resetLogin();
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin ? (
          <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...registerRegister("name")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {registerErrors.name && (
                <p className="text-red-500 text-sm mt-1">{registerErrors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...registerRegister("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {registerErrors.email && (
                <p className="text-red-500 text-sm mt-1">{registerErrors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...registerRegister("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {registerErrors.password && (
                <p className="text-red-500 text-sm mt-1">{registerErrors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                {...registerRegister("confirmPassword")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {registerErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{registerErrors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...registerLogin("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {loginErrors.email && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...registerLogin("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {loginErrors.password && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
        )}

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
    </>
  );
}