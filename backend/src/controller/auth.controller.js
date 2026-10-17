import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const isProduction = process.env.NODE_ENV === "production";
const cookieSameSite = process.env.COOKIE_SAME_SITE || (isProduction ? "none" : "lax");

if (!["lax", "strict", "none"].includes(cookieSameSite)) {
  throw new Error("COOKIE_SAME_SITE must be lax, strict, or none");
}

const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: cookieSameSite,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;   
   
  

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }  

    if(password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }     
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existingUser = await userModel.findOne({
      email
    })
              
    if(existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password : hashedPassword,
    });   
    
    if(!user) {
      return res.status(500).json({
        success: false,
        message: "User not created",
      });
    }    

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });   

   
    
  } catch (error) {
    console.log("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Register API error",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }     

    const user = await userModel.findOne({
       email : email
     })
   
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }   
    const tokan = jwt.sign( 
      { id: user._id },
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    )  

    res.cookie("tokan", tokan, authCookieOptions);
    
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    
  } catch (error) {
    console.log("login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login API error",
    });
  }
};  



export const getMe = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Get Me Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};  


export const updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const normalizedEmail = email.trim().toLowerCase();
    const emailOwner = await userModel.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
    if (emailOwner) return res.status(400).json({ success: false, message: "This email is already in use" });

    if (newPassword) {
      if (newPassword.length < 6) return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
      if (!currentPassword || !(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.name = name.trim();
    user.email = normalizedEmail;
    await user.save();
    return res.status(200).json({ success: true, message: "Profile updated successfully", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.log("Profile update error:", error.message);
    return res.status(500).json({ success: false, message: "Could not update profile" });
  }
};

export const logout = async (req, res) => {
  try {
    const { maxAge, ...clearCookieOptions } = authCookieOptions;
    res.clearCookie("tokan", clearCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
