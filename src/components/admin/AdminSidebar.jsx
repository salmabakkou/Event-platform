import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiPlusSquare,
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function AdminSidebar({ children }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // Vérifier largeur écran
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#0B3D2E]/5";

  const handleCloseOnMobile = () => {
    if (isMobile) setMobileOpen(false);
  };

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
    navigate("/login"); // redirection vers login après logout
  };

  // Si l'utilisateur n'est pas admin, ne pas afficher la sidebar
  if (!isAuthenticated || role !== "admin") return children;

  return (
    <div className="flex min-h-screen bg-[#F9F7F3]">
      {/* Bouton menu mobile */}
      {isMobile && !mobileOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg text-[#0B3D2E] hover:bg-gray-50 transition-all duration-300"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40 bg-white shadow-xl
          flex flex-col transition-all duration-300
          ${isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : ""}
          ${!isMobile && (open ? "w-72" : "w-20")}
        `}
      >
        {/* Header */}
        <div
          className={`p-4 md:p-6 border-b border-gray-100 ${
            !open && !isMobile ? "flex justify-center" : "flex items-center justify-between"
          }`}
        >
          {open || isMobile ? (
            <>
              <h2 className="text-xl font-bold text-[#0B3D2E]">Admin</h2>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-gray-600"
              >
                {isMobile ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-gray-600"
            >
              <FiMenu size={22} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col py-8">
          <nav className="flex-1 flex flex-col gap-2 px-4">
            <NavLink
              to="/admin/dashboard"
              onClick={handleCloseOnMobile}
              className={({ isActive }) =>
                `${baseLink} ${
                  isActive ? "bg-linear-to-r from-[#0B3D2E] to-[#1a6b52] text-white shadow-md" : ""
                } ${!open && !isMobile ? "justify-center" : ""}`
              }
            >
              <FiHome size={20} />
              {(open || isMobile) && <span className="font-medium">Dashboard</span>}
            </NavLink>

            <NavLink
              to="/admin/eventList"
              onClick={handleCloseOnMobile}
              className={({ isActive }) =>
                `${baseLink} ${
                  isActive ? "bg-linear-to-r from-[#0B3D2E] to-[#1a6b52] text-white shadow-md" : ""
                } ${!open && !isMobile ? "justify-center" : ""}`
              }
            >
              <FiCalendar size={20} />
              {(open || isMobile) && <span className="font-medium">Events</span>}
            </NavLink>

            <NavLink
              to="/admin/addEvent"
              onClick={handleCloseOnMobile}
              className={({ isActive }) =>
                `${baseLink} ${
                  isActive ? "bg-linear-to-r from-[#0B3D2E] to-[#1a6b52] text-white shadow-md" : ""
                } ${!open && !isMobile ? "justify-center" : ""}`
              }
            >
              <FiPlusSquare size={20} />
              {(open || isMobile) && <span className="font-medium">Add Event</span>}
            </NavLink>

            <NavLink
              to="/admin/orders"
              onClick={handleCloseOnMobile}
              className={({ isActive }) =>
                `${baseLink} ${
                  isActive ? "bg-linear-to-r from-[#0B3D2E] to-[#1a6b52] text-white shadow-md" : ""
                } ${!open && !isMobile ? "justify-center" : ""}`
              }
            >
              <FiShoppingCart size={20} />
              {(open || isMobile) && <span className="font-medium">Orders</span>}
            </NavLink>
          </nav>

          {/* Logout */}
          <div className="px-4 pt-6 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                bg-linear-to-r from-[#8B1E1E] to-[#c42e2e]
                hover:from-[#C6A75E] hover:to-[#d4b776]
                text-white hover:text-[#121212]
                transition-all duration-300 shadow-md hover:shadow-lg
                ${!open && !isMobile ? "justify-center" : ""}
                w-full
              `}
            >
              <FiLogOut size={20} />
              {(open || isMobile) && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${!isMobile && (open ? "ml-72" : "ml-20")} ${
          isMobile ? "w-full" : ""
        } min-h-screen`}
      >
        {children}
      </main>
    </div>
  );
}
