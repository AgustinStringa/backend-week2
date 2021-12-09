import ProfileMongoDB from "../connection";
import moongose, { Types, ObjectId, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = ProfileMongoDB.model("User", UserSchema);

export default UserModel;
