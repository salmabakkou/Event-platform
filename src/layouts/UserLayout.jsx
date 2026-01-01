import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSidebar from '../pages/user/cartSidebar';

export default function UserLayout() {
  return (
    <div>
      <Navbar/>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}
