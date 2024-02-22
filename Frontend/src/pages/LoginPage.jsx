import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { login } from "../modules/fetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await login(credentials);

      const { token, currentUser, userId } = response;
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("currentUser", currentUser, { expires: 1 });
      Cookies.set("userId", userId, { expires: 1 });

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin();
  };

  return (
    <>
      <div className="flex h-screen bg-red-600">
        <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
          <header>
            <img className="w-20 mx-auto mb-5" src={Logo} />
          </header>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-red-500" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300 rounded-md"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-red-500" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300 rounded-md"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className="w-full bg-red-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                type="submit"
              />
            </div>
          </form>
          <footer>
            <a
              className="text-indigo-700 hover:text-pink-700 text-sm float-right"
              href="/register"
            >
              Create Account
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};
