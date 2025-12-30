import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import EventCard from "../../components/EventCard";
import { getEvents } from "../../api/events.api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="min-h-screen bg-[#F9F7F3] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#8B1E1E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading events...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F7F3] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#121212] mb-2">
            Upcoming Events
          </h1>
          <p className="text-gray-600">
            Discover and book tickets for amazing events
          </p>
        </div>

        {/* FILTRES*/}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setFocused("search")}
              onBlur={() => setFocused("")}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-all outline-none ${
                focused === "search" 
                  ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]/20" 
                  : "border-[#0B3D2E] focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/20"
              }`}
            />
          </div>

          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              onFocus={() => setFocused("filter")}
              onBlur={() => setFocused("")}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-all outline-none appearance-none cursor-pointer ${
                focused === "filter" 
                  ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]/20" 
                  : "border-[#0B3D2E] focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/20"
              }`}
            >
              <option value="all">All Categories</option>
              <option value="match">Match</option>
              <option value="festival">Festival</option>
              <option value="tournament">Tournament</option>
            </select>
          </div>
        </div>

        {/* Message si aucun résultat */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <div className="text-gray-400 mb-4 text-6xl">📅</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No events found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter to find what you're looking for."
                : "No events are currently available."}
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 text-sm text-[#8B1E1E] hover:text-[#C6A75E] font-medium border border-[#8B1E1E] hover:border-[#C6A75E] rounded-lg transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>

         {/* GRILLE D'ÉVÉNEMENTS */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -4 }}
                  >
                    <EventCard
                      event={event}
                      mode="user"
                      onAddToCart={(event) => {
                        //  logique pour ajouter au panier
                        toast.success(`Added ${event.name} to cart!`);
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}