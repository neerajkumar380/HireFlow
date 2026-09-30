import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "scheduled"],
    default: "pending"
    },
    interviewDate: {
        type: Date
    },
    meetingLink: {
        type: String
    },
    interviewNotes: {
        type: String
    }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);