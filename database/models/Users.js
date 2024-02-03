import mongoose from "mongoose";

const { Schema } = mongoose;

// user schema
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export default model("Users", UserSchema);
export const Users =
  mongoose.models.Users || mongoose.model("Users", UserSchema);
