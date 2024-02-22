import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { getAllPosts, searchPost } from "../modules/fetch";

export const Home = () => {
  const [dataPosts, setDataPosts] = useState([]);

  const fetchAllPost = async () => {
    try {
      const response = await getAllPosts();

      if (!response) {
        return "No Posts";
      }

      setDataPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleSearch = async (description) => {
    try {
      const response = await searchPost(description);

      setDataPosts(response.data);

      console.log(description);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  return (
    <>
      <Navbar handleSearch={handleSearch} fetchAllPost={fetchAllPost} />
      <div className="h-full grid place-items-center">
        <div className="p-5 sm:p-8">
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-4 lg:columns-6 [&>img:not(:first-child)]:mt-8 ">
            {dataPosts.map((post) => (
              <a
                className="relative group "
                key={post.post_id}
                href={`/post/${post.post_id}`}
              >
                <div
                  className="absolute rounded-xl inset-0 flex items-center justify-center w-full 
                      bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity left-4 "
                >
                  <div className="flex-row text-center">
                    <h1 className="text-gray-50 font-bold text-lg">
                      {post.description.substring(0, 15)}
                    </h1>

                    {/* <small className="text-xs font-light text-gray-300">
                        Photo by Sébastien Goldberg on Unsplash
                      </small> */}
                  </div>
                </div>
                <img
                  src={`http://localhost:3000/images/${post.image}`}
                  className=" rounded-xl m-4 block"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
