import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function UserLayout() {
  return (
    <div>
      <Navbar/>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
