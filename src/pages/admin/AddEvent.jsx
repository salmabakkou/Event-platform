import { useState, useRef } from "react";
import {
  PencilLine,
  MapPin,
  Tag,
  Coins,
  ImagePlus,
  CalendarDays,
} from "lucide-react";
import { addEvent } from "../../api/events.api";
import { toast } from "react-toastify";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const [focused, setFocused] = useState("");
  const dateRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        setError("All fields are required");
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      await addEvent(formData);
      toast.success("Event added successfully ✅");

      setFormData({
        name: "",
        date: "",
        location: "",
        category: "",
        description: "",
        price: "",
        image: null,
      });
    } catch {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F3] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#121212] mb-8">
          Add New Event
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* NAME */}
          <div className={`md:col-span-2 flex items-center gap-3 border rounded-lg px-3 py-2 transition
                          ${focused === "name" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
            <PencilLine className={`${focused === "name" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              <CalendarDays />
            </button>
            <input
              ref={dateRef}
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-[#121212] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clear-button]:hidden [&::-webkit-inner-spin-button]:hidden"
              onFocus={() => setFocused("date")}
              onBlur={() => setFocused("")}
            />
          </div>

          {/* LOCATION */}
          <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition
                          ${focused === "location" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
            <MapPin className={`${focused === "location" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full outline-none bg-transparent text-[#121212]"
              onFocus={() => setFocused("location")}
              onBlur={() => setFocused("")}
            />
          </div>

          {/* CATEGORY */}
          <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition
                          ${focused === "category" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}>
            <Tag className={`${focused === "category" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
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
            <Coins className={`${focused === "price" ? "text-[#8B1E1E]" : "text-[#C6A75E]"}`} />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (MAD)"
              className="w-full outline-none bg-transparent text-[#121212]"
              onFocus={() => setFocused("price")}
              onBlur={() => setFocused("")}
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event description"
            rows="3"
            className={`md:col-span-2 border rounded-lg px-3 py-2 outline-none transition
                        ${focused === "description" ? "border-[#8B1E1E]" : "border-[#C6A75E]/40"}`}
            onFocus={() => setFocused("description")}
            onBlur={() => setFocused("")}
          />

          {/* IMAGE */}
          <div className="md:col-span-2 border border-dashed border-[#C6A75E]/50 rounded-lg p-4 text-center">
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="preview"
                className="mx-auto mb-4 h-40 object-cover rounded-lg"
              />
            )}
            <label className="cursor-pointer inline-flex items-center gap-2 text-[#8B1E1E] font-semibold">
              <ImagePlus size={18} />
              Upload Event Image
              <input type="file" name="image" hidden onChange={handleChange} />
            </label>
          </div>

          {/* ERROR */}
          {error && (
            <p className="md:col-span-2 text-[#8B1E1E] font-bold text-center">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-[#8B1E1E] hover:bg-[#C6A75E] hover:text-[#121212] transition-all text-white py-3 rounded-lg font-semibold tracking-wide"
          >
            {loading ? "Saving..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
