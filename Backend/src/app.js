const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://ai-interview-preparation-navy.vercel.app",
]

if (process.env.FRONTEND_URL) {
    process.env.FRONTEND_URL.split(",").map((o) => o.trim()).filter(Boolean).forEach((origin) => {
        if (!allowedOrigins.includes(origin)) {
            allowedOrigins.push(origin)
        }
    })
}

app.use(cors({
    origin(origin, callback) {
        // Allow non-browser tools (no Origin header) and whitelisted frontends
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error(`CORS blocked for origin: ${origin}`))
        }
    },
    credentials: true,
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "AI Interview Preparation Backend is running"
    });
});

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error("[app.js] Unhandled error:", err)
    const isDev = process.env.NODE_ENV !== "production"
    res.status(500).json({
        message: "Internal server error",
        ...(isDev && { error: err.message }),
    })
})

module.exports = app