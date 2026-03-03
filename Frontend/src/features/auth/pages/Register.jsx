import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Button from '../../../components/Button'

const Register = () => {
  const navigate = useNavigate()
  const { loading, handleRegister } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#ff2d78] border-t-transparent animate-spin" />
          <p className="text-[#7d8590] text-sm">Creating your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117] px-4">
      {/* Card */}
      <div className="w-full max-w-sm bg-[#161b22] border border-[#2a3348] rounded-2xl p-8 flex flex-col gap-7 shadow-2xl shadow-black/40">

        {/* Heading */}
        <div className="flex flex-col gap-1">
          <div className="w-10 h-10 rounded-xl bg-[#ff2d78]/10 border border-[#ff2d78]/20 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#e6edf3]">Create an account</h1>
          <p className="text-sm text-[#7d8590]">Start building your personalized interview strategy</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-medium text-[#7d8590] uppercase tracking-wide">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="johndoe"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#4a5568] outline-none transition-colors focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-[#7d8590] uppercase tracking-wide">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#4a5568] outline-none transition-colors focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium text-[#7d8590] uppercase tracking-wide">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#4a5568] outline-none transition-colors focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/30"
            />
          </div>

          <Button type="submit" className="w-full mt-1 py-3">
            Create Account
          </Button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-[#7d8590]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#ff2d78] font-medium hover:text-[#ff6b9d] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
