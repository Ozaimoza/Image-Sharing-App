const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Like {
  // Like
  static createLike = async (req, res) => {
    try {
      const user_id = req.user;
      const { id } = req.params;

      const search = await prisma.like.findFirst({
        where: { user_id: user_id, post_id: Number(id) },
      });

      if (search) {
        return res.status(409).json("confilct");
      }

      const response = await prisma.like.create({
        data: {
          user_id: Number(user_id),
          post_id: Number(id),
        },
      });

      const result = {
        message: "Success",
        data: response,
      };

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //Unlike
  static deleteLike = async (req, res) => {
    try {
      const user_id = req.user;
      const { id } = req.params;
      const search = await prisma.like.findFirst({
        where: { user_id: user_id, post_id: Number(id) },
      });

      //   return res.json(search);
      const response = await prisma.like.delete({
        where: { like_id: search.like_id },
      });

      const result = {
        message: "Success",
        data: response,
      };

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  static getAllLikeByIdPost = async (req, res) => {
    try {
      // const user_id = req.user;
      const { id } = req.params;
      const response = await prisma.like.findMany({
        where: { post_id: Number(id) },
      });

      const result = {
        message: "Success",
        data: response,
      };

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };
}

module.exports = Like;
