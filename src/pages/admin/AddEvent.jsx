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

    // simple validation
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

          {/* Event Name */}
          <div className="
            group md:col-span-2 flex items-center rounded-lg px-3 py-2
            border border-[#C6A75E]/40
            focus-within:border-[#C6A75E]
            focus-within:ring-2
            focus-within:ring-[#C6A75E]/30
            transition-all duration-300
          ">
            <PencilLine
              size={18}
              className="mr-2 text-[#C6A75E]/70 group-focus-within:text-[#8B1E1E] transition"
            />
            <input
              name="name"
              placeholder="Event name"
              className="w-full outline-none bg-transparent text-[#121212]"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Date & Time */}
          <div className="
            group flex items-center rounded-lg px-3 py-2
            border border-[#C6A75E]/40
            focus-within:border-[#C6A75E]
            focus-within:ring-2
            focus-within:ring-[#C6A75E]/30
            transition-all duration-300
          ">
            <button
              type="button"
              onClick={() => dateRef.current?.showPicker()}
              className="mr-2"
            >
              <CalendarDays
                size={18}
                className="text-[#C6A75E]/70 group-focus-within:text-[#8B1E1E] transition"
              />
            </button>

            <input
              ref={dateRef}
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="
                w-full outline-none bg-transparent text-[#121212]
                [&::-webkit-calendar-picker-indicator]:hidden
                [&::-webkit-clear-button]:hidden
                [&::-webkit-inner-spin-button]:hidden
              "
            />
          </div>

          {/* Location */}
          <div className="
            group flex items-center rounded-lg px-3 py-2
            border border-[#C6A75E]/40
            focus-within:border-[#C6A75E]
            focus-within:ring-2
            focus-within:ring-[#C6A75E]/30
            transition-all duration-300
          ">
            <MapPin
              size={18}
              className="mr-2 text-[#C6A75E]/70 group-focus-within:text-[#8B1E1E] transition"
            />
            <input
              name="location"
              placeholder="Location"
              className="w-full outline-none bg-transparent text-[#121212]"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="
            group flex items-center rounded-lg px-3 py-2
            border border-[#C6A75E]/40
            focus-within:border-[#C6A75E]
            focus-within:ring-2
            focus-within:ring-[#C6A75E]/30
            transition-all duration-300
          ">
            <Tag
              size={18}
              className="mr-2 text-[#C6A75E]/70 group-focus-within:text-[#8B1E1E] transition"
            />
            <select
              name="category"
              className="w-full outline-none bg-transparent text-[#121212]"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Category</option>
              <option value="match">Match</option>
              <option value="festival">Festival</option>
              <option value="tournament">Tournament</option>
            </select>
          </div>

          {/* Price */}
          <div className="
            group flex items-center rounded-lg px-3 py-2
            border border-[#C6A75E]/40
            focus-within:border-[#C6A75E]
            focus-within:ring-2
            focus-within:ring-[#C6A75E]/30
            transition-all duration-300
          ">
            <Coins
              size={18}
              className="mr-2 text-[#C6A75E]/70 group-focus-within:text-[#8B1E1E] transition"
            />
            <input
              type="number"
              name="price"
              placeholder="Price (MAD)"
              className="w-full outline-none bg-transparent text-[#121212]"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="
            group md:col-span-2 rounded-lg
            border border-[#C6A75E]/40
            focus-within:border-[#C6A75E]
            focus-within:ring-2
            focus-within:ring-[#C6A75E]/30
            transition-all duration-300
          ">
            <textarea
              name="description"
              rows="3"
              placeholder="Event description"
              className="w-full px-3 py-2 outline-none bg-transparent text-[#121212]"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Image */}
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

          {/* Error */}
          {error && (
            <p className="md:col-span-2 text-[#8B1E1E] font-bold text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-[#8B1E1E] hover:bg-[#C6A75E] hover:text-[#121212]
            transition-all duration-300 text-white py-3 rounded-lg font-semibold tracking-wide"
          >
            {loading ? "Saving..." : "Add Event"}
          </button>

        </form>
      </div>
    </div>
  );
}
