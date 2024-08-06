
import User from '../model/user.model.js'
import generateTokenAndSetCookie from '../utils/gnerateToken.js'
import bcrypt from "bcryptjs";

export const login =async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username:username})
        const isPassword = await bcrypt.compare(password,user?.password || "");
        if(!user || !isPassword){
            res.status(400).json({error:"Invalid credentials"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({userID: user._id,username:username,fullname:user.fullname});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    


}

export const logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"successfully logged out"})
    } catch (error) {
        
    }
}
export const signup =async (req,res)=>{
    try {
        const {fullname,username,password,confirmPassword,gender} = req.body;

        if(password!== confirmPassword){
           return res.status(400).json({error:"password doesnt match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already Exist"});
        }
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullname,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic

        })
       if(newUser){
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();
        res.status(201).json({
            _id:newUser.id,
            fullname:newUser.fullname,
            ProfilePic:newUser.profilePic,
        })
       }
       else{
        return res.status(400).json({error:"Invalid UserData"});
       }

    } catch (error) {
        
        return res.status(500).json({error:error.message});
    }
    
}