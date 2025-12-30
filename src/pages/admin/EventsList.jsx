import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  PencilLine,
  MapPin,
  Tag,
  Coins,
  ImageIcon,
  CalendarDays,
  Search,
  Filter,
  X,
  Upload,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "../../components/EventCard";
import { getEvents, deleteEvent, updateEvent } from "../../api/events.api";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dateRef = useRef(null);
  const [focused, setFocused] = useState("");

  // MODALS STATES
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEventName, setSelectedEventName] = useState("");
  
  const [showEdit, setShowEdit] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  // CHARGEMENT
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

  //  FILTRAGE EN TEMPS RÉEL
  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // DELETE ACTION
  const handleOpenDelete = (id, name) => {
    setSelectedId(id);
    setSelectedEventName(name);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEvent(selectedId);
      setEvents(events.filter(e => e.id !== selectedId));
      toast.success("Event deleted successfully 🗑️");
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowDelete(false);
    }
  };

  // EDIT ACTION
  const handleOpenEdit = (event) => {
    setEditEvent({
      ...event,
      date: dayjs(event.date).format("YYYY-MM-DDTHH:mm"),
    });
    setNewImage(null);
    setShowEdit(true);
  };

  const confirmEdit = async () => {
    setLoadingEdit(true);
    try {
      const updatedData = {
        name: editEvent.name,
        date: editEvent.date,
        location: editEvent.location,
        category: editEvent.category,
        price: editEvent.price,
        image: newImage ? newImage : editEvent.image,
      };

      const updated = await updateEvent(editEvent.id, updatedData);
      setEvents(events.map(ev => ev.id === editEvent.id ? updated : ev));
      toast.success("Event updated successfully ✅");
      setShowEdit(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && value < 0) return;
    setEditEvent((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // delete image
  const removeImage = () => {
    setNewImage(null);
  };

  // open calendrier
  const openDatePicker = () => {
    dateRef.current?.showPicker();
    setFocused("date");
  };

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
        <h1 className="text-3xl font-bold text-center mb-8 text-[#121212]">Manage Events</h1>

        {/* FILTRES & RECHERCHE */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#0B3D2E] rounded-lg focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E] outline-none transition-all"
            />
          </div>

          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#0B3D2E] rounded-lg focus:border-[#8B1E1E] outline-none appearance-none "
            >
              <option value="all">All Categories</option>
              <option value="match">Match</option>
              <option value="festival">Festival</option>
              <option value="tournament">Tournament</option>
            </select>
          </div>
        </div>

        {/* GRILLE D'ÉVÉNEMENTS */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found for this search.</p>
            {(searchTerm || selectedCategory !== "all") && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4 text-[#8B1E1E] hover:text-[#C6A75E] font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <EventCard
                    event={event}
                    mode="admin"
                    onDelete={(id) => handleOpenDelete(id, event.name)}
                    onEdit={() => handleOpenEdit(event)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* MODAL DELETE */}
        <AnimatePresence>
          {showDelete && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-xl p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="text-[#8B1E1E]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#121212] mb-2">
                    Delete Event
                  </h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-[#8B1E1E]">"{selectedEventName}"</span>?
                    This action cannot be undone.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDelete(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#8B1E1E] to-[#c42e2e] text-white font-semibold rounded-lg hover:from-[#c42e2e] hover:to-[#d9534f] transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Delete Event
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL EDIT */}
        <AnimatePresence>
          {showEdit && editEvent && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-8 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-lg rounded-xl sm:rounded-2xl shadow-xl pt-8  my-2"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
              >
                {/* Header compact */}
                <div className="p-5 sm:p-6 border-b   pb-6  border-gray-100">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-[#121212] mb-1">
                      Edit Event
                    </h3>
                    <p className="text-xs text-gray-500">
                      Update the event details
                    </p>
                  </div>
                </div>

                {/* Formulaire */}
                <div className="p-5 sm:p-6 pt-8">
                  <form onSubmit={(e) => { e.preventDefault(); confirmEdit(); }} className="space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Event Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">
                          Event Name *
                        </label>
                        <div className="relative">
                          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                            focused === "name" ? "text-[#8B1E1E]" : "text-gray-400"
                          }`}>
                            <PencilLine size={14} />
                          </div>
                          <input
                            name="name"
                            value={editEvent.name}
                            onChange={handleEditChange}
                            placeholder="Event name"
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused("")}
                            className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg transition-all outline-none ${
                              focused === "name" 
                                ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]/20" 
                                : "border-gray-300 focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/20"
                            }`}
                          />
                        </div>
                      </div>

{/* Date & Time */}
<div className="space-y-1">
  <label className="block text-xs font-medium text-gray-700">
    Date & Time *
  </label>
  <div className="relative">
    <button
      type="button"
      onClick={openDatePicker}
      className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-colors ${
        focused === "date" ? "text-[#8B1E1E]" : "text-gray-400"
      } hover:text-[#8B1E1E]`}
    >
      <CalendarDays size={14} />
    </button>
    <input
      ref={dateRef}
      type="datetime-local"
      name="date"
      value={editEvent.date}
      onChange={handleEditChange}
      onFocus={() => setFocused("date")}
      onBlur={() => setFocused("")}
      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg transition-all outline-none cursor-pointer 
        ${focused === "date" 
          ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]/20" 
          : "border-gray-300 focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/20"
        } 
        /* Cette ligne supprime l'icône à droite */
        [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden
      `}
    />
  </div>
</div>

                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
                        Location *
                      </label>
                      <div className="relative">
                        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                          focused === "location" ? "text-[#8B1E1E]" : "text-gray-400"
                        }`}>
                          <MapPin size={14} />
                        </div>
                        <input
                          name="location"
                          value={editEvent.location}
                          onChange={handleEditChange}
                          placeholder="Event location"
                          onFocus={() => setFocused("location")}
                          onBlur={() => setFocused("")}
                          className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg transition-all outline-none ${
                            focused === "location" 
                              ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]/20" 
                              : "border-gray-300 focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/20"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Category et Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Category */}
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">
                          Category *
                        </label>
                        <div className="relative">
                          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                            focused === "category" ? "text-[#8B1E1E]" : "text-gray-400"
                          }`}>
                            <Tag size={14} />
                          </div>
                          <select
                            name="category"
                            value={editEvent.category}
                            onChange={handleEditChange}
                            onFocus={() => setFocused("category")}
                            onBlur={() => setFocused("")}
                            className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg transition-all outline-none appearance-none cursor-pointer bg-white ${
                              focused === "category" 
                                ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]/20" 
                                : "border-gray-300 focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/20"
                            }`}
                          >
                            <option value="match">Match</option>
                            <option value="festival">Festival</option>
                            <option value="tournament">Tournament</option>
                          </select>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">
                          Price (MAD) *
                        </label>
                        <div className="relative">
                          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                            focused === "price" ? "text-[#8B1E1E]" : "text-gray-400"
                          }`}>
                            <Coins size={14} />
                          </div>
                          <input
                            type="number"
                            name="price"
                            value={editEvent.price}
                            onChange={handleEditChange}
                            placeholder="0.00"
                            onFocus={() => setFocused("price")}
                            onBlur={() => setFocused("")}
                            className={`w-full pl-9 pr-10 py-2 text-sm border rounded-lg transition-all outline-none ${
                              focused === "price" 
                                ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]/20" 
                                : "border-gray-300 focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E]/20"
                            }`}
                            min="0"
                            step="0.01"
                          />
                          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 font-medium ${
                            focused === "price" ? "text-[#8B1E1E]" : "text-gray-500"
                          }`}>
                            MAD
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Upload compact */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
                        Event Image
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                        focused === "image" 
                          ? "border-[#8B1E1E] bg-[#8B1E1E]/5" 
                          : "border-gray-300 hover:border-[#8B1E1E]"
                      }`}>
                        {(newImage || editEvent.image) ? (
                          <div className="space-y-3">
                            <div className="relative mx-auto max-w-xs">
                              <img
                                src={
                                  newImage
                                    ? URL.createObjectURL(newImage)
                                    : editEvent.image
                                }
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-lg shadow"
                              />
                              {newImage && (
                                <button
                                  type="button"
                                  onClick={removeImage}
                                  className="absolute top-1 right-1 bg-[#8B1E1E] text-white p-1 rounded-full hover:bg-[#6b1717] transition-colors w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  <X size={10} />
                                </button>
                              )}
                            </div>
                            <label className="cursor-pointer inline-flex items-center gap-1 text-xs font-medium text-[#8B1E1E] hover:text-[#C6A75E] transition-colors">
                              <Upload size={14} />
                              Change Image
                              <input
                                type="file"
                                hidden
                                onChange={(e) => setNewImage(e.target.files[0])}
                                onFocus={() => setFocused("image")}
                                onBlur={() => setFocused("")}
                                accept="image/*"
                              />
                            </label>
                          </div>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 bg-[#8B1E1E]/10 rounded-full flex items-center justify-center">
                              <ImageIcon className="text-[#8B1E1E]" size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Click to upload image
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                            <input
                              type="file"
                              hidden
                              onChange={(e) => setNewImage(e.target.files[0])}
                              onFocus={() => setFocused("image")}
                              onBlur={() => setFocused("")}
                              accept="image/*"
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Actions avec espace */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => setShowEdit(false)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loadingEdit}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#8B1E1E] to-[#c42e2e] hover:from-[#C6A75E] hover:to-[#d4b776] hover:text-[#121212] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm hover:shadow"
                        >
                          {loadingEdit ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Saving...
                            </span>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}