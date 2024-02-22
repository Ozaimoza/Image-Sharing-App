import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { register } from "../modules/fetch";

export const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      //   console.log(formData);
      await register(formData);
      // Reset form after successful creation
      setFormData({
        full_name: "",
        username: "",
        email: "",
        password: "",
      });

      // Close modal or show success message
    } catch (error) {
      console.error("Gagal membuat artikel:", error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen bg-red-700">
        <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
          <header>
            <img className="w-20 mx-auto mb-5" src={Logo} />
          </header>
          <form onSubmit={handleCreate}>
            <div>
              <label className="block mb-2 text-red-500" htmlFor="fullname">
                Full Name
              </label>
              <input
                required
                id="fullname"
                className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300 rounded-md"
                type="text"
                name="fullname"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-red-500" htmlFor="username">
                Username
              </label>
              <input
                required
                id="username"
                className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300 rounded-md"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-red-500" htmlFor="email">
                Email
              </label>
              <input
                required
                id="email"
                className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300 rounded-md"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-red-500" htmlFor="password">
                Password
              </label>
              <input
                required
                id="password"
                className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300 rounded-md"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            {/* <a
              className="text-red-700 hover:text-pink-700 text-sm float-left"
              href="#"
            >
              Forgot Password?
            </a> */}
            <a
              className="text-red-700 hover:text-pink-700 text-sm float-right"
              href="/login"
            >
              have account ? Login here !
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};
