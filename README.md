# 🚀 AI Interview Preparation Platform

A **Production-Ready Full Stack Gen AI Job Preparation Web Application** built using **React.js, Node.js, Express.js, MongoDB, JWT Authentication, Gemini AI, and Puppeteer**.

This platform helps users prepare for interviews intelligently by analyzing resumes, identifying skill gaps, generating AI-powered interview questions, and creating ATS-optimized resumes.

---

# ✨ Features

## 🔐 Authentication & Security
- User Registration & Login
- JWT-Based Authentication
- Secure Protected Routes
- Logout Functionality
- Token Blacklisting System
- Authentication Middleware

---

## 🤖 AI-Powered Interview Preparation
- Resume Upload & Parsing
- AI-Based Skill Extraction
- Job Description Analysis
- Skill Gap Detection
- Personalized Interview Questions
- AI-Generated Interview Reports

---

## 📄 ATS Resume Generator
- Generate ATS-Friendly Resume
- Dynamic PDF Resume Generation
- AI to PDF Pipeline using Puppeteer
- Download Resume as PDF

---

## 📊 Dashboard Features
- Recent Interview Reports
- Report History
- Report Details Page
- Rehydration Logic for Persistent State

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Context API
- Axios
- Tailwind CSS / CSS

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer

## AI & Automation
- Gemini API
- Puppeteer

---

# 📁 Project Structure

```bash
project-root/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── routes/
│   │
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ai-interview-prep.git
```

```bash
cd ai-interview-prep
```

---

# 🔧 Backend Setup

## Navigate to Backend Folder

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Create `.env` File

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

## Run Backend Server

```bash
npm run dev
```

---

# 💻 Frontend Setup

## Navigate to Frontend Folder

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

---

# 🌐 Environment Variables

## Backend `.env`

```env
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
```

---
# 🌐 Live Demo

### Frontend (Vercel)

🚀 https://ai-interview-preparation-navy.vercel.app/

### Backend API (Render)

⚙️ https://ai-interview-preparation-vpcf.onrender.com

### Demo Credentials (Optional)

```text
Email: demo@example.com
Password: demo123
```

> Note: The backend may take a few seconds to wake up on the first request because it is hosted on Render's free tier.
------------------

# 🔑 API Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/logout` | Logout User |
| GET | `/api/auth/me` | Get Logged In User |
| POST | `/api/interview/generate` | Generate AI Interview Report |
| GET | `/api/interview/all` | Get All Reports |
| GET | `/api/interview/:id` | Get Report By ID |
| POST | `/api/resume/generate` | Generate ATS Resume PDF |

---

# 🧠 AI Workflow

```text
Resume Upload
      ↓
Resume Parsing
      ↓
Skill Extraction
      ↓
Job Description Analysis
      ↓
Skill Gap Detection
      ↓
AI Interview Question Generation
      ↓
ATS Resume Generation
      ↓
PDF Creation using Puppeteer
```

---

# 🔒 Authentication Flow

```text
User Login/Register
        ↓
JWT Token Generated
        ↓
Token Stored in Cookies
        ↓
Protected Routes Access
        ↓
Logout → Token Blacklisted
```

---

# 📸 Application Screens

- Login Page
- Register Page
- Dashboard
- Resume Upload
- Interview Report Page
- ATS Resume Generator

---

# 🚀 Deployment

## Frontend Deployment
- Vercel
- Netlify

## Backend Deployment
- Render
- Railway
- VPS

## Database
- MongoDB Atlas

---

# 🧪 Testing

Use:
- Postman
- Thunder Client

For API testing.

---


# 🎯 Future Improvements

- Mock Interview Feature
- Voice-Based AI Interviews
- Real-Time AI Feedback
- Interview Analytics Dashboard
- Resume Scoring System
- Multi-Language Support

---

# 👨‍💻 Author

**vansh slathia**

Built with ❤️ using MERN + Gen AI.

---

# ⭐ Support

If you like this project:

- 🌟 Star the repository
- 🍴 Fork the project
- 🛠️ Contribute to the project

---

# 📜 License

This project is licensed under the MIT License.

---


# 🔥 Final Output

A complete **Production-Ready Gen AI Interview Preparation Platform** that demonstrates:

✅ Full Stack Development  
✅ Authentication & Security  
✅ AI Integration  
✅ PDF Generation  
✅ Real-World Project Structure  
✅ MERN Stack Best Practices  

---
