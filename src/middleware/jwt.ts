import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateToken = async (userId: string) => {
  const accessToken = jwt.sign({ userId }, secret, { expiresIn: "30d" });
  return accessToken;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) :void=> {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
     res.status(401).json({ message: "Access token is missing or invalid" });
     return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
       res.status(401).json({ message: "Token is invalid or expired" });
       return
    }

    req.user = decoded;
    console.log(decoded);
    next();
  });
};
