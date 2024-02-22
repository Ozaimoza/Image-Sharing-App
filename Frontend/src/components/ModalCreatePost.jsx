import React, { useEffect, useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { createNewPost } from "../modules/fetch";

export const ModalCreatePost = ({ fetchProfile, isOpen, onClose }) => {
  const [preview, setPreview] = useState();

  const [newPost, setNewPost] = useState({
    description: "",
    image: null,
  });

  function handleChange(e) {
    console.log(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));

    setNewPost((prevNewPost) => ({
      ...prevNewPost,
      image: e.target.files[0],
    }));
  }

  const handleCloseModal = () => {
    onClose(); // Menutup modal
    setPreview(null); // Menghapus file yang tersimpan dari state
  };

  const handleUpload = async () => {
    if (!newPost.image) {
      console.log("No file selected");
      return;
    }

    await createNewPost(newPost);

    fetchProfile();
    onClose();

    // console.log(newPost);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-800 opacity-75"
            onClick={handleCloseModal}
          ></div>
          <div className="relative w-[60%] bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-7xl flex">
            <div className=" lg:block lg:w-1/2 bg-cover w-full">
              {preview && (
                <img
                  className="w-full h-full object-cover"
                  src={preview}
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
                Upload file
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
                htmlFor="description"
              >
                Some Description
                <div className="mt-2 w-[80%]">
                  <textarea
                    type="text"
                    id="description"
                    name="inputname"
                    className=" w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 
                    focus:text-gray-800 mb-6 resize-none flex justify-center"
                    value={newPost.description} // Bind value to newPost.description
                    onChange={(e) =>
                      setNewPost({ ...newPost, description: e.target.value })
                    } // Handle changes
                  />
                </div>
              </label>
              <div className="flex justify-center p-6">
                <a
                  className=" w-[80%] bg-red-700 text-white font-bold rounded-xl p-2 
                flex items-center justify-center 
                 hover:bg-red-800 cursor-pointer active:scale-90 active:duration-150"
                  onClick={handleUpload}
                >
                  Upload
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
