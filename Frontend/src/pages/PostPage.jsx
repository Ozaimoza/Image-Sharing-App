import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import {
  createComment,
  createLike,
  deleteLike,
  getAllLikeByPostId,
  getPostById,
} from "../modules/fetch";
import Profilefoto from "../assets/profile.jpg";
import { FcLike } from "react-icons/fc";
import { useAppContext } from "../components/AppContext";

export const Post = () => {
  const { postId } = useParams();
  const { token, userId } = useAppContext();
  const [post, setPost] = useState(null); // Mengubah nilai awal dari useState menjadi null
  const [publisher, setPublisher] = useState({}); // Mengubah nilai awal dari useState menjadi objek kosong
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState({ comment: "" }); // Menambahkan nilai awal untuk properti comment
  const [doneLike, setDoneLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const fetchPost = async () => {
    try {
      const response = await getPostById(postId);
      setPost(response.data);
      setPublisher(response.data.user);
      setComment(response.data.comments);
    } catch (error) {
      console.error("Gagal mengambil data posting:", error.message);
    }
  };

  const fetchLike = async () => {
    try {
      const response = await getAllLikeByPostId(postId);

      setDoneLike(response.data.some((like) => like.user_id == userId));

      setLikeCount(response.data.length);
    } catch (error) {
      console.error("Gagal mengambil data like:", error.message);
    }
  };

  const handleUpload = async () => {
    try {
      if (!newComment.comment) {
        return;
      }
      await createComment(postId, newComment);
      fetchPost();
    } catch (error) {
      console.error("Gagal mengunggah komentar:", error.message);
    }
  };

  const handleClick = async () => {
    try {
      if (!doneLike) {
        await createLike(postId);
      } else {
        await deleteLike(postId);
      }
      fetchLike();
      setDoneLike((prev) => !prev);
    } catch (error) {
      console.error("Gagal memproses like:", error.message);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchLike();
  }, []);

  return (
    <>
      <Navbar />
      {post && ( // Tambahkan pengecekan post sebelum render konten
        <div className="p-6">
          <div className="flex sm:flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto w-full max-w-sm lg:max-w-4xl ">
            <div className=" lg:block lg:w-1/2 bg-cover ">
              <img
                className=" w-full sm:rounded-none md:rounded-l-3xl max-h-4xl"
                src={`http://localhost:3000/images/${post.image}`}
                alt="Post Image" // Tambahkan atribut alt untuk gambar
              />
            </div>
            <div className=" w-full p-2 lg:w-1/2 h-full">
              <div className="flex flex-col items-start justify-between sm:flex-row   border-b-2 ">
                <img
                  className="object-cover w-16 h-16 mt-3 mr-3 rounded-full"
                  src={`http://localhost:3000/images/${publisher.foto}`}
                  alt="Publisher Image" // Tambahkan atribut alt untuk gambar
                />
                <div>
                  <p
                    className="font-display mb-2 text-2xl font-semibold text-black"
                    itemProp="author"
                  >
                    <a href={`/user/${publisher.username}`} rel="author">
                      {publisher.full_name}
                    </a>
                  </p>
                  <div className="mb-4 prose prose-sm text-gray-400">
                    <p>{publisher.bio}</p>
                  </div>
                </div>
                {token ? (
                  <div className="flex items-center  px-6 mt-2">
                    <button className="cursor-pointer" onClick={handleClick}>
                      <span
                        className={`flex h-min w-min space-x-1 items-center rounded-full text-gray-400 ${
                          doneLike
                            ? "text-rose-600 bg-rose-50 scale-150"
                            : "bg-gray-700"
                        } py-1 px-2 text-xs font-medium`}
                      >
                        <FcLike size={20} />
                        <p className="font-semibold text-xs">{likeCount}</p>
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center  px-6"></div>
                )}
              </div>
              <h1 className=" py-6 font-bold">Komentar</h1>
              {/* comment */}
              <form className="overflow-y-auto no-scrollbar h-60 mt-4">
                <div className="flex flex-col ">
                  {comment &&
                    (comment.length !== 0
                      ? comment.map((comment) => (
                          <div
                            className="border-b-2  p-3 "
                            key={comment.comment_id}
                          >
                            <div className="flex gap-3 items-center">
                              <img
                                src={`http://localhost:3000/images/${comment.user.foto}`}
                                className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                alt="Commenter Image" // Tambahkan atribut alt untuk gambar
                              />
                              <h3 className="font-bold">
                                {comment.user.username}
                              </h3>
                            </div>
                            <p className="text-gray-600 mt-2">
                              {comment.comment}
                            </p>
                          </div>
                        ))
                      : "Tidak ada komentar")}
                </div>
              </form>
              {token && (
                <>
                  <div className="w-full px-3 my-2">
                    <textarea
                      className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      name="body"
                      placeholder="Ketik komentar Anda"
                      required
                      value={newComment.comment}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          comment: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="w-full flex justify-end px-3">
                    <button
                      className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 active:bg-indigo-600 
                  active:scale-90 active:duration-200"
                      onClick={handleUpload}
                    >
                      Kirim Komentar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
