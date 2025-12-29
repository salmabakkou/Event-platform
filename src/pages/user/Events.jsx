import { useState , useEffect } from "react";
import { toast } from "react-toastify";
import EventCard from "../../components/EventCard";
import { getEvents } from "../../api/events.api";


export default function Events() {
    const [events, setEvents]=useState([]);
    const [loading , setLoading]=useState(true);

    const [selectedCategory , setSelectedCategory]=useState("all")
    const [searchTerm , setSearchTerm]=useState("");

    const fetchEvents =async () => {
        try{
            const res = await getEvents();
            setEvents(res.data);
        }catch{
            toast.error("failed to load events");
        }finally{
            setLoading(false)
        }
    }

    const filtredEvents = events 
      .filter((event)=>  selectedCategory === "all" ? true : event.category === selectedCategory )
      .filter((event)=> event.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
    useEffect(()=>{
        fetchEvents();
    }, []);

    if(loading)
        return  <p className="text-center mt-10">Loading events...</p>;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Events</h2>
        <div className="mb-4">
            <input 
            type="text" 
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className="w-full border rounded px-3 py-2"
             />
        </div>
        <div className="mb-6 flex justify-end">
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-4 py-2"
        >
            <option value="all">All categories</option>
            <option value="match">Match</option>
            <option value="festival">Festival</option>
            <option value="tournament">Tournament</option>
        </select>
        </div>
      
            {filtredEvents.length === 0 ? (
              <p>No events found</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    mode="user"
                  />
                ))}
              </div>
            )}
      
    </div>
  )
}
