import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  FiEdit3,
  FiMapPin,
  FiTag,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "../../components/EventCard";
import { getEvents, deleteEvent, updateEvent } from "../../api/events.api";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateRef = useRef(null);

  const [focused, setFocused] = useState("");

  // DELETE
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // EDIT
  const [showEdit, setShowEdit] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  // ---------------- LOAD EVENTS ----------------
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

  // ---------------- DELETE ----------------
  const openDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEvent(selectedId);
      setEvents((prev) => prev.filter((e) => e.id !== selectedId));
      toast.success("Event deleted 🗑️");
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowDelete(false);
    }
  };

  // ---------------- EDIT ----------------
  const openEdit = (event) => {
    setEditEvent({
      ...event,
      date: dayjs(event.date).format("YYYY-MM-DDTHH:mm"),
    });
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const confirmEdit = async () => {
    setLoadingEdit(true);
    try {
      const updated = await updateEvent(editEvent.id, editEvent);
      setEvents((prev) =>
        prev.map((ev) => (ev.id === editEvent.id ? updated : ev))
      );
      toast.success("Event updated ✅");
      setShowEdit(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setLoadingEdit(false);
    }
  };

  // ---------------- ANIMATIONS ----------------
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  // ---------------- SKELETON ----------------
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="h-64 rounded-xl bg-[#F9F7F3]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Events</h2>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <EventCard
                event={event}
                mode="admin"
                onDelete={openDelete}
                onEdit={openEdit}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* DELETE POPUP */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-80 p-6 rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <p className="text-lg font-semibold mb-4">Delete this event?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDelete(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-[#8B1E1E] text-white rounded-lg hover:bg-[#C6A75E] hover:text-[#121212] transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT POPUP */}
      <AnimatePresence>
        {showEdit && editEvent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="text-xl font-bold text-center mb-6 text-[#121212]">
                Edit Event
              </h3>

              <div className="space-y-4">

                {/* NAME */}
                <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition
                                ${focused === "name" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
                  <FiEdit3 className={`${focused === "name" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
                  <input
                    name="name"
                    value={editEvent.name}
                    onChange={handleEditChange}
                    placeholder="Event name"
                    className="w-full outline-none bg-transparent text-[#121212]"
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* DATE */}
                <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition
                                ${focused === "date" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
                  <button
                    type="button"
                    onClick={() => dateRef.current?.showPicker()}
                    className={`${focused === "date" ? "text-[#8B1E1E]" : "text-[#C6A75E]"} transition`}
                  >
                    <FiCalendar />
                  </button>
                  <input
                    ref={dateRef}
                    type="datetime-local"
                    name="date"
                    value={editEvent.date}
                    onChange={handleEditChange}
                    className="w-full outline-none bg-transparent text-[#121212] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clear-button]:hidden [&::-webkit-inner-spin-button]:hidden"
                    onFocus={() => setFocused("date")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* LOCATION */}
                <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition
                                ${focused === "location" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
                  <FiMapPin className={`${focused === "location" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
                  <input
                    name="location"
                    value={editEvent.location}
                    onChange={handleEditChange}
                    placeholder="Location"
                    className="w-full outline-none bg-transparent text-[#121212]"
                    onFocus={() => setFocused("location")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* CATEGORY */}
                <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition
                                ${focused === "category" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
                  <FiTag className={`${focused === "category" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
                  <select
                    name="category"
                    value={editEvent.category}
                    onChange={handleEditChange}
                    className="w-full outline-none bg-transparent text-[#121212]"
                    onFocus={() => setFocused("category")}
                    onBlur={() => setFocused("")}
                  >
                    <option value="">Category</option>
                    <option value="match">Match</option>
                    <option value="festival">Festival</option>
                    <option value="tournament">Tournament</option>
                  </select>
                </div>

                {/* PRICE */}
                <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition
                                ${focused === "price" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
                  <FiDollarSign className={`${focused === "price" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
                  <input
                    type="number"
                    name="price"
                    value={editEvent.price}
                    onChange={handleEditChange}
                    placeholder="Price (MAD)"
                    className="w-full outline-none bg-transparent text-[#121212]"
                    onFocus={() => setFocused("price")}
                    onBlur={() => setFocused("")}
                  />
                </div>

                {/* DESCRIPTION */}
                <textarea
                  name="description"
                  value={editEvent.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  rows="3"
                  className={`w-full border rounded-lg px-3 py-2 outline-none transition
                              ${focused === "description" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}
                  onFocus={() => setFocused("description")}
                  onBlur={() => setFocused("")}
                />

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowEdit(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEdit}
                    disabled={loadingEdit}
                    className="px-4 py-2 bg-[#8B1E1E] text-white rounded-lg hover:bg-[#C6A75E] hover:text-[#121212] transition"
                  >
                    {loadingEdit ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );

}
