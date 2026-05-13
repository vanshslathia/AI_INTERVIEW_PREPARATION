//server start
require("dotenv").config()
const app=require("./src/app")
const connectToDB =require("./src/config/database")
// const {resume,selfDescription,jobDescription} = require("./src/services/temp")
// const {invokeGeminiAi} = require("./src/services/ai.service")
// const {generateInterviewReport} = require("./src/services/ai.service")
connectToDB()

// generateInterviewReport({resume,selfDescription,jobDescription})
//  invokeGeminiAi()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

