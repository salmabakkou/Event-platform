import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEvent from "./pages/admin/AddEvent";

function App() {
  return (
    <Router>
      <Routes>
        
      
          <Route path="/admin/addEvent" element={<AddEvent />} />
          {/* <Route path="eventList" element={<EventList />} /> */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="orders" element={<Orders />} /> */}
      

    
          {/* <Route path="/events" element={<Events />} />   */}
          {/*
        <Route path="/" element={<Home />} />
        
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        */}
        
      </Routes>
    </Router>
  );
}

export default App;
