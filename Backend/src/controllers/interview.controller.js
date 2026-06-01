const mongoose = require("mongoose")
const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

const isDev = process.env.NODE_ENV !== "production"

function sendServerError(res, error, context) {
    console.error(`[interview.controller.js] ${context}:`, error)
    return res.status(500).json({
        message: "Internal server error",
        ...(isDev && {
            error: error.message,
            stack: error.stack,
        }),
    })
}

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        return sendServerError(res, error, "generateInterViewReportController")
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({ message: "Invalid interview report ID" })
        }

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (error) {
        return sendServerError(res, error, "getInterviewReportByIdController")
    }
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        return sendServerError(res, error, "getAllInterviewReportsController")
    }
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    console.log("Interview ID:", interviewReportId)

    try {
        if (!mongoose.Types.ObjectId.isValid(interviewReportId)) {
            return res.status(400).json({
                message: "Invalid interview report ID",
            })
        }

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id,
        })

        console.log("Interview found:", Boolean(interviewReport))

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found",
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        console.log("Generating PDF...")

        const pdfBuffer = await generateResumePdf({
            resume: resume || "",
            jobDescription: jobDescription || "",
            selfDescription: selfDescription || "",
        })

        if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
            throw new Error("PDF buffer was not generated")
        }

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="resume_${interviewReportId}.pdf"`,
        })

        return res.send(pdfBuffer)
    } catch (error) {
        console.error("[interview.controller.js] generateResumePdfController:", error)
        return res.status(500).json({
            message: "Failed to generate resume PDF",
            error: error.message,
            ...(isDev && { stack: error.stack }),
        })
    }
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
}
