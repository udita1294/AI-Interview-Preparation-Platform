import mongoose from "mongoose"
import type { IUser } from "../types/index.js"

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const userModel = mongoose.model<IUser>("users", userSchema)

export default userModel
