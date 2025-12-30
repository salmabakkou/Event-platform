import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEvent from "./pages/admin/AddEvent";
import EventList from "./pages/admin/EventsList";
import AdminLayout from "./layouts/AdminLayout";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="addEvent" element={<AddEvent />} />
          <Route path="eventList" element={<EventList />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="orders" element={<Orders />} /> */}
        </Route>
        {/* <Route element={<UserLayout />}> */}
          {/* <Route path="/events" element={<Events />} />   */}
          {/* <Route path="/" element={<Home />} /> */}
        {/* </Route>        */}
      </Routes>
    </Router>
  );
}

export default App;
