import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { Request, Response } from "express"
import userModel from "../models/user.model.js"
import tokenBlacklistModel from "../models/blacklist.model.js"
import type { AuthRequest } from "../types/index.js"

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400).json({
      message: "Please provide username, email and password",
    })
    return
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  })

  if (isUserAlreadyExists) {
    res.status(400).json({
      message: "Account already exists with this email address or username",
    })
    return
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username,
    email,
    password: hash,
  })

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    })
    return
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid email or password",
    })
    return
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("token", token)
  res.status(200).json({
    message: "User loggedIn successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req: Request, res: Response): Promise<void> {
  const token: string | undefined = req.cookies.token

  if (token) {
    await tokenBlacklistModel.create({ token })
  }

  res.clearCookie("token")

  res.status(200).json({
    message: "User logged out successfully",
  })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req: AuthRequest, res: Response): Promise<void> {
  const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    },
  })
}

export { registerUserController, loginUserController, logoutUserController, getMeController }
