import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEvent from "./pages/admin/AddEvent";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/admin/add-event" element={<AddEvent />} />

        {/*
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
