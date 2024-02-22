const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");

const prisma = new PrismaClient();

class Post {
  //get All Post
  static getAllPost = async (req, res) => {
    try {
      const post = await prisma.post.findMany();

      const response = {
        message: "Success",
        data: post,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //get Post By Id
  static getPostById = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {
          post_id: Number(id),
        },
        include: {
          user: true,
          comments: { include: { user: true } },
        },
      });

      const response = {
        message: "Success",
        data: post,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //get all Post By User Id
  static getAllPostByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      // console.log(req.params);
      const findUser = await prisma.user.findFirst({
        where: {
          username: username,
        },
        include: {
          _count: {
            select: { likes: true, comments: true, posts: true },
          },
          posts: true,
        },
      });

      const response = {
        message: "Success",
        data: findUser.posts,
        stat: findUser._count,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //get all Post By User Id
  static getAllPostByDescription = async (req, res) => {
    try {
      const { description } = req.params;
      // console.log(description);

      const post = await prisma.post.findMany({
        where: {
          description: {
            startsWith: `%${description}%`,
          },
        },
      });

      const response = {
        message: "Success",
        data: post,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //Create
  static createPost = async (req, res) => {
    try {
      const user_id = req.user;
      const { description } = req.body;
      const newData = await prisma.post.create({
        data: {
          image: req.file.filename,
          description: description,
          createdAt: new Date(),
          user: {
            connect: { user_id: Number(user_id) },
          },
        },
      });

      const response = {
        message: "Success Create Post",
        data: newData,
      };

      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  // Update
  static updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const newData = await prisma.post.update({
        where: {
          post_id: Number(id),
        },
        data: { description: description },
      });

      const response = {
        message: "Success Create Post",
        data: newData,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //Delete
  static deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {
          post_id: parseInt(id),
        },
      });

      if (!post) {
        return res.status(404).json("Post Not Found !!");
      }

      const imageName = post.image; // mengambil nama gambar

      if (imageName) {
        // Path lengkap ke gambar
        const imagePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          imageName
        );

        // Hapus gambar dari penyimpanan
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          } else {
            console.log("Image deleted successfully");
          }
        });
      }

      const cascade = await prisma.post.update({
        where: {
          post_id: parseInt(id),
        },
        data: {
          comments: {
            deleteMany: {},
          },
          likes: {
            deleteMany: {},
          },
        },
        include: {
          comments: true,
          likes: true,
        },
      });

      const response = await prisma.post.delete({
        where: {
          post_id: parseInt(id),
        },
      });

      const result = {
        message: "Success Delete",
        data: response,
      };
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };
}

module.exports = Post;
