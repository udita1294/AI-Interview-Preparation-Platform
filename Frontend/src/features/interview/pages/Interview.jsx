import { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams, useNavigate } from 'react-router'
import Button from '../../../components/Button'

/* ── Formatted SEVERITY CLASSES ── */
const SEVERITY_CLASSES = {
  high:   'text-[#ff4d4d] bg-[#ff4d4d]/10 border-[#ff4d4d]/25',
  medium: 'text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/25',
  low:    'text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/25',
}

const SCORE_RING_CLASSES = {
  high: 'border-[#3fb950] text-[#3fb950] shadow-[0_0_15px_rgba(63,185,80,0.3)]',
  mid:  'border-[#f5a623] text-[#f5a623] shadow-[0_0_15px_rgba(245,166,35,0.3)]',
  low:  'border-[#ff4d4d] text-[#ff4d4d] shadow-[0_0_15px_rgba(255,77,77,0.3)]',
}

const scoreKey = (score) => (score >= 80 ? 'high' : score >= 60 ? 'mid' : 'low')

/* ── Nav items ─────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    id: 'technical', label: 'Technical',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'behavioral', label: 'Behavioral',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'roadmap', label: 'Road Map',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
]

/* ── QuestionCard ───────────────────────────────────────────────────── */
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`bg-[#161618] border rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-[#ff4d4d]/40 shadow-lg shadow-black/40' : 'border-[#222] hover:border-[#ff4d4d]/20 hover:bg-[#1a1a1c]'}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-4 px-6 py-5 text-left bg-transparent border-0 cursor-pointer outline-none"
      >
        <span className="shrink-0 text-[11px] font-black text-[#ff4d4d] bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 rounded px-2 py-0.5 mt-0.5">
          Q{index + 1}
        </span>
        <p className="flex-1 text-[15px] text-[#eee] leading-relaxed font-semibold">{item.question}</p>
        <span className={`shrink-0 text-[#888] transition-transform duration-300 mt-0.5 ${open ? 'rotate-180 text-[#ff4d4d]' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-6 px-6 pb-6 pt-2 border-t border-[#222]/80 bg-[#121212]">
          <div className="flex flex-col gap-2 pt-4">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded w-fit text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20">
              Intention
            </span>
            <p className="text-[14px] text-[#aaa] leading-relaxed font-medium">{item.intention}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded w-fit text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20">
              Model Answer
            </span>
            <p className="text-[14px] text-[#aaa] leading-relaxed font-medium">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── RoadMapDay ─────────────────────────────────────────────────────── */
const RoadMapDay = ({ day }) => (
  <div className="roadmap-day flex flex-col gap-3 mb-8 pl-3">
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-black px-3 py-1 rounded bg-[#ff4d4d]/10 text-[#ff4d4d] border border-[#ff4d4d]/30 uppercase tracking-widest">
        Day {day.day}
      </span>
      <h3 className="text-[15px] font-bold text-white">{day.focus}</h3>
    </div>
    <ul className="flex flex-col gap-3 pl-4 mt-2">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-3 text-[14px] text-[#aaa] font-medium leading-relaxed">
          <span className="shrink-0 w-2 h-2 rounded-sm bg-[#ff4d4d]/70 mt-[0.4rem] rotate-45" />
          {task}
        </li>
      ))}
    </ul>
  </div>
)

