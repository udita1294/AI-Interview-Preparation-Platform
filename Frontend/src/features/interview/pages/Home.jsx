import { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Button from '../../../components/Button'

/* ── Score color map (full class strings so Tailwind doesn't purge) ── */
const SCORE_COLORS = {
  high: 'text-[#3fb950]',
  mid:  'text-[#f5a623]',
  low:  'text-[#ff4d4d]',
}
const scoreClass = (score) =>
  score >= 80 ? SCORE_COLORS.high : score >= 60 ? SCORE_COLORS.mid : SCORE_COLORS.low

const Home = () => {
  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription]   = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [charCount, setCharCount]             = useState(0)
  const [fileName, setFileName]               = useState('')
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    navigate(`/interview/${data._id}`)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFileName(file ? file.name : '')
  }

  const handleJobDescChange = (e) => {
    setJobDescription(e.target.value)
    setCharCount(e.target.value.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-5 bg-[#0d1117]">
        <div className="w-10 h-10 rounded-full border-2 border-[#ff2d78] border-t-transparent animate-spin" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-text font-semibold">Generating your interview strategy</p>
          <p className="text-muted text-sm">This usually takes about 30 seconds...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-page text-[#e6edf3] flex flex-col items-center px-4 py-12 gap-10">

      {/* ── Page Header ── */}
      <header className="flex flex-col items-center gap-3 text-center w-full max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2d78]/10 border border-[#ff2d78]/20 text-[#ff2d78] text-xs font-semibold uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          AI-Powered
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] leading-tight">
          Create Your Custom{' '}
          <span className="text-[#ff2d78]">Interview Plan</span>
        </h1>
        <p className="text-[#7d8590] text-base leading-relaxed">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </header>

      {/* ── Main Card ── */}
      <div className="w-full max-w-4xl bg-[#161b22] border border-[#2a3348] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">

        {/* Card Body — side-by-side on md+, stacked on mobile */}
        <div className="flex flex-col md:flex-row md:items-stretch">

          {/* Left Panel — Job Description */}
          <div className="flex flex-col gap-4 p-6 md:p-7 md:w-1/2">
            {/* Panel heading */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#1c2230] border border-[#2a3348] flex items-center justify-center text-[#ff2d78] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <h2 className="text-sm font-semibold text-[#e6edf3]">Target Job Description</h2>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ff2d78]/10 text-[#ff2d78] border border-[#ff2d78]/25">
                Required
              </span>
            </div>

            {/* Textarea — fixed height, no flex-1 tricks */}
            <textarea
              onChange={handleJobDescChange}
              value={jobDescription}
              style={{ height: '340px' }}
              className="w-full bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#4a5568] outline-none resize-none transition-colors focus:border-[#ff2d78] leading-relaxed"
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <div className="text-xs text-[#4a5568] text-right">{charCount} / 5000</div>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="hidden md:block w-px bg-[#2a3348] self-stretch" />
          {/* Horizontal divider (mobile) */}
          <div className="md:hidden h-px bg-[#2a3348]" />

          {/* Right Panel — Profile */}
          <div className="flex flex-col gap-4 p-6 md:p-7 md:w-1/2">
            {/* Panel heading */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#1c2230] border border-[#2a3348] flex items-center justify-center text-[#ff2d78] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h2 className="text-sm font-semibold text-[#e6edf3]">Your Profile</h2>
            </div>

            {/* Upload Resume */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#7d8590]">Upload Resume</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/25">
                  Best Results
                </span>
              </div>
              <label
                htmlFor="resume"
                className={`flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl cursor-pointer border-2 border-dashed transition-all duration-200
                  ${fileName
                    ? 'border-[#3fb950]/50 bg-[#3fb950]/5'
                    : 'border-[#2a3348] bg-[#1e2535] hover:border-[#ff2d78]/50 hover:bg-[#ff2d78]/5'
                  }`}
              >
                {fileName ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <p className="text-xs font-medium text-[#3fb950] text-center truncate max-w-[200px]">{fileName}</p>
                    <p className="text-[11px] text-[#7d8590]">Click to replace</p>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7d8590" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                    <p className="text-xs font-medium text-[#e6edf3]">Click to upload or drag &amp; drop</p>
                    <p className="text-[11px] text-[#7d8590]">PDF or DOCX &bull; Max 5MB</p>
                  </>
                )}
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#2a3348]" />
              <span className="text-[11px] font-semibold text-[#4a5568] uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-[#2a3348]" />
            </div>

            {/* Quick Self-Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="selfDescription" className="text-xs font-medium text-[#7d8590]">
                Quick Self-Description
              </label>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                name="selfDescription"
                style={{ height: '110px' }}
                className="w-full bg-[#1e2535] border border-[#2a3348] rounded-xl px-4 py-3 text-sm text-[#e6edf3] placeholder-[#4a5568] outline-none resize-none transition-colors focus:border-[#ff2d78] leading-relaxed"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            {/* Info box */}
            <div className="flex gap-2.5 p-3 rounded-lg bg-[#1b2a4a] border border-[#2d4a7a]">
              <svg className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#5b8dd9">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" />
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" />
              </svg>
              <p className="text-[11px] text-[#7d8590] leading-relaxed">
                Either a <strong className="text-[#e6edf3]">Resume</strong> or a{' '}
                <strong className="text-[#e6edf3]">Self Description</strong> is required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 md:px-7 py-4 bg-[#1c2230] border-t border-[#2a3348]">
          <span className="text-xs text-[#7d8590] flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>
          <Button onClick={handleGenerateReport}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Generate My Interview Strategy
          </Button>
        </div>
      </div>

      {/* ── Recent Reports ── */}
      {reports.length > 0 && (
        <section className="w-full max-w-4xl flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[#e6edf3]">My Recent Interview Plans</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reports.map((report) => (
              <li
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className="group flex flex-col gap-2 p-4 bg-[#161b22] border border-[#2a3348] rounded-xl cursor-pointer transition-all duration-200 hover:border-[#3d4d66] hover:bg-[#1c2230]"
              >
                <h3 className="text-sm font-semibold text-[#e6edf3] group-hover:text-white transition-colors line-clamp-2">
                  {report.title || 'Untitled Position'}
                </h3>
                <p className="text-xs text-[#7d8590]">
                  {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <p className={`text-xs font-bold mt-auto ${scoreClass(report.matchScore)}`}>
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Page Footer ── */}
      <footer className="flex items-center gap-6 pt-2 pb-4">
        {['Privacy Policy', 'Terms of Service', 'Help Center'].map((label) => (
          <a
            key={label}
            href="#"
            className="text-xs text-[#4a5568] hover:text-[#7d8590] transition-colors"
          >
            {label}
          </a>
        ))}
      </footer>
    </div>
  )
}

export default Home
