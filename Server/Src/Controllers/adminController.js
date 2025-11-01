import Dispute from "../Models/Dispute";
import Job from "../Models/Job";
import User from "../Models/User"


export const overview = async (req, res, next) => {
    try{
        const totalUsers = await User.countDocuments();
        const activeJobs = await Job.countDocuments({
            status: {
                $in: ['open', 'pending', 'assigned']
            }
        });
        const disputes = await Dispute.countDocuments({
            status: 'in-progress'
        });
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeJobs,
                disputes
            }
        })
    }catch(err){
        next(err);
    }
}

export const listUsers = async (req, res, next) => {
    try{
        const users = await User.find().limit(100).select('-password');
        res.status(200).json({
            success: true,
            data: {
                users
            }
        })
    }catch(err){
        next(err);
    }
}

export const listJobs = async (req, res, next) => {
    try{
        const jobs = await Job.find().limit(100).populate('employer', 'name email phone').populate('assignedLaborer', 'name email phone');
        res.status(200).json({
            success: true,
            data: {
                jobs
            }
        })
    }catch(err){
        next(err);
    }
}

export const listDisputes = async (req, res, next) => {
    try{
        const disputes = await Dispute.find().limit(100).populate('job').populate('raisedBy', 'name email phone').populate('mediator', 'name email phone');
        res.status(200).json({
            success: true,
            data: {
                disputes
            }
        })
    }catch(err){
        next(err);
    }
}

export const resolveDispute = async (req, res, next) => {
    try{
        const { disputeId } = req.params;
        const { resolutionNotes } = req.body;
        const dispute = await Dispute.findById(disputeId);
        if(!dispute){
            return res.status(404).json({
                success: false,
                message: 'Dispute not found'
            });
        }
        dispute.status = 'resolved';
        dispute.resolutionNotes = resolutionNotes;
        await dispute.save();
        res.status(200).json({
            success: true,
            message: 'Dispute resolved successfully',
            data: {
                dispute
            }
        })
    }catch(err){
        next(err);
    }
}

export const blockUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        };
        user.isBlocked = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User blocked successfully',
            data: {
                user
            }
        })
    }catch(err){
        next(err);
    }
}

export const unblockUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        };
        user.isBlocked = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User unblocked successfully',
            data: {
                user
            }
        })
    }catch(err){
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        };
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    }catch(err){
        next(err);
    }
}

export const deleteJob = async (req, res, next) => {
    try{
        const job = await Job.findById(req.params.jobId);
        if(!job){
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            })
        }
        await Job.findByIdAndDelete(req.params.jobId);
        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        })
    }catch(err){
        next(err);
    }
}

export const deleteDispute = async (req, res, next) => {
    try{
        const dispute = await Dispute.findById(req.params.disputeId);
        if(!dispute){
            return res.status(404).json({
                success: false,
                message: 'Dispute not found'
            })
        }
        await Dispute.findByIdAndDelete(req.params.disputeId);
        res.status(200).json({
            success: true,
            message: 'Dispute deleted successfully'
        })
    }catch(err){
        next(err);
    }
}

export const assignMediator = async (req, res, next) => {
    try{
        const { disputeId } = req.params;
        const { mediatorId } = req.body;
        const dispute = await Dispute.findById(disputeId);
        if(!dispute){
            return res.status(404).json({
                success: false,
                message: 'Dispute not found'
            });
        }
        const mediator = await User.findById(mediatorId);
        if(!mediator){
            return res.status(404).json({
                success: false,
                message: 'Mediator not found'
            });
        }
        dispute.mediator = mediatorId;
        await dispute.save();
        res.status(200).json({
            success: true,
            message: 'Mediator assigned successfully',
            data: {
                dispute
            }
        })
    }catch(err){
        next(err);
    }
}

export const verifyUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not Found"                
            })
        }
        user.verified = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User verified successfully',
            data: {
                user
            }
        })
    }catch(err){
        next(err);
    }
}

