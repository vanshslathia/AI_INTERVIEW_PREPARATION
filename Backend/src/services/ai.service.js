const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const PDFDocument = require("pdfkit")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

const resumePdfSchema = z.object({
    fullName: z.string().describe("Candidate full name"),
    headline: z.string().describe("Professional headline tailored to the job"),
    contact: z.object({
        email: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        linkedin: z.string().optional(),
    }).optional(),
    summary: z.string().describe("2-4 sentence professional summary tailored to the job"),
    experience: z.array(z.object({
        title: z.string(),
        company: z.string(),
        period: z.string(),
        bullets: z.array(z.string()),
    })).describe("Work experience entries"),
    education: z.array(z.object({
        degree: z.string(),
        school: z.string(),
        period: z.string().optional(),
    })).optional(),
    skills: z.array(z.string()).optional().describe("Key skills relevant to the job"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    return JSON.parse(response.text)
}

/**
 * Builds a PDF buffer with PDFKit (no headless browser — works on Render).
 */
function generatePdfFromResumeData(resumeData) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: "A4", margin: 48 })
            const chunks = []

            doc.on("data", (chunk) => chunks.push(chunk))
            doc.on("end", () => resolve(Buffer.concat(chunks)))
            doc.on("error", reject)

            const accent = "#6d28d9"

            doc.fontSize(22).fillColor(accent).font("Helvetica-Bold").text(resumeData.fullName || "Resume", {
                align: "left",
            })

            if (resumeData.headline) {
                doc.moveDown(0.25)
                doc.fontSize(11).fillColor("#334155").font("Helvetica").text(resumeData.headline)
            }

            const contact = resumeData.contact
            if (contact) {
                const line = [
                    contact.email,
                    contact.phone,
                    contact.location,
                    contact.linkedin,
                ].filter(Boolean).join("  •  ")

                if (line) {
                    doc.moveDown(0.35)
                    doc.fontSize(9).fillColor("#64748b").text(line)
                }
            }

            doc.moveDown(0.75)
            doc.moveTo(48, doc.y).lineTo(547, doc.y).strokeColor(accent).lineWidth(1).stroke()
            doc.moveDown(0.75)

            const section = (title) => {
                doc.moveDown(0.5)
                doc.fontSize(12).fillColor(accent).font("Helvetica-Bold").text(title.toUpperCase())
                doc.moveDown(0.35)
            }

            const body = (text, options = {}) => {
                doc.fontSize(10).fillColor("#0f172a").font("Helvetica").text(text, {
                    align: "justify",
                    lineGap: 3,
                    ...options,
                })
            }

            if (resumeData.summary) {
                section("Professional Summary")
                body(resumeData.summary)
            }

            if (resumeData.experience?.length) {
                section("Experience")
                resumeData.experience.forEach((exp) => {
                    doc.fontSize(11).font("Helvetica-Bold").fillColor("#0f172a")
                        .text(`${exp.title}  |  ${exp.company}`)
                    if (exp.period) {
                        doc.fontSize(9).font("Helvetica").fillColor("#64748b").text(exp.period)
                    }
                    doc.moveDown(0.2)
                    ;(exp.bullets || []).forEach((bullet) => {
                        body(`• ${bullet}`, { indent: 12 })
                    })
                    doc.moveDown(0.4)
                })
            }

            if (resumeData.education?.length) {
                section("Education")
                resumeData.education.forEach((edu) => {
                    doc.fontSize(10).font("Helvetica-Bold").fillColor("#0f172a")
                        .text(`${edu.degree} — ${edu.school}`)
                    if (edu.period) {
                        doc.fontSize(9).font("Helvetica").fillColor("#64748b").text(edu.period)
                    }
                    doc.moveDown(0.35)
                })
            }

            if (resumeData.skills?.length) {
                section("Skills")
                body(resumeData.skills.join("  •  "))
            }

            doc.end()
        } catch (err) {
            reject(err)
        }
    })
}

function buildFallbackResumeData({ resume, selfDescription, jobDescription }) {
    const sourceLines = (resume || selfDescription || "")
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 8)
        .slice(0, 6)

    const bullets = sourceLines.length > 0
        ? sourceLines
        : [ (jobDescription || "Experienced professional aligned with the target role.").slice(0, 220) ]

    return {
        fullName: "Candidate",
        headline: "Professional Resume",
        summary: (selfDescription || resume || jobDescription || "Professional profile summary.").slice(0, 700),
        experience: [
            {
                title: "Relevant Experience",
                company: "Career Background",
                period: "Recent",
                bullets,
            },
        ],
        skills: [],
    }
}

async function fetchResumeDataFromGemini({ resume, selfDescription, jobDescription }) {
    const prompt = `Create a tailored resume as structured JSON for this candidate applying to the job below.
Use only information from the resume text and self description; do not invent employers or degrees.

Resume text: ${resume || "(not provided)"}
Self description: ${selfDescription || "(not provided)"}
Job description: ${jobDescription || "(not provided)"}

Rules:
- ATS-friendly, professional, 1-2 pages worth of content when rendered as PDF
- Bullets should be achievement-focused and match the job
- Sound human-written, not generic AI phrasing
- fullName and at least one experience entry are required`

    console.log("[ai.service.js] Requesting structured resume from Gemini...")

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        },
    })

    if (!response?.text) {
        throw new Error("Gemini returned an empty response for resume data")
    }

    const resumeData = JSON.parse(response.text)

    if (!resumeData?.fullName) {
        resumeData.fullName = "Candidate"
    }
    if (!resumeData?.experience?.length) {
        throw new Error("Gemini resume response has no experience entries")
    }

    return resumeData
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    let resumeData

    if (process.env.GOOGLE_GENAI_API_KEY) {
        try {
            resumeData = await fetchResumeDataFromGemini({ resume, selfDescription, jobDescription })
        } catch (geminiError) {
            console.error("[ai.service.js] Gemini resume failed, using DB fallback:", geminiError.message)
            resumeData = buildFallbackResumeData({ resume, selfDescription, jobDescription })
        }
    } else {
        console.warn("[ai.service.js] GOOGLE_GENAI_API_KEY missing — using DB fallback PDF")
        resumeData = buildFallbackResumeData({ resume, selfDescription, jobDescription })
    }

    console.log("[ai.service.js] Building PDF with PDFKit...")
    const pdfBuffer = await generatePdfFromResumeData(resumeData)

    if (!pdfBuffer?.length) {
        throw new Error("PDFKit returned an empty PDF buffer")
    }

    console.log("[ai.service.js] PDF generated, size:", pdfBuffer.length, "bytes")
    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }
