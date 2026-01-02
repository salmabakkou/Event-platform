import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../redux/slices/cartSlice";
import { logout } from "../redux/slices/authSlice";
import { ShoppingCart, Menu, X, Home, Calendar, Phone, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const cartItemCount = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Nav links
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Events", path: "/events", icon: <Calendar size={20} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirection vers Home après logout
  };

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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-3">
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

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-lg hover:bg-[#0B3D2E]/10 transition-colors"
            >
              <ShoppingCart className="text-[#0B3D2E]" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Login / Logout */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-[#0B3D2E]/10"
              >
                <User size={20} />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                title="Logout"
              >
                <LogOut className="text-red-600" size={22} />
              </button>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-lg hover:bg-[#0B3D2E]/10 transition-colors"
            >
              <ShoppingCart className="text-[#0B3D2E]" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                title="Logout"
              >
                <LogOut className="text-red-600" size={22} />
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
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

              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-[#0B3D2E]/10 transition-all"
                >
                  <User size={20} />
                  Login
                </Link>
              )}

              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-100 transition-all"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
