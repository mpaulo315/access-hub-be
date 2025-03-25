import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../models/User";
import jwt from "jsonwebtoken";

import { jwtExpire, jwtKey } from "../../config/jwt/index.config";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, nickname } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPwd, nickname });
  await user.save();
  return res.status(201).json({ message: "User created successfully" });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const pwdMatch = await bcrypt.compare(password, user.password);
  if (!pwdMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    jwtKey!,
    {
      expiresIn: jwtExpire!,
      algorithm: "HS256",
    } as jwt.SignOptions
  );

  return res.status(200).json({ message: "Login successful", token });
};


