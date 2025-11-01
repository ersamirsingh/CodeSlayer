import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    wage: Number,
    skills: [String],
    employer: {
        type: mongoose.Schema.types.ObjectId, ref: 'User'
    },
    applicant: [{
        type: mongoose.Schema.types.ObjectId, ref: 'User'
    }],
    assignedLaborer: {
        type: mongoose.Schema.types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['open', 'pending', 'assigned', 'completed', 'cancelled'],
        default: 'open'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0,0]
        }
    }
}, {timestamps: true});

jobSchema.index({ location: "2dsphere" });

const Job = mongoose.model('Job', jobSchema);

export default Job;

