import { useState, useRef } from "react";
import {
  PencilLine,
  MapPin,
  Tag,
  Coins,
  ImagePlus,
  CalendarDays,
  Upload,
  X,
} from "lucide-react";
import { addEvent } from "../../api/events.api";
import { toast } from "react-toastify";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    category: "",
    price: "",
    image: null,
  });

  const [focused, setFocused] = useState("");
  const dateRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name === "price" && value < 0) return;
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
        price: "",
        image: null,
      });
    } catch {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const openDatePicker = () => {
    dateRef.current?.showPicker();
  };


  const removeImage = () => {
    setFormData({...formData, image: null});
  };

  return (
    <div className="bg-[#F9F7F3] min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#121212] mb-1">
              Add New Event
            </h1>
            <p className="text-sm text-gray-500">Fill in the event details below</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Event Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Event Name *</label>
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors ${focused === "name" ? "text-[#8B1E1E]" : "text-gray-400"}`}>
                      <PencilLine size={16} />
                    </div>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Event name"
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg transition-all outline-none ${
                        focused === "name" ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Date & Time *</label>
                  <div className="relative">
                    <div 
                      onClick={openDatePicker}
                      className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer transition-colors ${focused === "date" ? "text-[#8B1E1E]" : "text-gray-400"}`}
                    >
                      <CalendarDays size={16} />
                    </div>
                    <input
                      ref={dateRef}
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused("")}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg transition-all outline-none cursor-pointer 
                        ${focused === "date" ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]" : "border-gray-300"}
                        [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden
                      `}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">Location *</label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors ${focused === "location" ? "text-[#8B1E1E]" : "text-gray-400"}`}>
                    <MapPin size={16} />
                  </div>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Event location"
                    onFocus={() => setFocused("location")}
                    onBlur={() => setFocused("")}
                    className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg transition-all outline-none ${
                      focused === "location" ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Category *</label>
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors ${focused === "category" ? "text-[#8B1E1E]" : "text-gray-400"}`}>
                      <Tag size={16} />
                    </div>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      onFocus={() => setFocused("category")}
                      onBlur={() => setFocused("")}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg transition-all outline-none appearance-none bg-white ${
                        focused === "category" ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select category</option>
                      <option value="match">Match</option>
                      <option value="festival">Festival</option>
                      <option value="tournament">Tournament</option>
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Price (MAD) *</label>
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors ${focused === "price" ? "text-[#8B1E1E]" : "text-gray-400"}`}>
                      <Coins size={16} />
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      onFocus={() => setFocused("price")}
                      onBlur={() => setFocused("")}
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg transition-all outline-none ${
                        focused === "price" ? "border-[#8B1E1E] ring-1 ring-[#8B1E1E]" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">Event Image *</label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-4 transition-all ${
                    focused === "image" 
                      ? "border-[#8B1E1E] bg-[#8B1E1E]/5" 
                      : "border-gray-300 hover:border-[#8B1E1E]"
                  }`}
                >
                  {formData.image ? (
                    <div className="flex flex-col items-center">
                      {/* Prévisualisation de l'image */}
                      <div className="relative w-full max-w-xs mb-3">
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-[#8B1E1E] text-white p-1 rounded-full hover:bg-[#6b1717] transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      {/* Button change image */}
                      <label 
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-[#8B1E1E] hover:text-[#C6A75E] transition-colors"
                      >
                        <Upload size={16} />
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <label 
                      htmlFor="image-upload" 
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#8B1E1E]/10 flex items-center justify-center mb-3">
                        <ImagePlus className="text-[#8B1E1E]" size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 mb-1">
                        Click to upload image
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, JPEG up to 5MB
                      </span>
                    </label>
                  )}
                  <input 
                    type="file" 
                    name="image" 
                    id="image-upload" 
                    hidden 
                    onChange={handleChange}
                    onFocus={() => setFocused("image")}
                    onBlur={() => setFocused("")}
                    accept="image/*"
                  />
                </div>
              </div>

              {error && <p className="text-[#8B1E1E] text-xs font-bold text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8B1E1E] to-[#c42e2e] hover:from-[#C6A75E] hover:to-[#d4b776] hover:text-[#121212] text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </span>
                ) : (
                  "Create Event"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}