import React from 'react'

const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const getFileExtension = (name = '') => {
    return name.split('.').pop()?.toLowerCase() || 'pdf'
}

const PdfIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 13h1.5M9 17h1.5M14 13h2.5M14 17h2.5" />
    </svg>
)

const DocxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
)

const ResumeUpload = ({
    inputRef,
    selectedFile,
    onFileChange,
    onFileRemove,
    inputId = 'resume',
}) => {
    const isDocx = selectedFile && getFileExtension(selectedFile.name) === 'docx'

    const assignFileToInput = (file) => {
        if (!inputRef.current || !file) return
        const transfer = new DataTransfer()
        transfer.items.add(file)
        inputRef.current.files = transfer.files
    }

    const handleInputChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) {
            onFileChange(null)
            return
        }
        const ext = getFileExtension(file.name)
        if (ext !== 'pdf' && ext !== 'docx') {
            e.target.value = ''
            onFileChange(null)
            return
        }
        onFileChange(file)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files?.[0]
        if (!file) return
        const ext = getFileExtension(file.name)
        if (ext !== 'pdf' && ext !== 'docx') return
        assignFileToInput(file)
        onFileChange(file)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleRemove = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        onFileRemove()
    }

    const handleChangeFile = (e) => {
        e.preventDefault()
        inputRef.current?.click()
    }

    return (
        <div className="upload-section">
            <label className="section-label" htmlFor={!selectedFile ? inputId : undefined}>
                Upload Resume
                <span className="badge badge--best">Best Results</span>
            </label>

            <input
                ref={inputRef}
                hidden
                type="file"
                id={inputId}
                name="resume"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleInputChange}
            />

            {!selectedFile ? (
                <label
                    className="dropzone"
                    htmlFor={inputId}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <span className="dropzone__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="16 16 12 12 8 16" />
                            <line x1="12" y1="12" x2="12" y2="21" />
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                        </svg>
                    </span>
                    <p className="dropzone__title">Click to upload or drag &amp; drop</p>
                    <p className="dropzone__subtitle">PDF or DOCX (Max 5MB)</p>
                </label>
            ) : (
                <div
                    className="file-preview-card"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    role="status"
                    aria-live="polite"
                >
                    <div className="file-preview-card__main">
                        <span className={`file-preview-card__type-icon ${isDocx ? 'file-preview-card__type-icon--docx' : 'file-preview-card__type-icon--pdf'}`}>
                            {isDocx ? <DocxIcon /> : <PdfIcon />}
                        </span>
                        <div className="file-preview-card__details">
                            <p className="file-preview-card__name" title={selectedFile.name}>
                                {selectedFile.name}
                            </p>
                            <p className="file-preview-card__success">
                                <span className="file-preview-card__check" aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                                Uploaded Successfully
                            </p>
                            <p className="file-preview-card__size">
                                Size: {formatFileSize(selectedFile.size)}
                            </p>
                        </div>
                    </div>
                    <div className="file-preview-card__actions">
                        <button
                            type="button"
                            className="file-preview-card__btn file-preview-card__btn--primary"
                            onClick={handleChangeFile}
                        >
                            Change File
                        </button>
                        <button
                            type="button"
                            className="file-preview-card__btn file-preview-card__btn--ghost"
                            onClick={handleRemove}
                        >
                            Remove File
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResumeUpload
