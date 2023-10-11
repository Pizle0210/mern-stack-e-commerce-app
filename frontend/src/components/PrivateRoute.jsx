import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {userInfo} = useSelector(state=>state.auth)
  return userInfo?<Outlet/>:<Navigate to="/login" />
}
