import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  rpayID: { type: String, default:"" },
  rpaySecret: { type: String, default:"" },
  profilePic: { type: String, default:"" },
  coverPic: { type: String, default:"" },
  createdAt: { type: String, default: Date.now() },
  updatedAt: { type: String, default: Date.now() },
});

export default mongoose.models.User || model("User", UserSchema);