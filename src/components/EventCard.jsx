import React, { useState, useEffect } from 'react';
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
  const [nameHeight, setNameHeight] = useState('auto');

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

  // Fonction pour gérer l'ajout et ouvrir le panier
  const handleAddToCart = () => {
    dispatch(addToCart(event));
    dispatch(toggleCart()); // Ouvre la sidebar
    if (onAddToCart) onAddToCart(event);
  };

  // Fonction pour calculer la hauteur uniforme du titre
  useEffect(() => {
    // Forcer une hauteur minimale pour tous les titres
    // Vous pouvez ajuster cette valeur selon vos besoins
    const minHeight = 56; // environ 2 lignes de texte
    setNameHeight(`${minHeight}px`);
  }, [event.name]);

  // Fonction pour gérer le chargement de l'image
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Fonction pour obtenir les styles de l'image avec zoom intelligent
  const getImageStyle = () => {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      transform: imageLoaded ? 'scale(1.1)' : 'scale(1)',
      transition: 'transform 500ms ease-in-out',
    };
  };

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#C6A75E]/30">
      {/* IMAGE CONTAINER avec overflow caché pour masquer les bords noirs */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
        {event.image && (
          <div className="relative w-full h-full">
            <img 
              src={event.image} 
              alt={event.name} 
              className="w-full h-full"
              style={getImageStyle()}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            {/* Overlay de dégradé pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
          </div>
        )}
        
        {/* Badge de catégorie */}
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)} z-10`}>
          {event.category}
        </span>
        
        {/* Prix */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm z-10">
          <div className="flex items-center gap-1">
            <Coins size={14} className="text-[#0B3D2E]" />
            <span className="font-bold text-[#121212]">{event.price} MAD</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* TITRE avec hauteur fixe pour alignement uniforme */}
        <div 
          className="mb-2 sm:mb-3 overflow-hidden"
          style={{ height: nameHeight }}
        >
          <h3 className="text-base sm:text-lg font-bold text-[#121212] leading-tight line-clamp-2">
            {event.name}
          </h3>
        </div>

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

        {/* ACTIONS */}
        {mode === "admin" && (
          <div className="flex gap-2 sm:gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => onEdit(event)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 text-sm font-semibold rounded-lg border border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white transition-all duration-200 active:scale-95"
            >
              <PencilLine size={16} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#8B1E1E] to-[#c42e2e] text-white hover:from-[#C6A75E] hover:to-[#d4b776] hover:text-[#121212] transition-all duration-200 active:scale-95 shadow-sm hover:shadow"
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