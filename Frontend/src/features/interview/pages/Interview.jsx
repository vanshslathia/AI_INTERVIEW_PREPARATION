import React, { useState } from 'react'
import "../style/interview.scss"

function Interview() {
  // Mock data - will be replaced with API call via hooks
  const interviewData = {
    _id: "6a0435f46a1b962e907554e0",
    matchScore: 92,
    technicalQuestions: [
      {
        question: "In your 'Cravoo' project, how did you implement live order tracking using Socket.io and how did you handle potential connection drops?",
        intention: "To assess the candidate's understanding of real-time communication and edge-case handling in web applications.",
        answer: "The candidate should explain the handshake process between the client and server, the use of rooms or namespaces for specific orders, and the implementation of reconnection logic or heartbeat mechanisms to handle socket disconnections."
      },
      {
        question: "Explain the difference between 'useEffect' and 'useLayoutEffect' in React, and provide a scenario from your Expense Tracker where one would be preferred over the other.",
        intention: "To test deep knowledge of React hooks and their impact on DOM rendering.",
        answer: "Explain that useEffect runs asynchronously after the render is committed to the screen, while useLayoutEffect runs synchronously after all DOM mutations."
      },
      {
        question: "How do you secure your Node.js/Express APIs, specifically regarding the Razorpay integration and user authentication?",
        intention: "To evaluate the candidate's awareness of web security and payment gateway safety.",
        answer: "Focus on using JWT for session management, hashing passwords with bcrypt, validating Razorpay signatures on the backend."
      }
    ],
    behaviouralQuestions: [
      {
        question: "Tell us about a time when you had to handle a difficult team member.",
        intention: "To assess interpersonal and conflict resolution skills.",
        answer: "Share a specific example demonstrating communication and problem-solving abilities."
      }
    ],
    skillGaps: [
      { skill: "redis", severity: "high" },
      { skill: "Message queue", severity: "medium" },
      { skill: "Event loop", severity: "high" },
      { skill: "TypeScript", severity: "low" }
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Advanced JavaScript & React Internals",
        tasks: [
          "Review Closures, Event Loop, and Prototypal Inheritance in JS.",
          "Practice React performance optimization techniques like memo, useMemo, and useCallback."
        ]
      },
      {
        day: 2,
        focus: "Node.js, Express, and API Design",
        tasks: [
          "Study Express middleware execution order and error-handling patterns.",
          "Review RESTful best practices (idempotency, status codes, versioning)."
        ]
      }
    ]
  }

  // State for navigation
  const [activeTab, setActiveTab] = useState('technical')
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#ef4444'
      case 'medium': return '#f97316'
      case 'low': return '#84cc16'
      default: return '#a0aec0'
    }
  }

  const renderContent = () => {
    let questions = []
    if (activeTab === 'technical') {
      questions = interviewData.technicalQuestions
    } else if (activeTab === 'behavioral') {
      questions = interviewData.behaviouralQuestions
    } else if (activeTab === 'roadmap') {
      return (
        <div className='roadmap-content'>
          <h3>Interview Preparation Roadmap</h3>
          {interviewData.preparationPlan.map((day, idx) => (
            <div key={idx} className='day-plan'>
              <h4>Day {day.day}: {day.focus}</h4>
              <ul>
                {day.tasks.map((task, taskIdx) => (
                  <li key={taskIdx}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className='questions-content'>
        {questions.map((q, idx) => (
          <div key={idx} className='question-card'>
            <div 
              className='question-header'
              onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
            >
              <div className='question-number'>Q{idx + 1}</div>
              <div className='question-text'>{q.question}</div>
              <span className='expand-icon'>{expandedQuestion === idx ? '▼' : '▶'}</span>
            </div>
            
            {expandedQuestion === idx && (
              <div className='question-details'>
                <div className='detail-section'>
                  <h5>Intention:</h5>
                  <p>{q.intention}</p>
                </div>
                <div className='detail-section'>
                  <h5>Suggested Answer:</h5>
                  <p>{q.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='interview-container'>
      {/* Left Sidebar - Navigation */}
      <aside className='sidebar-left'>
        <div className='sidebar-section'>
          <button 
            className={`nav-item ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            Technical questions
          </button>
          <button 
            className={`nav-item ${activeTab === 'behavioral' ? 'active' : ''}`}
            onClick={() => setActiveTab('behavioral')}
          >
            Behavioral questions
          </button>
          <button 
            className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            Road Map
          </button>
        </div>
      </aside>

      {/* Center - Main Content */}
      <main className='main-content'>
        <div className='content-header'>
          <h2>Interview Questions</h2>
          <span className='match-score'>Match Score: <strong>{interviewData.matchScore}%</strong></span>
        </div>
        {renderContent()}
      </main>

      {/* Right Sidebar - Skill Gaps */}
      <aside className='sidebar-right'>
        <div className='skill-gaps-section'>
          <h3 className='skill-gaps-title'>Skill Gaps</h3>
          <div className='skills-container'>
            {interviewData.skillGaps.map((gap, idx) => (
              <span 
                key={idx} 
                className='skill-tag'
                style={{ borderColor: getSeverityColor(gap.severity) }}
              >
                {gap.skill}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Interview