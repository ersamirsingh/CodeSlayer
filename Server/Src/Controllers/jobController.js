import Job from '../Models/Job.js';

export const createJob = async (req, res, next) => {
    try{
        const {
            title,
            description,
            category = 'General',
            employmentType = 'Full-time',
            locationText,
            salaryMin,
            salaryMax,
            payFrequency = 'Daily',
            skills = [],
            experienceLevel = 'Entry Level',
            coordinates
        } = req.body;

        const trimmedTitle = title?.trim();
        const trimmedDescription = description?.trim();
        const trimmedLocation = locationText?.trim();
        const parsedSkills = Array.isArray(skills) ? skills.filter(Boolean) : [];
        const parsedSalaryMin = salaryMin !== undefined && salaryMin !== null && salaryMin !== '' ? Number(salaryMin) : undefined;
        const parsedSalaryMax = salaryMax !== undefined && salaryMax !== null && salaryMax !== '' ? Number(salaryMax) : undefined;

        if(!trimmedTitle || !trimmedDescription || !trimmedLocation){
            return res.status(400).json({
                success: false,
                message: "Title, description and location are required"
            });
        }

        if(parsedSkills.length === 0){
            return res.status(400).json({
                success: false,
                message: "Please provide at least one skill"
            });
        }

        if(
            parsedSalaryMin !== undefined &&
            parsedSalaryMax !== undefined &&
            parsedSalaryMin > parsedSalaryMax
        ){
            return res.status(400).json({
                success: false,
                message: "Maximum salary must be greater than minimum salary"
            });
        }

        const job = new Job({
            title: trimmedTitle,
            description: trimmedDescription,
            category,
            employmentType,
            salaryMin: parsedSalaryMin,
            salaryMax: parsedSalaryMax,
            payFrequency,
            wage: parsedSalaryMax ?? parsedSalaryMin,
            skills: parsedSkills,
            experienceLevel,
            locationText: trimmedLocation,
            employer: req.user?._id
        });

        if(coordinates?.lat !== undefined && coordinates?.lng !== undefined){
            const lat = Number(coordinates.lat);
            const lng = Number(coordinates.lng);
            if(Number.isFinite(lat) && Number.isFinite(lng)){
                job.location = {
                    type: 'Point',
                    coordinates: [lng, lat]
                };
            }
        }

        await job.save();
        res.json({
            success: true,
            message: "Job Created",
            data: job
        });
    }catch(err){
        next(err);
    }
}

export const getJob = async (req, res, next) => {
    try{
        const job = await Job.findById(req.params.id)
            .populate('employer', 'firstName contact emailId role')
            .populate('assignedLaborer', 'firstName contact')
            .populate('applications.applicant', 'firstName contact emailId role');

        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const canViewApplicants = !!(req.user && job.employer && String(job.employer._id || job.employer) === String(req.user._id));
        const jobObj = job.toObject({ depopulate: false });
        const applicantCount = jobObj.applications?.length || 0;

        let hasApplied = false;
        if(req.user){
            hasApplied = jobObj.applications?.some(app => String(app.applicant?._id || app.applicant) === String(req.user._id)) || false;
        }

        if(!canViewApplicants){
            delete jobObj.applications;
        }

        res.json({
            success: true,
            data: {
                job: jobObj,
                canViewApplicants,
                hasApplied,
                applicantCount
            }
        });
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
        const { id } = req.params;
        const {
            fullName,
            contactNumber,
            experience,
            message
        } = req.body;

        const job = await Job.findById(id);

        if(!job){
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        if(String(job.employer) === String(req.user._id)){
            return res.status(400).json({
                success: false,
                message: "Employers cannot apply to their own job"
            });
        }

        const trimmedName = fullName?.trim();
        const trimmedContact = contactNumber?.toString().trim();
        const trimmedExperience = experience?.trim();
        const trimmedMessage = message?.trim();

        if(!trimmedName || !trimmedContact){
            return res.status(400).json({
                success: false,
                message: "Name and contact number are required"
            });
        }

        const alreadyApplied = job.applications?.some(app => String(app.applicant) === String(req.user._id));
        if(alreadyApplied){
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        job.applications.push({
            applicant: req.user._id,
            fullName: trimmedName,
            contactNumber: trimmedContact,
            experience: trimmedExperience,
            message: trimmedMessage
        });

        if(Array.isArray(job.applicants)){
            const exists = job.applicants.some(id => String(id) === String(req.user._id));
            if(!exists){
                job.applicants.push(req.user._id);
            }
        }else{
            job.applicants = [req.user._id];
        }

        await job.save();
        res.json({
            success: true,
            message: "Application submitted successfully"
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