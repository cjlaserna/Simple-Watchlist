// src/components/PrivateRoute.js

import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'

import { useAuth } from './context/Auth'

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/" />;
}