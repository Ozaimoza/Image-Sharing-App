import React, { useState, useEffect } from "react";

import { useAppContext } from "../components/AppContext";
import {
  deletePost,
  getAllPostsByUsername,
  getProfileByUsername,
} from "../modules/fetch";
import { useParams } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import Logo from "../assets/logowhite.png";
import { ModalCreatePost } from "../components/ModalCreatePost";
import { Setting } from "../components/SettingModal";
import Profilefoto from "../assets/profile.jpg";
import { FaTrashAlt } from "react-icons/fa";

export const Profile = () => {
  const { currentUser } = useAppContext();

  const [profile, setProfile] = useState([]);
  const { username } = useParams();
  const [getData, setGetData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  // const [profileData, setProfileData] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSetting = () => {
    setSettingOpen(true);
  };

  const closeSetting = () => {
    setSettingOpen(false);
  };

  const fetchProfileByUsername = async () => {
    try {
      const response = await getProfileByUsername(username);
      setProfile(response);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };
  const fetchAllPostByUsername = async () => {
    try {
      const response = await getAllPostsByUsername(username);

      if (!response) {
        return "No Posts";
      }

      setGetData({
        data: response.data,
        likes: response.stat.likes,
        comments: response.stat.comments,
        posts: response.stat.posts,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  useEffect(() => {
    fetchAllPostByUsername();
    fetchProfileByUsername();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);

      fetchAllPostByUsername();
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };
  return (
    <>
      <div className="p-16 pt-0 bg-gray-200 ">
        <div className=" pb-0 pt-4 flex ">
          <a href="/" className="w-12">
            <img src={Logo} className="w-12 h-12 bg-red-600 rounded-xl" />
          </a>
        </div>

        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div
              className="grid grid-cols-3 text-center order-last 
            md:order-first mt-20 md:mt-0"
            >
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {getData.posts}
                </p>
                <p className="text-gray-400">Photos</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {getData.comments}
                </p>
                <p className="text-gray-400">Comments</p>
              </div>
            </div>
            <div className="relative">
              {profile.foto ? (
                <img
                  className="w-48 h-48 bg-indigo-100 mx-auto rounded-full 
                  shadow-2xl absolute inset-x-0 top-0 -mt-24 flex 
                  items-center justify-center text-indigo-500"
                  src={`http://localhost:3000/images/${profile.foto}`}
                  alt="Profile picture"
                />
              ) : (
                <img
                  className="w-48 h-48 bg-indigo-100 mx-auto rounded-full 
                  shadow-2xl absolute inset-x-0 top-0 -mt-24 flex 
                  items-center justify-center text-indigo-500"
                  src={Profilefoto}
                  alt="Profile picture"
                />
              )}
            </div>

            <div className="space-x-8 flex justify-end mt-32 md:mt-0 ">
              {currentUser === username ? (
                <>
                  <button
                    className="group flex items-center justify-start w-11 h-11 
              bg-red-600 rounded-full cursor-pointer relative overflow-hidden 
              transition-all duration-200 shadow-lg hover:w-52 hover:rounded-lg 
              active:translate-x-1 active:translate-y-1"
                  >
                    <div
                      className="flex items-center justify-center w-full transition-all 
                duration-300 group-hover:justify-start group-hover:px-3"
                    >
                      <FaPlus color="white" size={38} />
                    </div>
                    <div
                      className="absolute right-5 transform translate-x-full 
                opacity-0 text-white text-lg font-semibold transition-all 
                duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      onClick={openModal}
                    >
                      Upload Image
                    </div>
                  </button>
                  <a
                    className="flex justify-center hover:scale-110 duration-100"
                    onClick={openSetting}
                  >
                    <IoMdSettings size={46} />
                  </a>
                </>
              ) : null}
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {profile.username}
            </h1>
            <p className="font-light text-gray-600 mt-3">{profile.full_name}</p>

            <p className="mt-8 text-gray-500">{profile.bio}</p>
          </div>

          <div className="h-full">
            <div className="p-5 sm:p-8">
              <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 ">
                {getData.data &&
                  getData.data.map((post) => (
                    <div className="relative group" key={post.post_id}>
                      <div
                        className="absolute rounded-xl inset-0 flex items-center justify-center w-full z-0
                      bg-gray-800 opacity-0 group-hover:opacity-75 transition-opacity left-4 "
                      >
                        {currentUser === username ? (
                          <button
                            className="absolute z-auto top-0 right-0 flex justify-center items-center gap-2 w-12 h-12 cursor-pointer rounded-md 
                          shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] m-1
                          via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 hover:opacity-100
                          duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                            onClick={() => handleDelete(post.post_id)}
                          >
                            <FaTrashAlt size={24} />
                          </button>
                        ) : null}
                        <a
                          className="flex items-center justify-center text-center w-full h-full "
                          href={`/post/${post.post_id}`}
                        >
                          <h1 className="text-gray-50 font-bold text-lg">
                            {post.description.substring(0, 15)}
                          </h1>

                          {/* <small className="text-xs font-light text-gray-300">
                        Photo by Sébastien Goldberg on Unsplash
                      </small> */}
                        </a>
                      </div>
                      <img
                        src={`http://localhost:3000/images/${post.image}`}
                        className=" rounded-xl  m-4"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalCreatePost
        isOpen={modalOpen}
        onClose={closeModal}
        fetchProfile={fetchAllPostByUsername}
      />
      <Setting
        open={settingOpen}
        close={closeSetting}
        fetchProfile={fetchAllPostByUsername}
      />
    </>
  );
};
