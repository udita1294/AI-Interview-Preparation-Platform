import mongoose from "mongoose"
import type { IBlacklistToken } from "../types/index.js"

const blacklistTokenSchema = new mongoose.Schema<IBlacklistToken>(
  {
    token: {
      type: String,
      required: [true, "token is required to be added in blacklist"],
    },
  },
  {
    timestamps: true,
  }
)

const tokenBlacklistModel = mongoose.model<IBlacklistToken>("blacklistTokens", blacklistTokenSchema)

export default tokenBlacklistModel
