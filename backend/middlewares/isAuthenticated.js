import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          message: "Authentication required",
          success: false
        });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.userId).select("-password");
      
      if (!user) {
        return res.status(401).json({
          message: "User not found",
          success: false
        });
      }
  
      req.user = user;
      req.id = decoded.userId;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({
        message: "Authentication failed",
        success: false,
        error: error.message
      });
    }
  };

export default isAuthenticated;