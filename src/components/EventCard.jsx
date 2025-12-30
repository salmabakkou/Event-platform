import {
  CalendarDays,
  MapPin,
  Coins,
  PencilLine,
  Trash2,
  ShoppingCart,
} from "lucide-react";

export default function EventCard({ event, mode = "user", onEdit, onDelete, onAddToCart }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'match': return 'bg-[#0B3D2E] text-white';
      case 'festival': return 'bg-[#C6A75E] text-[#121212]';
      case 'tournament': return 'bg-[#8B1E1E] text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#C6A75E]/30">
      {/* IMAGE */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
        {event.image && (
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)}`}>
          {event.category}
        </span>
        
        {/* Price badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          <div className="flex items-center gap-1">
            <Coins size={14} className="text-[#0B3D2E]" />
            <span className="font-bold text-[#121212]">{event.price} MAD</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#121212] line-clamp-2 mb-2 sm:mb-3">
          {event.name}
        </h3>

        {/* Details */}
        <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5 flex-1">
          {/* Date */}
          <div className="flex items-start gap-2">
            <CalendarDays size={16} className="text-[#8B1E1E] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 flex-1">{formatDate(event.date)}</span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-[#0B3D2E] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 line-clamp-2 flex-1">{event.location}</span>
          </div>
        </div>

        {/* Actions */}
        {mode === "admin" && (
          <div className="flex gap-2 sm:gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => onEdit(event)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 text-sm font-semibold rounded-lg border border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white transition-all duration-200 active:scale-95"
            >
              <PencilLine size={16} />
              <span className="hidden sm:inline">Edit</span>
              <span className="sm:hidden">Edit</span>
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#8B1E1E] to-[#c42e2e] text-white hover:from-[#C6A75E] hover:to-[#d4b776] hover:text-[#121212] transition-all duration-200 active:scale-95 shadow-sm hover:shadow"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Delete</span>
              <span className="sm:hidden">Delete</span>
            </button>
          </div>
        )}

        {mode === "user" && (
          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={() => onAddToCart(event)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 text-sm font-bold rounded-lg bg-gradient-to-r from-[#8B1E1E] to-[#c42e2e] text-white hover:from-[#C6A75E] hover:to-[#d4b776] hover:text-[#121212] transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}