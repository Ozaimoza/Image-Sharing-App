import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";
import { logout } from "../modules/fetch";
import { useAppContext } from "./AppContext";
import Profile from "../assets/profile.jpg";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [description, setDescription] = useState("");
  const { profile } = useAppContext();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  //   console.log(profile);

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove("token");
      Cookies.remove("currentUser");
      Cookies.remove("userId");

      navigate("/");
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  const handleClick = async (e) => {
    try {
      if (description === "") {
        navigate("/");
      } else {
        navigate(`/search/${description}`);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  return (
    <>
      <div className="z-40 sticky top-0 navbar bg-base-100 flex justify-center ">
        <div className="flex items-center justify-between w-[75%] bg-red-600 py-3 mx-auto rounded-3xl px-4 shadow-md">
          <div className="flex shrink-0">
            <a
              aria-current="page"
              className="flex items-center bg-white rounded-xl"
              href="/"
            >
              <img className=" h-10 w-auto" src={Logo} alt="" />
              <p className="sr-only">Website Title</p>
            </a>
          </div>
          <div className="hidden md:w-full md:flex md:items-center md:justify-center relative">
            <input
              className="w-[80%] bg-gray-100 hover:bg-white h-8 px-5 rounded-lg text-sm"
              type="text"
              name="search"
              placeholder="Search"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button
              type="submit"
              className="absolute top-0 md:right-14 lg:right-24 mt-1 mr-2"
              aria-label="Submit Search"
              onClick={handleClick}
            >
              <FaSearch size={24} />
            </button>
          </div>
          <div className="flex items-center justify-end gap-3">
            {token ? (
              <>
                <a
                  className="hidden  items-center justify-center rounded-xl bg-white px-3 
              py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset 
              ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex sm:w-20"
                  href="/"
                  onClick={() => handleLogout()}
                >
                  logout
                </a>
              </>
            ) : (
              <>
                <a
                  className="w-18 inline-flex items-center justify-center rounded-xl 
              bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
              transition-all duration-150 hover:bg-blue-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="/login"
                >
                  Login
                </a>
                <a
                  className="hidden  items-center justify-center rounded-xl bg-white px-3 
              py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset 
              ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex sm:w-20"
                  href="/register"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>

        <a
          className=" h-24 w-[15%] flex justify-center items-center"
          href={`/user/${profile.username}`}
        >
          {profile.foto ? (
            <img
              className="object-cover h-16 w-16 rounded-full"
              src={`http://localhost:3000/images/${profile.foto}`}
              alt="Profile picture"
            />
          ) : (
            <img
              className="object-cover h-16 w-16 rounded-full"
              src={Profile}
              alt="Profile picture"
            />
          )}
        </a>
      </div>
    </>
  );
};
