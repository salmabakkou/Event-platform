import {
  CalendarDays,
  MapPin,
  Coins,
  PencilLine,
  Trash2,
  ShoppingCart,
} from "lucide-react";

export default function EventCard({
  event,
  mode = "user",
  onEdit,
  onDelete,
  onAddToCart,
}) {
  
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

  return (
    <div className="
      bg-white rounded-2xl shadow-md overflow-hidden
      hover:shadow-xl transition-all duration-300
      flex flex-col
    ">
      {/* Image */}
      <div className="relative">
        {event.image && (
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-44 object-cover"
          />
        )}

        {/* Category badge */}
        <span className="
          absolute top-3 left-3
          bg-[#121212]/80 text-[#C6A75E]
          text-xs font-semibold px-3 py-1 rounded-full
        ">
          {event.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        {/* Title */}
        <h3 className="text-lg font-bold text-[#121212]">
          {event.name}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarDays size={16} className="text-[#C6A75E]" />
          <span>{formatDate(event.date)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-[#C6A75E]" />
          <span>{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2">
          {event.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto font-semibold text-[#121212]">
          <Coins size={18} className="text-[#C6A75E]" />
          <span>{event.price} MAD</span>
        </div>

        {/* Actions */}
        {mode === "admin" && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(event)}
              className="
                flex-1 flex items-center justify-center gap-2
                border border-[#C6A75E] text-[#121212]
                py-2 rounded-lg text-sm font-semibold
                hover:bg-[#C6A75E]/20 transition
              "
            >
              <PencilLine size={16} />
              Edit
            </button>

            <button
              onClick={() => onDelete(event.id)}
              className="
                flex-1 flex items-center justify-center gap-2
                bg-[#8B1E1E] text-white
                py-2 rounded-lg text-sm font-semibold
                hover:opacity-90 transition
              "
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}

        {mode === "user" && (
          <button
            onClick={() => onAddToCart(event)}
            className="
              mt-4 flex items-center justify-center gap-2
              bg-[#8B1E1E] text-white
              py-2 rounded-lg font-semibold
              hover:bg-[#C6A75E] hover:text-[#121212]
              transition-all
            "
          >
            <ShoppingCart size={18} />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
