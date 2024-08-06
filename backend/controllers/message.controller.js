import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const sendMessage =async (req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let conversation =await Conversation.findOne({participants:{$all:[senderId,receiverId]}});
        if(!conversation){
           conversation = await Conversation.create({participants:[senderId,receiverId]});
        }
        const newMessage = await new Message({receiverId,senderId,message});
        

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(200).json({message});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getMessage = async (req,res)=>{
    try {
        const {id:userTochatId} = req.params;
        const senderId = req.user._id;
        const conversations = await Conversation.findOne({participants: {$all:[userTochatId,senderId]}}).populate("messages");
        if(!conversations) res.status(200).json([]);
        const messages = conversations.messages;
        res.status(200).json(messages);
    } catch (error) {
        res.status(200).json({message: error.message});
    }
}
