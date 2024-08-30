import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET: string = process.env.SECRET || "";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized token",
    });
  }

  const [prefix, accessToken] = token.split(" ");
  if (prefix !== "Bearer" || !accessToken) {
    return res.status(401).json({
      message: "Unauthorized prefix",
    });
  }

  const user = jwt.verify(accessToken, SECRET);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  next();
};
