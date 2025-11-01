import Job from '../Models/Job.js';

export const createJob = async (req, res, next) => {
    try{
        const { title, description, company, location } = req.body;
        if(!title || !description || !company || !location){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const job = new Job({
            title, description, wage, skills, 
            employer: req.user._id,
            location: {
                type: 'Point',
                coordinates: [location.lng, location.lat]
            }
        })
        await job.save();
        res.json({
            success: true,
            message: "Job Created",
            data: job
        })
    }catch(err){
        next(err);
    }
}

export const getJob = async (req, res, next) => {
    try{
        const job = await Job.findById(req.params.id).populate('employer assignedLaborer applicants');
        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }
        res.json({
            success: true,
            data: job
        })
    }catch(err){
        next(err);
    }
}

export const listJobs = async(req, res, next) => {
    try{
        const jobs = await Job.find().limit(100).populate('employer');
        res.json({
            success: true,
            data: jobs
        });
    }catch(err){
        next(err);
    }
}

export const nearbyJobs = async(req, res, next) => {
    try{
        const { lat, lng, maxDistance = 5000, skill } = req.query;
        if(!lat || !lng){
            return res.status(400).json({
                success: false,
                message: "latitude and longitude required."
            })
        }
        const pipeline = [
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    distanceField: "dist",
                    spherical: true,
                    maxDistance: parseInt(maxDistance)
                }
            },
            { $match: {
                status: 'open'
            }}
        ];
        if(skill) pipeline.push({ $match: { skills : skill }});
        const jobs = await Job.aggregate(pipeline);
        res.json({
            success: true,
            data: jobs
        })
    }catch(err){
        next(err)
    }
}

export const applyJobs = async (req, res, next) => {
    try{
        const job = await Job.find(req.params.id);
        if(!job){
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }
        if(job.applicants.includes(req.user._id)){
            return res.status(400).json({
                success: false,
                message: "Already Applied"
            })
        }
        job.applicants.push(req.user._id);
        await job.save();
        res.json({
            success: true,
            message: "applied",
            data: job
        });
    }catch(err){
        next(err);
    }
}

export const assignJob = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { labourId } = req.body;
        const job = await Job.findById(id);
        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        } 
        if(String(job.employer) !== String(req.user._id) && req.user.role !== 'admin'){
            return res.status(403).json({
                success: false,
                message: "Not Employer"
            });
        }
        job.assignedLaborer = labourId;
        job.status = 'assigned';
        await job.save();
        res.json({
            success: true,
            message: 'Assigned',
            data: job
        })
    }catch(err){
        next(err);
    }
}

export const completeJob = async (req, res, next) => {
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({
                success: false,
                message: "job not found"
            });
        }
        if(String(job.employer) !== String(req.user._id) && req.user.role !== 'admin'){
            return res.status(403).json({
                success: false,
                message: "only employer can complete"
            })
        }
        job.status = 'completed';
        await job.save();
        res.json({
            success: true,
            message: "Completed",
            data: job
        });
    }catch(err){
        next(err);
    }
}

export const myJobs = async(req, res, next) => {
    try{
        if(req.user.role == 'employer'){
            const jobs = await Job.find({ employer: req.user._id });
            return res.json({
                success: true,
                data: jobs
            })
        }else{
            const jobs = await Job.find({ $or: [{ assignedLaborer: req.user._id }, {applicants: req.user._id}] });
            return res.json({
                success: true,
                data: jobs
            });
        }
    }catch(err){
        next(err);
    }
}