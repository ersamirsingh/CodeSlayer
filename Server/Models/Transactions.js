import mongoose  from "mongoose";

const transactionSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    laborer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: Number,
    status: {
        type: String,
        enum: ['pending', 'completed', 'released', ,'failed'],
        default: 'pending'
    },
    providerRef: String,
},{ timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;