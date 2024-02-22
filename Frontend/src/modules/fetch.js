import { instance } from "./axios";

import axios from "axios";

const login = async (credentials) => {
  // const setAuthToken = useAuth();
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      credentials
    );

    const result = response.data;
    // console.log(token);
    return result;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const logout = async () => {
  try {
    const response = await axios.post("http://localhost:3000/logout");
    console.log(response);
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const register = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/register", data);
    // console.log(response);
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getProfile = async () => {
  try {
    const response = await instance.get("/account/edit");

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllPosts = async () => {
  try {
    const response = await instance.get("/");

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllPostsByUsername = async (username) => {
  try {
    const response = await instance.get(`/post/${username}`);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const createNewPost = async (newData) => {
  try {
    const response = await instance.post("/post", newData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getPostById = async (id) => {
  try {
    const response = await instance.get(`/post/id/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const createComment = async (id, data) => {
  try {
    const response = await instance.post(`/post/${id}/comment`, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getUserById = async () => {
  try {
    const response = await instance.get("/account/edit");

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const updateProfile = async (profileData) => {
  try {
    const response = await instance.put("/account/edit", profileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getProfileByUsername = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/${username}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const searchPost = async (description) => {
  try {
    const response = await instance.get(`/search/${description}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const createLike = async (postId) => {
  try {
    const response = await instance.post(`/post/${postId}/like`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const deleteLike = async (postId) => {
  try {
    const response = await instance.delete(`/post/${postId}/like`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const getAllLikeByPostId = async (postId) => {
  try {
    const response = await instance.get(`/post/${postId}/like`);
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

const deletePost = async (postId) => {
  try {
    const response = await instance.delete(`/post/id/${postId}`);
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};
const updatePost = async (postId, data) => {
  try {
    const response = await instance.delete(`/post/id/${postId}`, data);
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export {
  login,
  logout,
  register,
  getProfile,
  getAllPosts,
  getAllPostsByUsername,
  getPostById,
  createNewPost,
  createComment,
  getUserById,
  updateProfile,
  getProfileByUsername,
  searchPost,
  createLike,
  deleteLike,
  getAllLikeByPostId,
  deletePost,
  updatePost,
};
