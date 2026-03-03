import jwt from "jsonwebtoken"
import type { Response, NextFunction } from "express"
import tokenBlacklistModel from "../models/blacklist.model.js"
import type { AuthRequest, JwtPayload } from "../types/index.js"

async function authUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const token: string | undefined = req.cookies.token

  if (!token) {
    res.status(401).json({
      message: "Token not provided.",
    })
    return
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

  if (isTokenBlacklisted) {
    res.status(401).json({
      message: "token is invalid",
    })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

    req.user = decoded

    next()
  } catch (err) {
    res.status(401).json({
      message: "Invalid token.",
    })
  }
}

export { authUser }
