import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function Autharization() {
    const token=localStorage.getItem('token')
  return (
    (token?<Outlet/>:<Navigate to='/'/>)//token true-->
  )
}

export function LoginPageAuth() {
  const token=localStorage.getItem('token')
return (
  (token? <Navigate to="/home"/>: <Outlet/>)
)
}

