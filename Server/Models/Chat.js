import mongoose, { mongo }  from "mongoose";

const chatSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

