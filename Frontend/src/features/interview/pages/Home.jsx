import React, { useState } from 'react'
import "../style/home.scss"

function Home() {
  const MAX_JOB_DESC_CHARS = 5000
  
  // State Layer - managed by hooks (to be moved to custom hook)
  const [formData, setFormData] = useState({
    jobDescription: '',
    resume: null,
    selfDescription: ''
  })

  // UI Event Handlers (temporary - will be moved to hooks)
  const handleJobDescriptionChange = (e) => {
    const value = e.target.value
    if (value.length <= MAX_JOB_DESC_CHARS) {
      setFormData(prev => ({
        ...prev,
        jobDescription: value
      }))
    }
  }

  const handleResumeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }))
  }

  const handleSelfDescriptionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      selfDescription: e.target.value
    }))
  }

  const isValid = formData.jobDescription.trim() && (formData.resume || formData.selfDescription.trim())

  const handleGenerateStrategy = () => {
    if (!isValid) return
    // TODO: API call will be made here through hooks
    console.log('Form data:', formData)
  }

  return (
    <main className='home'>
      <div className='header-section'>
        <h1 className='main-title'>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
        <p className='subtitle'>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
      </div>

      <div className="interview-input-group">
        {/* Left Section - Target Job Description */}
        <div className='left'>
          <div className='section-header'>
            <span className='icon'>📋</span>
            <h2>Target Job Description</h2>
            <span className='badge required-badge'>REQUIRED</span>
          </div>

          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the full job description here...&#10;e.g., Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."
            value={formData.jobDescription}
            onChange={handleJobDescriptionChange}
            className='job-textarea'
          />
          <small className='char-count'>{formData.jobDescription.length} / {MAX_JOB_DESC_CHARS} chars</small>
        </div>

        {/* Right Section - Your Profile */}
        <div className='right'>
          {/* Resume Upload */}
          <div className='input-group resume-group'>
            <div className='group-header'>
              <h3>Upload Resume</h3>
              <span className='badge best-results-badge'>BEST RESULTS</span>
            </div>

            <label className='file-label' htmlFor="resume">
              <span className='upload-icon'>☁️</span>
              <div className='upload-text'>
                <p>Click to upload or drag & drop</p>
                <small>PDF or DOCX, Max 5MB</small>
              </div>
            </label>

            <input
              hidden
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />

            {formData.resume && (
              <p className='file-info'>✓ {formData.resume.name}</p>
            )}
          </div>

          {/* OR Divider */}
          <div className='divider'>
            <span className='divider-text'>OR</span>
          </div>

          {/* Self Description */}
          <div className='input-group'>
            <h3 className='section-title'>Quick Self-Description</h3>

            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              value={formData.selfDescription}
              onChange={handleSelfDescriptionChange}
              className='self-textarea'
            />
          </div>

          {/* Validation Message */}
          <div className={`validation-box ${isValid ? 'valid' : 'invalid'}`}>
            <span className='validation-icon'>ℹ️</span>
            <p>
              Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
            </p>
          </div>

          {/* Generate Button */}
          <button
            className={`button primary-button generate-btn ${isValid ? 'enabled' : 'disabled'}`}
            onClick={handleGenerateStrategy}
            disabled={!isValid}
          >
            <span className='btn-icon'>⭐</span>
            Generate My Interview Strategy
          </button>

          {/* Footer Info */}
          <p className='footer-info'>AI-Powered Strategy Generation • Approx 30s</p>
        </div>
      </div>
    </main>
  )
}

export default Home