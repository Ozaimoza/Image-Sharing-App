const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Comment {
  //Create
  static createComment = async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user;
      const { comment } = req.body;
      const data = await prisma.comment.create({
        data: {
          comment: comment,
          user_id: Number(user_id),
          post_id: Number(id),
        },
      });

      const response = {
        message: "Success Create Post",
        data: data,
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

  static updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.user;
      const { comment } = req.body;
      const newData = await prisma.comment.update({
        where: { comment_id: Number(id), user_id: user_id },
        data: {
          comment: comment,
          updatedAt: new Date(),
        },
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

  static deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await prisma.comment.findUnique({
        where: {
          comment_id: parseInt(id),
        },
      });

      if (!comment) {
        return res.status(404).json("Comment Not Found !!");
      }

      const response = await prisma.comment.delete({
        where: {
          comment_id: parseInt(id),
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

  static getAllCommentByIdPost = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await prisma.comment.findMany({
        where: { post_id: Number(id) },
        include: {
          user: true,
        },
      });

      const result = {
        message: "Success",
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

module.exports = Comment;
