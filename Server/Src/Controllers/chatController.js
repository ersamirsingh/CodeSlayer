import Job from "../Models/Job.js";
import Chat from "../Models/Chat.js"
// import { v4: uuidv4 } from 'uuid';
export const startChat = async (req, res, next) => {
    try{
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            })
        }
        const roomId = `job_${jobId}`;
        let chat = await Chat.findOne({ roomId });
        if(!chat){
            chat = new Chat({
                roomId,
                job: jobId,
                participants: [job.employer, job.assignedLaborer].filter(Boolean)
            });
            await chat.save();
        }
        res.json({
            success: true,
            data: Chat
        });
    }catch(err){
        next(err);
    }
}

export const getMessages = async (req, res, next) => {
    try{
        const { roomId } = req.params;
        const chat = await Chat.findOne({ roomId }).populate('message.sender', 'name role');
        if(!chat){
            return res.status(404).json({
                success: false,
                message: "No chat"
            });
        }
        res.json({
            success: true,
            data: chat.messages
        });
    }catch(err){
        next(err);
    }
}

export const sendMessageREST = async (req, res, next) => {
    try{
        const { roomId } = req.params;
        const { text } = req.body;
        const chat = await Chat.findOne({ roomId });
        if(!chat){
            return res.status(404).json({
                success: false,
                message: 'No chat'
            });
        }
        chat.messages.push({
            sender: req.user._id,
            text
        });
        await chat.save();
        res.json({
            success: true,
            data: chat.messages
        });
    }catch(err){
        next(err);
    }
}
