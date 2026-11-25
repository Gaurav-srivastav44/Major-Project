import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('finlytics_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (profile) => {
    const next = profile || { name: 'Gaurav', email: 'gaurav@finlytics.app' }
    localStorage.setItem('finlytics_user', JSON.stringify(next))
    setUser(next)
  }

  const logout = () => {
    localStorage.removeItem('finlytics_user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
