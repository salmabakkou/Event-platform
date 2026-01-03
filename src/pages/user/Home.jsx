// pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowRight, Trophy, Ticket, MessageCircle } from "lucide-react";
import EventCard from "../../components/EventCard";
import { getEvents } from "../../api/events.api";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les événements depuis mockapi
  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (error) {
      toast.error("Failed to load events");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Ajouter au panier
  const handleAddToCart = (event) => {
    toast.success(`Added ${event.name} to cart!`);
  };

  // Événements à venir (premiers 4)
  const upcomingEvents = events.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F7F3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8B1E1E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3]">
      {/* HERO SECTION - VOTRE PHOTO */}
      <div className="relative min-h-[500px] flex items-center">
        {/* VOTRE PHOTO DE FOND */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/heroSection.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-[#C6A75E]" size={32} />
              <span className="font-bold text-[#C6A75E] text-lg">EVENTSPHERE</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <span className="block text-[#C6A75E]">Events & Experiences</span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-200">
              Book your tickets for the best matches, festivals, and tournaments
            </p>
          </div>
        </div>
      </div>

      {/* CATÉGORIES COMME DES TICKETS - SIMPLES */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TICKET MATCH */}
          <Link
            to="/events?category=match"
            className="bg-white rounded-xl p-6 border-2 border-[#0B3D2E] hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0B3D2E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚽</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Matches</h3>
                <p className="text-gray-600 text-sm">Sports events & competitions</p>
              </div>
              <ArrowRight className="ml-auto text-[#0B3D2E] group-hover:translate-x-2 transition-transform" size={20} />
            </div>
          </Link>

          {/* TICKET FESTIVAL */}
          <Link
            to="/events?category=festival"
            className="bg-white rounded-xl p-6 border-2 border-[#C6A75E] hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C6A75E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎪</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Festivals</h3>
                <p className="text-gray-600 text-sm">Music & cultural events</p>
              </div>
              <ArrowRight className="ml-auto text-[#C6A75E] group-hover:translate-x-2 transition-transform" size={20} />
            </div>
          </Link>

          {/* TICKET TOURNAMENT */}
          <Link
            to="/events?category=tournament"
            className="bg-white rounded-xl p-6 border-2 border-[#8B1E1E] hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#8B1E1E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Tournaments</h3>
                <p className="text-gray-600 text-sm">Competitions & championships</p>
              </div>
              <ArrowRight className="ml-auto text-[#8B1E1E] group-hover:translate-x-2 transition-transform" size={20} />
            </div>
          </Link>
        </div>
      </div>

      {/* SECTION ÉVÉNEMENTS À VENIR */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#121212] mb-3">Upcoming Events</h2>
          <p className="text-gray-600">Don't miss these exciting events</p>
        </div>
        
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                mode="user"
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="text-4xl mb-4">🎭</div>
            <p className="text-gray-600 text-lg mb-2">No upcoming events</p>
            <p className="text-gray-500">Check back later for new events</p>
          </div>
        )}
        
        {/* BOUTON POUR VOIR TOUS LES ÉVÉNEMENTS */}
        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#1a6b52] text-white px-8 py-3 rounded-lg font-bold transition-colors group"
          >
            <Ticket size={20} />
            View All Events
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </div>

      {/* SECTION CONTACT - BLANC AVEC BOUTON HOVER */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
          
          {/* Icône avec bordure colorée */}
          <div className="w-16 h-16 border-4 border-[#0B3D2E] rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="text-[#0B3D2E]" size={28} />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Need Assistance?
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Our team is ready to help you with any questions about events or bookings
          </p>
          
          {/* Bouton avec hover de votre thème */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white border-2 border-[#0B3D2E] hover:bg-[#0B3D2E] text-[#0B3D2E] hover:text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300 group shadow-sm hover:shadow-md"
          >
            <MessageCircle size={20} />
            Get in Touch
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
          
        </div>
      </div>
    </div>
  );
}