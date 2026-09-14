import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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

    res.cookie("tokan", tokan, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge:7*24*60*60*1000
    }) 
    
    return res.status(200).json({
      success: true,
      message: "Login successful",
      tokam : tokan,
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