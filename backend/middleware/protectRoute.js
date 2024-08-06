import jwt from "jsonwebtoken"
import User from '../model/user.model.js'
const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({error:"you are not logged in"})
        }
        
        const decoded = jwt.verify(token,process.env.SECRET_CODE);
        if(!decoded){
            return res.status(401).json({error:"Invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password");
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({error:"you are not logged in"})
    }
}

export default protectRoute;