const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const prisma = new PrismaClient();

class User {
  // Register
  static register = async (req, res) => {
    try {
      const { full_name, username, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      //pengecekan username
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      //jika username sudah terpakai
      if (user) {
        return res.status(409).json("Username Already Exists");
      }

      const Data = await prisma.user.create({
        data: {
          full_name: full_name,
          username: username,
          password: hashedPassword,
          email: email,
        },
      });

      const response = {
        message: "Success Create User",
        data: Data,
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

  //Login
  static login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findFirst({
        where: { username },
      });

      // periksa user dan password
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Buat token JWT
      const token = jwt.sign({ user_id: user.user_id }, "secret", {
        expiresIn: "1d",
      });

      const currentUser = user.username;
      const userId = user.user_id;
      // Simpan token dalam cookie
      res.cookie("token", token, { httpOnly: true, maxAge: 90000000 });
      // Simpan username dalam cookie
      res.cookie("currentUser", currentUser, {
        httpOnly: true,
        maxAge: 90000000,
      });
      res.cookie("userId", userId, {
        httpOnly: true,
        maxAge: 90000000,
      });

      // Kirim respons dengan token
      const response = {
        message: "login Success",
        token: token,
        currentUser: currentUser,
        userId: userId,
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

  //Logout
  static logout = async (req, res) => {
    try {
      // Hapus cookie dengan nama 'token'
      res.clearCookie("token");
      res.clearCookie("currentUser");
      res.clearCookie("userId");

      res.json("success logout");
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //Get User By Id
  static getUserById = async (req, res) => {
    try {
      const user_id = req.user;
      const response = await prisma.user.findUnique({
        where: {
          user_id: Number(user_id),
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

  //Get User By Username
  static getUserByUsername = async (req, res) => {
    try {
      //   const { id } = req.user;
      const { username } = req.params;
      const response = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      return res.json(response);
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

  //Update Profile
  static updateProfile = async (req, res) => {
    try {
      const user_id = req.user;
      const { username, full_name, bio } = req.body;

      const dataToUpdate = {
        full_name: full_name,
        bio: bio,
      };

      const user = await prisma.user.findUnique({
        where: {
          user_id: user_id,
        },
      });

      // pengecekan username
      if (user.username !== username) {
        const getuser = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        //jika username sudah terpakai
        if (getuser) {
          return res.status(409).json("Username Already Exists");
        }

        dataToUpdate.username = username;

        res.cookie("currentUser", username, {
          httpOnly: true,
          maxAge: 90000000,
        });
      }

      if (req.file) {
        // tambahkan gambar jika ada
        dataToUpdate.foto = req.file.filename;

        const imageName = user.foto; // mengambil nama gambar sebelum nya
        // jika terdapat gambar
        if (imageName) {
          // Path lengkap ke gambar
          const imagePath = path.join(
            __dirname,
            "..",
            "public",
            "images",
            imageName
          );

          // mengganti gambar dari penyimpanan
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Error updating image:", err);
            } else {
              console.log("Image updated successfully");
            }
          });
        }
      }

      //   return res.json({ dataToUpdate });
      const response = await prisma.user.update({
        where: { user_id: Number(user_id) },
        data: dataToUpdate,
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

module.exports = User;
