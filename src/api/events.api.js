import axios from "axios";
import { api } from "./axiosConfig";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dodacbzhu/upload";
const UPLOAD_PRESET = "EventPlatform";

// Admin AddEvent
export const addEvent = async (formData) => {
  let imageUrl = "";

  if (formData.image instanceof File) {
    const imageData = new FormData();
    imageData.append("file", formData.image);
    imageData.append("upload_preset", UPLOAD_PRESET);

    const cloudinaryRes = await axios.post(CLOUDINARY_URL, imageData);
    imageUrl = cloudinaryRes.data.secure_url;
  }

  const event = {
    name: formData.name,
    date: formData.date,
    location: formData.location,
    category: formData.category,
    description: formData.description,
    price: Number(formData.price),
    image: imageUrl,
  };

  const res = await api.post("/events", event);
  return res.data;
};
// -------------------- GET EVENTS --------------------
export const getEvents = () => api.get("/events");

// -------------------- DELETE EVENT --------------------
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// -------------------- UPDATE EVENT --------------------
export const updateEvent = async (id, updatedData) => {
  let imageUrl = updatedData.image;

  // upload image seulement si elle est modifiée
  if (updatedData.image instanceof File) {
    const data = new FormData();
    data.append("file", updatedData.image);
    data.append("upload_preset", UPLOAD_PRESET);

    const cloudinaryRes = await axios.post(CLOUDINARY_URL, data);
    imageUrl = cloudinaryRes.data.secure_url;
  }

  const event = {
    ...updatedData,
    price: Number(updatedData.price),
    image: imageUrl,
  };

  const res = await api.put(`/events/${id}`, event);
  return res.data;
};

