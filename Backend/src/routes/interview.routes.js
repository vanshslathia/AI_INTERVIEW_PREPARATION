const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const interviewRouter=express.Router()
const upload=require("../middlewares/file.middleware")

/**
 * @route POST /api/interview/
 * @desc Generate interview report based on resume, self-description, and job description
 * @access Private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)

module.exports=interviewRouter