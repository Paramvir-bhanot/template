'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Store all admin data in localStorage
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminData', JSON.stringify({
        name: data.name,
      }))

      // Store admin data in sessionStorage for immediate use
      sessionStorage.setItem('adminData', JSON.stringify({
        name: data.name,
      }))

      // Redirect to admin dashboard
      router.push('/skillup')
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex justify-center p-7">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-center text-4xl sm:text-5xl font-bold text-white bg-gradient-to-r from-[#CFCFCF] to-[#6A6A6A] bg-clip-text text-transparent">
            Admin Login
          </h1>
          <p className="text-[#B0B0B0] mt-2">Access your MAHI TRAVEL dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#2A1A1A] border border-[#8B4513] rounded-lg flex items-start backdrop-blur-sm bg-opacity-50">
            <svg
              className="h-5 w-5 text-[#FF6B6B] mt-0.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-medium text-[#FF6B6B]">Unable to Sign In</h3>
              <p className="text-sm text-[#FF9999] mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-[#1A1A1A] rounded-xl border border-[#333333] shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-80">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6A6A6A]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-[#333333] bg-[#0A0A0A] text-white focus:ring-2 focus:ring-[#CFCFCF] focus:border-transparent placeholder-[#6A6A6A] focus:outline-none transition duration-150 ease-in-out"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6A6A6A]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-3 rounded-lg border border-[#333333] bg-[#0A0A0A] text-white focus:ring-2 focus:ring-[#CFCFCF] focus:border-transparent placeholder-[#6A6A6A] focus:outline-none transition duration-150 ease-in-out"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#6A6A6A] hover:text-[#CFCFCF]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#6A6A6A] hover:text-[#CFCFCF]" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFCFCF] transition-all duration-150 ${
                    loading 
                      ? 'bg-gradient-to-r from-[#6A6A6A] to-[#8A8A8A] cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#CFCFCF] to-[#6A6A6A] hover:from-[#FFFFFF] hover:to-[#8A8A8A] hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}