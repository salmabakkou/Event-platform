import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Loader2,
  Phone,
  Mail,
  User,
  MapPin,
  Ticket,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import { clearCart } from "../../redux/slices/cartSlice";
import { placeOrder } from "../../api/orders.api";

export default function Checkout() {
  // AJOUT: Récupère totalQuantity depuis Redux
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation manuelle
    const { fullName, email, phone, address } = formData;
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);

    const orderData = {
      customer: formData,
      items: items,
      totalAmount: totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      // 1️⃣ Enregistrement commande
      await placeOrder(orderData);

      // 2️⃣ Webhook n8n
      try {
        await axios.post(
          import.meta.env.VITE_URL_WEBHOOK,
          orderData
        );
      } catch (err) {
        console.error("n8n error:", err);
      }

      // 3️⃣ Succès UI
      setIsSuccess(true);

      setTimeout(() => {
        dispatch(clearCart());
        navigate("/");
      }, 3000);

    } catch (error) {
      alert("Error processing order. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-gradient-to-br from-[#0b3d2e] to-[#0a3528] rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle size={70} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center max-w-md mb-8"
        >
          Thank you for your purchase! Your tickets have been sent to your email.
          <br />
          <span className="text-sm text-gray-500 mt-2 block">
            Redirecting to homepage...
          </span>
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-gray-600 hover:text-[#0b3d2e] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#0b3d2e] group-hover:bg-[#0b3d2e]/5 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Back to Cart</span>
          </button>

          {/* CORRECTION: Utilise totalQuantity au lieu de items.length */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#0b3d2e] to-[#0a3528] px-4 py-2 rounded-lg shadow-md">
            <Ticket size={18} className="text-white" />
            <span className="font-bold text-white">
              {totalQuantity} {totalQuantity === 1 ? "Ticket" : "Tickets"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8b1e1e] to-[#7a1a1a] flex items-center justify-center shadow-md">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Attendee Details
                  </h2>
                  <p className="text-gray-500">
                    Information for ticket delivery
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Your full name"
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b1e1e] focus:border-[#8b1e1e] outline-none transition-all"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 text-gray-400" size={18} />
                      <input
                        type="tel"
                        placeholder="+212 XXX XXX XXX"
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b1e1e] focus:border-[#8b1e1e] outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b1e1e] focus:border-[#8b1e1e] outline-none transition-all"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                    <textarea
                      placeholder="Complete address for ticket delivery"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b1e1e] focus:border-[#8b1e1e] outline-none h-40 resize-none transition-all"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-[#8b1e1e] to-[#7a1a1a] text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      <CreditCard size={24} />
                      Complete Purchase - {totalPrice.toFixed(2)} MAD
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Récapitulatif */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-[#0b3d2e] to-[#0a3528] text-white rounded-xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                      <div>
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-sm text-white/70">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-white">
                      {(item.price * item.quantity).toFixed(2)} MAD
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/20">
                <div className="flex justify-between text-white/90">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)} MAD</span>
                </div>

                <div className="flex justify-between text-white/90">
                  <span>Shipping</span>
                  <span className="text-white font-bold">FREE</span>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-white/30">
                  <div>
                    <p className="text-xl font-bold">Total</p>
                    <p className="text-sm text-white/70">All taxes included</p>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {totalPrice.toFixed(2)} MAD
                  </p>
                </div>
              </div>
            </div>

            {/* Section de garanties */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Check size={20} className="text-[#0b3d2e]" />
                Order Confirmation
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-[#0b3d2e]/10 flex items-center justify-center">
                    <CheckCircle size={14} className="text-[#0b3d2e]" />
                  </div>
                  <span>Instant email confirmation</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-[#0b3d2e]/10 flex items-center justify-center">
                    <CheckCircle size={14} className="text-[#0b3d2e]" />
                  </div>
                  <span>Digital tickets delivered within 5 minutes</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-[#0b3d2e]/10 flex items-center justify-center">
                    <CheckCircle size={14} className="text-[#0b3d2e]" />
                  </div>
                  <span>24/7 customer support available</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}