/* ── Main Component ─────────────────────────────────────────────────── */
const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical')
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (interviewId) getReportById(interviewId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId])

  if (loading || !report) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-5 bg-transparent relative z-10 text-white font-sans">
        <div className="w-10 h-10 rounded-full border-2 border-[#ff4d4d] border-t-transparent animate-spin shadow-[0_0_15px_rgba(255,77,77,0.5)]" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-white font-bold tracking-wide">Loading your interview plan</p>
          <p className="text-[#888] text-sm font-medium">Hang tight...</p>
        </div>
      </div>
    )
  }

  const ringClass = SCORE_RING_CLASSES[scoreKey(report.matchScore)]
  const scoreLabel =
    report.matchScore >= 80 ? 'Strong match' :
    report.matchScore >= 60 ? 'Good match' : 'Needs work'

  return (
    <div className="h-screen w-full bg-transparent text-white flex flex-col p-4 md:p-6 lg:p-8 font-sans relative z-10">
      
      {/* ── Top Nav Header (Minimalistic inside app view) ── */}
      <header className="flex items-center justify-between mb-6 shrink-0 max-w-[1400px] mx-auto w-full">
         <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#ff4d4d] flex items-center justify-center shadow-lg shadow-[#ff4d4d]/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span className="font-extrabold text-xl text-white tracking-tight">IntervAI</span>
        </div>
      </header>

      <div className="flex flex-1 w-full max-w-[1400px] mx-auto bg-[#121212] border border-[#222]/80 rounded-2xl overflow-hidden shadow-2xl shadow-black min-h-0">

        {/* ── Left Nav ──────────────────────────────────────────── */}
        <nav className="hidden md:flex w-[260px] shrink-0 flex-col justify-between p-6 border-r border-[#222]/80 overflow-y-auto bg-[#0d0d0e]">
          <div className="flex flex-col gap-2">
            {/* Back to Home */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-3 w-full px-4 py-3 mb-4 rounded-xl text-sm font-bold text-[#888] bg-transparent border-0 cursor-pointer hover:bg-[#1a1a1c] hover:text-white transition-all duration-200"
            >
              <div className="w-6 h-6 rounded bg-[#222] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </div>
              Back to Home
            </button>

            <div className="h-px bg-[#222] mb-4 w-full" />

            <p className="text-[10px] font-black uppercase tracking-widest text-[#555] mb-2 px-2">
              Strategy Sections
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-bold border-0 cursor-pointer transition-all duration-200
                  ${activeNav === item.id
                    ? 'bg-[#ff4d4d]/10 text-[#ff4d4d] shadow-inner border border-[#ff4d4d]/10'
                    : 'bg-transparent text-[#888] hover:bg-[#1a1a1c] hover:text-white'
                  }`}
              >
                <span className={`shrink-0 ${activeNav === item.id ? 'text-[#ff4d4d]' : 'text-[#666]'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => getResumePdf(interviewId)}
            className="w-full gap-2 text-xs font-bold tracking-wide mt-6 !border-[#333] !py-3 !rounded-xl"
          >
            <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
          </svg>
            Extract AI Resume
          </Button>
        </nav>

        {/* ── Center Content ─────────────────────────────────────── */}
        <main className="flex-1 min-w-0 overflow-y-auto px-6 md:px-10 py-10 pb-20">
          
          {/* Content Header Banner */}
          <div className="mb-8 border-b border-[#222]/80 pb-6">
             <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Interview Strategy</h1>
             <p className="text-sm font-medium text-[#888]">Role target positioning based on your provided resume.</p>
          </div>

          {activeNav === 'technical' && (
            <section className="flex flex-col gap-6 w-full max-w-[800px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#161618] border border-[#333] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h2 className="text-xl font-black text-white">Technical Questions</h2>
                <span className="ml-auto text-xs font-bold text-[#ff4d4d] bg-[#ff4d4d]/10 border border-[#ff4d4d]/20 rounded-full px-3 py-1 uppercase tracking-wider">
                  {report.technicalQuestions.length} Items To Master
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'behavioral' && (
            <section className="flex flex-col gap-6 w-full max-w-[800px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#161618] border border-[#333] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-black text-white">Behavioral Alignment</h2>
                <span className="ml-auto text-xs font-bold text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-full px-3 py-1 uppercase tracking-wider">
                  {report.behavioralQuestions.length} Key Scenarios
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'roadmap' && (
            <section className="flex flex-col gap-6 w-full max-w-[800px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#161618] border border-[#333] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                </div>
                <h2 className="text-xl font-black text-white">Preparation Road Map</h2>
                <span className="ml-auto text-xs font-bold text-[#f5a623] bg-[#f5a623]/10 border border-[#f5a623]/20 rounded-full px-3 py-1 uppercase tracking-wider">
                  {report.preparationPlan.length}-Day Plan
                </span>
              </div>
              <div className="roadmap-list mt-6 ml-2">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}

          {/* Mobile tab bar — pinned at bottom of screen */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex gap-1 p-3 bg-[#121212]/95 backdrop-blur-md border-t border-[#222]">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex flex-col items-center justify-center gap-1.5 px-3 rounded-lg text-[10px] font-bold border-0 cursor-pointer text-[#666] hover:text-white transition-all hover:bg-[#1a1a1c]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`flex-1 flex flex-col justify-center items-center gap-1.5 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border-0 cursor-pointer transition-all
                  ${activeNav === item.id
                    ? 'bg-[#ff4d4d]/10 text-[#ff4d4d] border border-[#ff4d4d]/20 shadow-inner block'
                    : 'text-[#888] hover:text-white hover:bg-[#1a1a1c]'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </main>

        {/* ── Right Sidebar ──────────────────────────────────────── */}
        <aside className="hidden lg:flex w-[280px] shrink-0 flex-col gap-8 p-8 border-l border-[#222]/80 overflow-y-auto bg-[#0d0d0e]">

          {/* Match Score */}
          <div className="flex flex-col items-center gap-4 bg-[#161618] border border-[#2a2a2a] p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff4d4d]/5 blur-3xl rounded-full"></div>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#888] text-center w-full">
              Match Score
            </p>
            <div className={`w-32 h-32 rounded-full border-[6px] flex flex-col items-center justify-center bg-[#111] z-10 relative ${ringClass}`}>
              <span className="text-4xl font-black text-white leading-none tracking-tighter">{report.matchScore}</span>
              <span className="text-[11px] font-bold opacity-60 uppercase tracking-widest mt-1">Percent</span>
            </div>
            <p className={`text-[13px] font-bold text-center mt-2 px-3 py-1 bg-[#111] rounded-full border border-current/20 ${SCORE_RING_CLASSES[scoreKey(report.matchScore)].split(' ')[1]}`}>
              {scoreLabel}
            </p>
          </div>

          <div className="h-px bg-[#222] w-full" />

          {/* Skill Gaps */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#f5a623] rounded-full"></div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#aaa]">
                Identified Gaps
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${SEVERITY_CLASSES[gap.severity] ?? SEVERITY_CLASSES.low}`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Interview
