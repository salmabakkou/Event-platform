import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../redux/slices/cartSlice';
import { ShoppingCart, Menu, X, Home, Calendar, Phone, User } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Récupération de la quantité totale depuis Redux
  const cartItemCount = useSelector((state) => state.cart.totalQuantity);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Events", path: "/events", icon: <Calendar size={20} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={20} /> },
    { name: "Login", path: "/login", icon: <User size={20} /> }, 
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0B3D2E] to-[#1a6b52] rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-[#121212] hidden sm:block">
              EventSphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-[#0B3D2E] to-[#1a6b52] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#0B3D2E]/10 hover:text-[#0B3D2E]"
                }`}
              >
                {item.icon}
                <span>{item.name}</span> 
              </Link>
            ))}
            
            {/* --- FIX ICI : Remplacer <Link> par <button> --- */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 ml-2 rounded-lg hover:bg-[#0B3D2E]/10 transition-colors focus:outline-none"
            >
              <ShoppingCart className="text-[#0B3D2E]" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Mobile Cart */}
          <div className="md:hidden flex items-center gap-2">
            {/* --- FIX ICI : Version Mobile --- */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-lg hover:bg-[#0B3D2E]/10 transition-colors"
            >
              <ShoppingCart className="text-[#0B3D2E]" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name} 
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-[#0B3D2E] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span> 
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
