import Users from '../model/user.model.js';

export const getUsers=async (req,res)=>{
    try {
        const loggedInUser = req.user._id;
        const filteredusers = await Users.find({_id:{$ne:loggedInUser}}).select("-password");
        res.status(200).json(filteredusers);
    } catch (error) {
        
        res.status(200).json({message: error.message});
    }
}