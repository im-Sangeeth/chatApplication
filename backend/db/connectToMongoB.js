import mongoose from "mongoose";

const connectToMongoDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONG0_DB_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error in connecting to DB",error.message);
    }
}
export default connectToMongoDB;