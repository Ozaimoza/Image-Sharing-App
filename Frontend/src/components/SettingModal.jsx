import React, { useState, useEffect } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { getUserById, updateProfile } from "../modules/fetch";
import { useAppContext } from "./AppContext";
import ProfileFoto from "../assets/profile.jpg";

export const Setting = ({ open, close }) => {
  const { fetchProfile } = useAppContext();
  const [preview, setPreview] = useState();
  const [profileData, setProfileData] = useState({
    username: "",
    full_name: "",
    bio: "",
    foto: null,
  });

  const fetchProfileData = async () => {
    try {
      const response = await getUserById();

      if (response.data) {
        setProfileData({
          username: response.data.username || " Username",
          full_name: response.data.full_name || " Full Name",
          bio: response.data.bio || " Bio",
          foto: response.data.foto,
        });
      } else {
        console.error("Failed to fetch profile data: response data is empty");
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error.message);
    }
  };

  const handleClose = () => {
    close();
  };
  const handleUpdate = async () => {
    try {
      // console.log(profileData);

      await updateProfile(profileData);

      fetchProfile();
      close();
    } catch (error) {
      console.error("Failed to fetch profile data:", error.message);
    }
  };

  function handleChange(e) {
    console.log(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));

    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      foto: e.target.files[0],
    }));
  }

  useEffect(() => {
    if (open === true) {
      fetchProfileData();
    }
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-800 opacity-75"
            onClick={handleClose}
          ></div>
          <div className="relative w-[60%] bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-7xl flex">
            <div className=" lg:block lg:w-1/2 bg-cover w-full">
              {preview ? (
                <img
                  className="w-full  p-6"
                  src={preview}
                  alt="Modal Background"
                />
              ) : profileData.foto ? (
                <img
                  className="w-full  p-6 "
                  src={`http://localhost:3000/images/${profileData.foto}`}
                  alt="Modal Background"
                />
              ) : (
                <img
                  className="w-full  p-6 "
                  src={ProfileFoto}
                  alt="Modal Background"
                />
              )}
            </div>
            <div className=" lg:block lg:w-1/2 bg-white">
              <label
                htmlFor="uploadFile"
                className="bg-white text-black text-base rounded 
                w-[80%] h-52 flex flex-col items-center justify-center cursor-pointer border-2 
                border-gray-300 border-dashed mx-auto font-[sans-serif] m-8"
              >
                <SlCloudUpload size={34} />
                Upload Foto
                <input
                  type="file"
                  id="uploadFile"
                  className="hidden"
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-400 mt-2">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </label>
              <label
                className="pt-1  text-gray-500 text-sm flex flex-col items-center justify-center w-full "
                htmlFor="username"
              >
                Username
                <div className="mt-2 w-[80%]">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className=" w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 
                    focus:text-gray-800 mb-6 resize-none flex justify-center"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    } // Handle changes
                  />
                </div>
              </label>
              <label
                className="pt-1  text-gray-500 text-sm flex flex-col items-center justify-center w-full "
                htmlFor="fullname"
              >
                Full Name
                <div className="mt-2 w-[80%]">
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className=" w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 
                    focus:text-gray-800 mb-6 resize-none flex justify-center"
                    value={profileData.full_name}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        full_name: e.target.value,
                      })
                    } // Handle changes
                  />
                </div>
              </label>
              <label
                className="pt-1  text-gray-500 text-sm flex flex-col items-center justify-center w-full "
                htmlFor="bio"
              >
                Bio
                <div className="mt-2 w-[80%]">
                  <textarea
                    type="text"
                    id="bio"
                    name="bio"
                    className=" w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 
                    focus:text-gray-800 mb-6 resize-none flex justify-center"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    } // Handle changes
                  />
                </div>
              </label>
              <div className="flex justify-center p-6">
                <a
                  className=" w-[80%] bg-red-700 text-white font-bold rounded-xl p-2 
                flex items-center justify-center 
                 hover:bg-red-800 cursor-pointer active:scale-90 active:duration-150"
                  onClick={handleUpdate}
                >
                  Save Change
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
