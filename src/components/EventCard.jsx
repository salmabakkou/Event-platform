import React, { useState } from 'react';
import {
  CalendarDays,
  MapPin,
  Coins,
  PencilLine,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '../redux/slices/cartSlice';

export default function EventCard({ event, mode = "user", onEdit, onDelete, onAddToCart }) {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleAddToCart = () => {
    dispatch(addToCart(event));
    dispatch(toggleCart());
    if (onAddToCart) onAddToCart(event);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#C6A75E]/30">
      {/* IMAGE CONTAINER */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
        {event.image && (
          <div className="relative w-full h-full">
            <img 
              src={event.image} 
              alt={event.name} 
              className={`w-full h-full object-cover object-center transition-transform duration-500 ease-in-out ${
                imageLoaded ? 'scale-110' : 'scale-100'
              }`}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent"></div>
          </div>
        )}
        
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)} z-10`}>
          {event.category}
        </span>
        
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm z-10">
          <div className="flex items-center gap-1">
            <Coins size={14} className="text-[#0B3D2E]" />
            <span className="font-bold text-[#121212]">{event.price} MAD</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* TITRE - Solution simplifiée */}
        <h3 className="text-base sm:text-lg font-bold text-[#121212] leading-tight line-clamp-2 mb-2 sm:mb-3 min-h-[3em]">
          {event.name}
        </h3>

        <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5 flex-1">
          <div className="flex items-start gap-2">
            <CalendarDays size={16} className="text-[#8B1E1E] shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 flex-1">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-[#0B3D2E] shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 line-clamp-2 flex-1">{event.location}</span>
          </div>
        </div>

        {/* ACTIONS */}
        {mode === "admin" && (
          <div className="flex gap-2 sm:gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => onEdit(event)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 text-sm font-semibold rounded-lg border border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white transition-all duration-200"
            >
              <PencilLine size={16} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 text-sm font-semibold rounded-lg bg-linear-to-r from-[#8B1E1E] to-[#c42e2e] text-white hover:from-[#C6A75E] hover:to-[#d4b776] hover:text-[#121212] transition-all duration-200"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}

        {mode === "user" && (
          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 text-sm font-bold rounded-lg bg-linear-to-r from-[#8B1E1E] to-[#c42e2e] text-white hover:from-[#C6A75E] hover:to-[#d4b776] hover:text-[#121212] transition-all duration-200"
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