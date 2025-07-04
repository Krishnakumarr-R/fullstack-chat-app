import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next)=>{
    const token = req.cookies.jwt;

   try {
     if(!token){
        return res.status(401).json({message:"Unathorized - No token Provided"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    if(!decoded){
        return res.status(401).json({message:"Unathorized - Invalid token"})
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    req.user = user

    next();

   } catch (error) {
      console.log("error in protectRouter middleware",error.message)
    res.status(500).json({message:"Internal server error"})
   }
}