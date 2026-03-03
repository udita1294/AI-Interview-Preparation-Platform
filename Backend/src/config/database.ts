import mongoose from "mongoose"

async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Database")
  } catch (err) {
    console.log(err)
  }
}

export default connectToDB
