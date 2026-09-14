import mongoose from "mongoose";

const useSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
}, {
   timestamps: true,
});  


const userModel = mongoose.model("User", useSchema);
                      
export default userModel;

