import mongoose, { Schema, Document, model } from "mongoose";

interface ICategory extends Document {
  name: String;
}
const cateogrySchema: Schema = new Schema(
  {
    name: {
      type:String,
      require: true,
      maxLength: 20,
    },
  },
  {
    timestamps: true,
  }
);

const category=mongoose.model<ICategory>("Category",cateogrySchema);
export default category;
