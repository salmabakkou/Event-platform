import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AddEvent from "./pages/admin/AddEvent";
import EventList from "./pages/admin/EventsList";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import Events from "./pages/user/Events";
import Contact from "./pages/user/Contact";
import Checkout from "./pages/user/Checkout";
// import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="addEvent" element={<AddEvent />} />
          <Route path="eventList" element={<EventList />} />
          {/* <Route path="dashboard" element={<Dashboard />} />  */}
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />         
          <Route path="/events" element={<Events />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
