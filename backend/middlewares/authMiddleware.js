import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: "Not authorized, no token",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        next();
    } catch (error) {
        console.error("Protect middleware error:", error);
        res.status(401).json({ 
            message: "Token verification failed",
            success: false,
            error: error.message
        });
    }
};


export const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access denied" });
    }
};