const express = require("express");
const {
  login,
  register,
  logout,
  getUserById,
  updateProfile,
  getUserByUsername,
} = require("../controllers/userController");

// middleware
const mtr = require("../middleware/uploadMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getAllPost,
  getPostById,
  updatePost,
  getAllPostByUsername,
  deletePost,
  getAllPostByDescription,
  createPost,
} = require("../controllers/postController");

const {
  createLike,
  deleteLike,
  getAllLikeByIdPost,
} = require("../controllers/likeController");

const {
  createComment,
  updateComment,
  getAllCommentByIdPost,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", getAllPost);
router.route("/:username").get(getUserByUsername);
router.route("/post/:username").get(getAllPostByUsername);
router.route("/post/id/:id").get(getPostById);
router.get("/search/:description", getAllPostByDescription);

router.use(authMiddleware);

router.route("/post").post(mtr.upload.single("image"), createPost);
router.route("/post/id/:id").put(updatePost).delete(deletePost);
router
  .route("/post/:id/like")
  .get(getAllLikeByIdPost)
  .post(createLike)
  .delete(deleteLike);

router
  .route("/post/:id/comment")
  .get(getAllCommentByIdPost)
  .post(createComment);

router.route("/post/comment/:id").delete(deleteComment);

router
  .route("/account/edit")
  .get(getUserById)
  .put(mtr.upload.single("foto"), updateProfile);

module.exports = router;
