import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import AddEvent from "./pages/admin/AddEvent";
import EventList from "./pages/admin/EventsList";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";

import Home from "./pages/user/Home";
import Events from "./pages/user/Events";
import Contact from "./pages/user/Contact";
import Checkout from "./pages/user/Checkout";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN PROTÉGÉ */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addEvent" element={<AddEvent />} />
            <Route path="eventList" element={<EventList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        {/* USER PUBLIC */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* REDIRECTION PAR DÉFAUT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
