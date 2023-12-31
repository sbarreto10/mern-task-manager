import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
   const { username, email, password } = req.body;

   try {
      const userFound = await User.findOne({ email });
      if (userFound) {
         return res.status(409).json(["Email already exists"]);
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
         email,
         username,
         password: passwordHash,
      });

      const userSaved = await newUser.save();

      const token = await createAccessToken({ id: userSaved.id });
      res.cookie("token", token, { sameSite: "none", secure: true, path: "/" });

      res.json({
         id: userSaved.id,
         email: userSaved.email,
         username: userSaved.username,
         createdAt: userSaved.createdAt,
         updatedAt: userSaved.updatedAt,
      });
   } catch (error) {
      res.status(404).json(error);
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const userFound = await User.findOne({ email });
      if (!userFound) return res.status(404).json(["Email not registered"]);

      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) return res.status(404).json(["Invalid password"]);

      const token = await createAccessToken({ id: userFound.id });
      res.cookie("token", token, { sameSite: "none", secure: true, path: "/" });

      res.json({
         id: userFound.id,
         email: userFound.email,
         username: userFound.username,
         createdAt: userFound.createdAt,
         updatedAt: userFound.updatedAt,
      });
   } catch (error) {
      res.status(404).json(error);
   }
};

export const logout = async (req, res) => {
   res.cookie("token", "", {
      expires: new Date(0),
      sameSite: "none",
      secure: true,
      path:"/"
   });
   console.log(req.cookies);
   // res.end()
   return res.sendStatus(200);
};

export const profile = async (req, res) => {
   const userFound = await User.findById(req.user.id);

   return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
   });
};

export const verifyToken = async (req, res) => {
   const { token } = req.cookies;

   if (!token)
      return res.status(200).json({ message: "No token found in cookies" });

   jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedUser) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      return res.status(200).json({ message: "Verified token", token });
   });
};

export const changePassword = async (req, res) => {
   const { password, newPassword } = req.body;

   const userFound = await User.findById(req.user.id);

   const isMatch = await bcrypt.compare(password, userFound.password);
   if (!isMatch) return res.status(404).json(["Invalid password"]);

   try {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      const updatedUser = await userFound.updateOne({ password: passwordHash });

      res.status(200).json({ message: "Password updated" });
   } catch (error) {
      res.status(404).json(error);
   }
};

export const changeUsername = async (req, res) => {
   const { newUsername } = req.body;

   const userFound = await User.findById(req.user.id);
   const updatedUser = await userFound.updateOne({ username: newUsername });

   res.status(200).json({ message: "Username updated" });
};
