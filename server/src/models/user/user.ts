import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';
// Define the User interface
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profileImage?: string;  
    posts?: [type: Schema.Types.ObjectId]; 
    bio?: string,
    contributor?:boolean
}

// Create the User schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: { type: [{ type: Schema.Types.ObjectId, ref: "Post" }] },
    profileImage: { type: String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHBp3gsQdFjO_r7zsVr0d-gs8n86rXGbmp3w&s" },
    bio: { type: String },
    contributor: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash the password before saving the admin
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create the User model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
