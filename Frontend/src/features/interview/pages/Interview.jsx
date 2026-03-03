import { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams, useNavigate } from 'react-router'
import Button from '../../../components/Button'

/* ── Design-token class maps (full strings so Tailwind never purges) ── */
const SEVERITY_CLASSES = {
  high:   'text-[#ff4d4d] bg-[#ff4d4d]/10 border-[#ff4d4d]/25',
  medium: 'text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/25',
  low:    'text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/25',
}

const SCORE_RING_CLASSES = {
  high: 'border-[#3fb950] text-[#3fb950]',
  mid:  'border-[#f5a623] text-[#f5a623]',
  low:  'border-[#ff4d4d] text-[#ff4d4d]',
}

const scoreKey = (score) => (score >= 80 ? 'high' : score >= 60 ? 'mid' : 'low')

/* ── Nav items ─────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    id: 'technical', label: 'Technical',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'behavioral', label: 'Behavioral',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'roadmap', label: 'Road Map',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
]

/* ── QuestionCard ───────────────────────────────────────────────────── */
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`bg-[#1c2230] border rounded-xl overflow-hidden transition-colors duration-200 ${open ? 'border-[#3d4d66]' : 'border-[#2a3348] hover:border-[#3d4d66]'}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 px-5 py-4 text-left bg-transparent border-0 cursor-pointer"
      >
        <span className="shrink-0 text-[11px] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/20 rounded px-1.5 py-0.5 mt-0.5">
          Q{index + 1}
        </span>
        <p className="flex-1 text-sm text-[#e6edf3] leading-relaxed font-medium">{item.question}</p>
        <span className={`shrink-0 text-[#7d8590] transition-transform duration-200 mt-0.5 ${open ? 'rotate-180 text-[#ff2d78]' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-4 px-5 pb-5 border-t border-[#2a3348]">
          <div className="flex flex-col gap-2 pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20">
              Intention
            </span>
            <p className="text-sm text-[#7d8590] leading-relaxed">{item.intention}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20">
              Model Answer
            </span>
            <p className="text-sm text-[#7d8590] leading-relaxed">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── RoadMapDay ─────────────────────────────────────────────────────── */
const RoadMapDay = ({ day }) => (
  <div className="roadmap-day flex flex-col gap-3 mb-7 pl-2">
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ff2d78]/10 text-[#ff2d78] border border-[#ff2d78]/20">
        Day {day.day}
      </span>
      <h3 className="text-sm font-semibold text-[#e6edf3]">{day.focus}</h3>
    </div>
    <ul className="flex flex-col gap-2 pl-3">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-[#7d8590] leading-relaxed">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ff2d78]/50 mt-[0.45rem]" />
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
  }, [interviewId])

  if (loading || !report) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-5 bg-[#0d1117]">
        <div className="w-10 h-10 rounded-full border-2 border-[#ff2d78] border-t-transparent animate-spin" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-[#e6edf3] font-semibold">Loading your interview plan</p>
          <p className="text-[#7d8590] text-sm">Hang tight...</p>
        </div>
      </div>
    )
  }

  const ringClass = SCORE_RING_CLASSES[scoreKey(report.matchScore)]
  const scoreLabel =
    report.matchScore >= 80 ? 'Strong match' :
    report.matchScore >= 60 ? 'Good match' : 'Needs work'

  return (
    /*
     * Outer shell: full viewport height, dark bg, padding.
     * Must be h-screen so the inner card can be h-full.
     */
    <div className="h-screen w-full bg-[#0d1117] text-[#e6edf3] flex flex-col p-4 md:p-5">
      {/*
       * Inner card: fills the remaining height via flex-1.
       * flex + overflow-hidden so children can independently scroll.
       */}
      <div className="flex flex-1 w-full max-w-[1320px] mx-auto bg-[#161b22] border border-[#2a3348] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 min-h-0">

        {/* ── Left Nav ──────────────────────────────────────────── */}
        <nav className="hidden md:flex w-[220px] shrink-0 flex-col justify-between p-6 border-r border-[#2a3348] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {/* Back to Home */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 w-full px-3 py-2 mb-3 rounded-lg text-sm text-[#7d8590] bg-transparent border-0 cursor-pointer hover:bg-[#1c2230] hover:text-[#e6edf3] transition-all duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </button>

            <div className="h-px bg-[#2a3348] mb-3" />

            <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a5568] mb-3 px-3">
              Sections
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium border-0 cursor-pointer transition-all duration-150
                  ${activeNav === item.id
                    ? 'bg-[#ff2d78]/10 text-[#ff2d78]'
                    : 'bg-transparent text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]'
                  }`}
              >
                <span className="shrink-0">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => getResumePdf(interviewId)}
            className="w-full gap-2 text-xs mt-4"
          >
            <svg height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            AI Resume
          </Button>
        </nav>

        {/* ── Center Content ─────────────────────────────────────── */}
        {/*
         * flex-1 min-w-0 so it takes all available width.
         * overflow-y-auto for its own scroll — works because parent is overflow-hidden with a bounded height.
         */}
        <main className="flex-1 min-w-0 overflow-y-auto px-5 md:px-8 py-7">
          {activeNav === 'technical' && (
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#e6edf3]">Technical Questions</h2>
                <span className="text-xs text-[#7d8590] bg-[#1c2230] border border-[#2a3348] rounded-full px-3 py-1">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'behavioral' && (
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#e6edf3]">Behavioral Questions</h2>
                <span className="text-xs text-[#7d8590] bg-[#1c2230] border border-[#2a3348] rounded-full px-3 py-1">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'roadmap' && (
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#e6edf3]">Preparation Road Map</h2>
                <span className="text-xs text-[#7d8590] bg-[#1c2230] border border-[#2a3348] rounded-full px-3 py-1">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>
              <div className="roadmap-list mt-2">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}

          {/* Mobile tab bar — pinned at bottom of scroll area */}
          <div className="md:hidden flex gap-2 mt-8 pt-4 border-t border-[#2a3348]">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-xs font-medium border-0 cursor-pointer text-[#7d8590] hover:text-[#e6edf3] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium border-0 cursor-pointer transition-all
                  ${activeNav === item.id
                    ? 'bg-[#ff2d78]/10 text-[#ff2d78]'
                    : 'text-[#7d8590] hover:text-[#e6edf3]'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </main>

        {/* ── Right Sidebar ──────────────────────────────────────── */}
        <aside className="hidden lg:flex w-[240px] shrink-0 flex-col gap-6 p-6 border-l border-[#2a3348] overflow-y-auto">

          {/* Match Score */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a5568] self-start">
              Match Score
            </p>
            <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${ringClass}`}>
              <span className="text-2xl font-bold leading-none">{report.matchScore}</span>
              <span className="text-xs font-medium opacity-80">%</span>
            </div>
            <p className="text-xs text-[#7d8590] text-center">{scoreLabel} for this role</p>
          </div>

          <div className="h-px bg-[#2a3348]" />

          {/* Skill Gaps */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a5568]">
              Skill Gaps
            </p>
            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${SEVERITY_CLASSES[gap.severity] ?? SEVERITY_CLASSES.low}`}
                >
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
