import express from "express";
import { register, login, getMe, logout, updateProfile } from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router(); 

router.post("/signup", register);
router.post("/login", login);  

router.get("/protected-test", protect, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Authentication successful",
    user: req.user,
  });
});  

router.get("/me", protect, getMe);
router.patch("/profile", protect, updateProfile);
router.post("/logout", logout);

 
export default router;
