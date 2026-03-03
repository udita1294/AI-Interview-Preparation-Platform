import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Protected = ({ children }) => {
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#ff2d78] border-t-transparent animate-spin" />
          <p className="text-[#7d8590] text-sm tracking-wide">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default Protected
