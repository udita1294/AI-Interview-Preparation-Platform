import type { Document, Types } from "mongoose"

export interface IBlacklistToken extends Document {
  _id: Types.ObjectId
  token: string
  createdAt: Date
  updatedAt: Date
}
