const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    // console.log(token);
    const decoded = jwt.verify(token, "secret");
    const user_id = decoded.user_id;

    const user = await prisma.user.findUnique({
      where: { user_id: user_id },
    });
    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Menambahkan informasi user ke objek req untuk digunakan oleh handler rute selanjutnya
    req.user = user.user_id;

    // Melanjutkan ke handler rute selanjutnya
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message || "Something went wrong",
    });
  }
}

module.exports = { authMiddleware };
