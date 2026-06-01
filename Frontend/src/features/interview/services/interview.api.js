import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

function assertResponseData(response, endpoint) {
    if (!response?.data) {
        throw new Error(`No response data received from ${endpoint}`)
    }
    return response.data
}

async function parseErrorBody(data) {
    if (!data) return null
    if (typeof data === "object" && !(data instanceof Blob)) {
        return data.error || data.message || null
    }
    if (data instanceof Blob) {
        try {
            const text = await data.text()
            const json = JSON.parse(text)
            return json.error || json.message || text
        } catch {
            return null
        }
    }
    return null
}

function logInterviewApiError(err, method, path) {
    const status = err.response?.status
    const baseURL = import.meta.env.VITE_API_URL || "(VITE_API_URL not set)"

    if (status === 401) {
        console.error(
            `[interview.api.js] ${method} ${path} → 401 Unauthorized\n` +
            `  baseURL: ${baseURL}\n` +
            `  Cause: Auth cookie missing or not sent. Login uses the same VITE_API_URL; ` +
            `withCredentials is enabled but cookies are host-specific (localhost ≠ Render).`
        )
    } else {
        console.error(`[interview.api.js] ${method} ${path} failed`, err)
    }
}

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    const path = "/api/interview/"

    try {
        const formData = new FormData()
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription)
        formData.append("resume", resumeFile)

        const response = await api.post(path, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return assertResponseData(response, path)
    } catch (err) {
        logInterviewApiError(err, "POST", path)
        throw err
    }
}


/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    const path = `/api/interview/report/${interviewId}`

    try {
        const response = await api.get(path)
        return assertResponseData(response, path)
    } catch (err) {
        logInterviewApiError(err, "GET", path)
        throw err
    }
}


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    const path = "/api/interview/"

    try {
        const response = await api.get(path)
        return assertResponseData(response, path)
    } catch (err) {
        logInterviewApiError(err, "GET", path)
        throw err
    }
}


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const path = `/api/interview/resume/pdf/${interviewReportId}`

    try {
        const response = await api.post(path, null, {
            responseType: "blob"
        })

        if (response.status !== 200 || !response.data) {
            throw new Error(`No PDF response from ${path}`)
        }

        if (response.data.type === "application/json") {
            const text = await response.data.text()
            const body = JSON.parse(text)
            throw new Error(body.error || body.message || "PDF generation failed")
        }

        return response.data
    } catch (err) {
        logInterviewApiError(err, "POST", path)
        const serverMsg = await parseErrorBody(err.response?.data)
        if (serverMsg) {
            throw new Error(serverMsg)
        }
        throw err
    }
}
