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
    const resumeFile = resumeInputRef.current?.files?.[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    if (data?._id) navigate(`/interview/${data._id}`)
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
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-5 bg-transparent">
        <div className="w-10 h-10 rounded-full border-2 border-[#ff4d4d] border-t-transparent animate-spin" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-white font-semibold">Generating your interview strategy</p>
          <p className="text-[#888] text-sm">This usually takes about 30 seconds...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col relative font-sans">
      
      {/* ── Top Nav Header ── */}
      <nav className="w-full flex items-center px-6 py-4 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#ff4d4d] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span className="font-bold text-lg text-white tracking-wide">IntervAI</span>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center px-4 pt-32 pb-12 gap-10">
        {/* ── Page Header ── */}
        <header className="flex flex-col items-center gap-5 text-center w-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.15] tracking-tight">
            Create Your Custom <span className="text-[#ff4d4d]">Interview Plan</span>
          </h1>
          <p className="text-[#888] text-base md:text-lg leading-relaxed max-w-lg">
            Let our AI analyze the job requirements and your unique profile to build a winning strategy
          </p>
        </header>

        {/* ── Main Card ── */}
        <div className="w-full max-w-[1000px] bg-[#121212] border border-[#222]/80 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 mt-4">
          {/* Card Body — side-by-side on lg+, stacked on mobile */}
          <div className="flex flex-col lg:flex-row lg:items-stretch">

            {/* Left Panel — Job Description */}
            <div className="flex flex-col gap-4 p-8 lg:w-1/2">
              {/* Panel heading */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#222] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </div>
                  <h2 className="text-sm font-bold text-white tracking-wide">Target Job Description</h2>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center bg-[#25151a] text-[#ff4d4d] border border-[#ff4d4d]/40">
                  Required
                </span>
              </div>

              {/* Textarea */}
              <textarea
                onChange={handleJobDescChange}
                value={jobDescription}
                style={{ height: '360px' }}
                className="w-full bg-[#161618] border border-[#222] rounded-xl px-4 py-4 text-sm text-[#ddd] placeholder:text-[#555] outline-none resize-none transition-colors focus:border-[#ff4d4d]/50 focus:bg-[#1a1a1c] leading-relaxed shadow-inner"
                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires React,\nTypeScript, and system design...'`}
                maxLength={5000}
              />
              <div className="text-xs text-[#555] text-right mt-1 font-medium">{charCount} / 5000</div>
            </div>

            {/* Vertical divider (desktop) */}
            <div className="hidden lg:block w-px bg-[#222] self-stretch max-h-full my-8" />
            {/* Horizontal divider (mobile) */}
            <div className="lg:hidden h-px bg-[#222] mx-8" />

            {/* Right Panel — Profile */}
            <div className="flex flex-col p-8 lg:w-1/2 justify-between">
              
              <div className="flex flex-col gap-6">
                {/* Panel heading */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#222] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-bold text-white tracking-wide">Your Profile</h2>
                </div>

                {/* Upload Resume */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#888] tracking-wide">Upload Resume</span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#132c1b] text-[#3fb950] border border-[#3fb950]/40">
                      Best Results
                    </span>
                  </div>
                  <label
                    htmlFor="resume"
                    className={`flex flex-col items-center justify-center gap-3 h-32 rounded-xl cursor-pointer border-[1.5px] border-dashed transition-all duration-200
                      ${fileName
                        ? 'border-[#3fb950]/50 bg-[#3fb950]/5'
                        : 'border-[#333] bg-[#161618] hover:border-[#ff4d4d]/50 hover:bg-[#ff4d4d]/5'
                      }`}
                  >
                    {fileName ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#3fb950]/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-[#3fb950] text-center truncate max-w-[200px]">{fileName}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-white tracking-wide">Click to upload or drag &amp; drop</p>
                        <p className="text-[10px] font-medium text-[#555] uppercase tracking-wider">PDF or DOCX - Max 5MB</p>
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
                <div className="flex flex-row items-center gap-3">
                  <div className="flex-1 h-px bg-[#222]" />
                  <span className="text-[10px] font-black text-[#555] uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-[#222]" />
                </div>

                {/* Quick Self-Description */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="selfDescription" className="text-xs font-semibold text-[#888] tracking-wide">
                    Quick Self-Description
                  </label>
                  <textarea
                    onChange={(e) => setSelfDescription(e.target.value)}
                    id="selfDescription"
                    name="selfDescription"
                    style={{ height: '90px' }}
                    className="w-full bg-[#161618] border border-[#222] rounded-xl px-4 py-3 text-sm text-[#ddd] placeholder:text-[#555] outline-none resize-none transition-colors focus:border-[#ff4d4d]/50 focus:bg-[#1a1a1c] leading-relaxed shadow-inner"
                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  />
                </div>
              </div>

              {/* Info box */}
              <div className="flex gap-3 px-4 py-3 rounded-lg bg-[#0d1627] border border-[#1b2a4a] mt-6 items-center">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5b8dd9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p className="text-[11px] text-[#888] font-medium">
                  Either a <strong className="text-[#ccc] font-bold">Resume</strong> or a{' '}
                  <strong className="text-[#ccc] font-bold">Self-Description</strong> is required.
                </p>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-[#18181a] border-t border-[#222]/80">
            <span className="text-xs text-[#666] flex items-center gap-2 font-medium tracking-wide">
              @ AI-Powered - Approx 30s
            </span>
            <Button onClick={handleGenerateReport} className="py-3 px-6 !rounded-xl !text-xs !tracking-wide color-[#ff4d4d]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Generate My Interview Strategy
            </Button>
          </div>
        </div>

        {/* ── Page Footer indicator ── */}
        <p className="text-xs text-[#444] font-medium tracking-wide mt-10">
          No reports yet &bull; Generate your first interview strategy above
        </p>

        {/* ── Recent Reports ── */}
        {reports.length > 0 && (
          <section className="w-full max-w-[1000px] flex flex-col gap-6 mt-12 mb-20">
            <h2 className="text-lg font-bold text-white tracking-wide border-b border-[#222] pb-4">My Recent Interview Plans</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <li
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group flex flex-col gap-3 p-5 bg-[#121212] border border-[#333] rounded-xl cursor-pointer transition-all duration-300 hover:border-[#ff4d4d]/50 hover:bg-[#1a1a1c] hover:-translate-y-1 hover:shadow-xl shadow-black"
                >
                  <h3 className="text-sm font-bold text-white transition-colors line-clamp-2 leading-snug">
                    {report.title || 'Untitled Position'}
                  </h3>
                  <p className="text-[11px] font-medium text-[#777] uppercase tracking-wider">
                    {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <div className="mt-auto pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#888] uppercase tracking-wider">Match Score</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded bg-black/50 border border-current/20 ${scoreClass(report.matchScore)}`}>
                      {report.matchScore}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

export default Home
