const mongoose = require('mongoose');

/**
 * -job description schema
 * -resume text
 * -self description
 * 
 * --matchScore:Number
 * 
 * Techincal questions :[{
 * question:" ",
 * intention:" ",
 * answer:" ",
 * }]
 * 
 * Behavioural questions:[
 * {
 * question:" ",
 * intention:" ",
 * answer:" ",
 * }]
 * skill gaps:[{
 * skill:" ",
 * severity:{
 * type:String,
 * enum:["low","medium","high"]}
 * }]
 * 
 * preparation plan:[{
 * day:Number,
 * focus:String,
 * tasks:[String]
 * }]
 * overall feedback
 */


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }

}, { _id: false });

const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [String]
}, { _id: false });


const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resumeText: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },

    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
}, { timestamps: true });

const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = InterviewReport;