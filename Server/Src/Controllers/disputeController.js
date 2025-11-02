import Job from "../Models/Job.js";
import User from "../Models/User.js";
import Dispute from "../Models/Dispute.js";
export const createDispute = async (req, res, next) => {
    try{
        const { jobId, issue } = req.body;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            })
        }
        const uid = String(req.user._id);
        if(String(job.employer) !== uid && String(job.assignedLaborer) !== uid && !job.applicant.includes(req.user._id)){
            return res.status(403).json({
                success: false,
                message: 'Not participant'
            })
        }
        const mediator = await User.findOne({
            role: 'mediator',
            isBlocked: false
        }).sort({ activeCases: 1 });
        const dispute = new Dispute({
            job: jobId,
            raisedBy: req.user._id,
            mediator: mediator ? mediator._id: null,
            issue,
            status: mediator ? 'in-progress' : 'pending'
        });
        await dispute.save();
        if(mediator){
            mediator.activeCases += 1;
            await mediator.save();
        }
        res.json({
            success: true,
            data: dispute
        })
    }catch(err){
        next(err);
    }
}

export const getDispute = async (req, res, next) => {
    try{
        const dispute = await Dispute.findById(req.params.id).populate('job raised by mediator');
        if(!dispute){
            return res.statis(404).json({
                success: false,
                message: "Dispute not found"
            });
        }
        res.json({
            success: true,
            data: dispute
        });
    }catch(err){
        next(err);
    }
}

export const listDisputes = async (req, res, next) => {
    try{
        if(req.user.role === 'mediator'){
            const disputes = await Dispute.find({ mediator: req.user._id });
            return res.json({
                success: true,
                data: disputes
            })
        }
        const disputes = await Dispute.find();
        res.json({
            success: true,
            data: disputes
        })
    }catch(err){
        next(err);
    }
}

export const updateDispute = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { status, resolutionNotes } = req.body;
        const dispute = await Dispute.findById(id);
        if(!dispute){
            return res.status(404).json({
                success: false,
                message: 'Not found'
            })
        }
        if(status){
            dispute.status = status
        }
        if(resolutionNotes){
            dispute.resolutionNotes = resolutionNotes
        }
        if(status === 'resolved' && dispute.mediator){
            const med = await User.findById(dispute.mediator);
            if(med){
                med.activeCases = Math.max(0, med.activeCases - 1);
                await med.save();
            }
            await dispute.save();
            res.json({
                success: true,
                data: dispute
            })
        }
    }catch(err){
        next(err);
    }
}

