import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/HomePage";

import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { AppProvider } from "./components/AppContext";
import { Login } from "./pages/LoginPage";
import { Register } from "./pages/RegisterPage";
import { Profile } from "./pages/ProfilePage";
import { Post } from "./pages/PostPage";
import { Search } from "./pages/SearchPage";

const checkAuthentication = () => {
  // Periksa apakah token ada di localStorage atau sesuai dengan logika otentikasi Anda
  return Cookies.get("token") !== undefined;
};

const PrivateRoute = ({ element }) => {
  return checkAuthentication() ? <>{element}</> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/search/:description" element={<Search />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
