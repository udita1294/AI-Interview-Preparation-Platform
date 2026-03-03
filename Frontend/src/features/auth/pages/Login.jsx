import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Button from '../../../components/Button'

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#ff2d78] border-t-transparent animate-spin" />
          <p className="text-[#7d8590] text-sm">Signing you in...</p>
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
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#e6edf3]">Welcome back</h1>
          <p className="text-sm text-[#7d8590]">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              autoComplete="current-password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#4a5568] outline-none transition-colors focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/30"
            />
          </div>

          <Button type="submit" className="w-full mt-1 py-3">
            Sign In
          </Button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-[#7d8590]">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-[#ff2d78] font-medium hover:text-[#ff6b9d] transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
