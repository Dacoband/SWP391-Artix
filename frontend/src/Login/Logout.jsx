// import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/AuthenContext.tsx'
export function Logout() {
  const storeUserData = useAuth()
  const redirect = useNavigate()
  const logout = () => {
    sessionStorage.removeItem('userRole')
    sessionStorage.removeItem('auth');
    // Check if there's any auth data saved and parse it
    storeUserData(null)
    redirect('/')
  }
  return (
    logout
  )
}
