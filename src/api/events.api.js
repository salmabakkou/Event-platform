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

