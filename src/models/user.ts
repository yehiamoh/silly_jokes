import mongoose, { Schema, Document, model ,Types} from "mongoose";

interface IUser extends Document {
  _id:Types.ObjectId;
  user_name: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      minlength: 3, 
      unique:true,
      trim: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);
export default User;
