import React, { useState } from "react";
import axios from "axios";
import { Send, Mail, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const N8NCONTACT = import.meta.env.VITE_URL_CONTACT;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Vérification des champs vides
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    // Vérification de l'email
    if (formData.email && !formData.email.includes("@")) {
      errors.email = "Email must contain @";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Effacer l'erreur du champ modifié
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation avant envoi
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(false);
    setValidationErrors({});

    try {
      await axios.post(N8NCONTACT, formData);

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("n8n error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <main className="container mx-auto px-4 max-w-2xl">
        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-[#C6A75E] to-[#d4b776] rounded-full mb-4">
            <Mail className="text-white" size={28} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#121212] mb-3">
            Contact Us
          </h1>
          
          <p className="text-gray-600 max-w-lg mx-auto">
            Have questions or need assistance? Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Champ Nom */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <User size={16} className="text-[#0B3D2E]" />
                  <span>Name</span>
                </div>
              </label>
              <input
                type="text"
                name="name"
                // RETIRÉ: required
                value={formData.name}
                onChange={handleChange}
                className={`w-full border ${validationErrors.name ? "border-red-300" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-colors`}
                placeholder="Your full name"
              />
              {validationErrors.name && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>

            {/* Champ Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={16} className="text-[#0B3D2E]" />
                  <span>Email Address</span>
                </div>
              </label>
              <input
                type="text" // Changé de "email" à "text" pour éviter la validation native
                name="email"
                // RETIRÉ: required
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${validationErrors.email ? "border-red-300" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-colors`}
                placeholder="your.email@example.com"
              />
              {validationErrors.email && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Champ Message */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare size={16} className="text-[#0B3D2E]" />
                  <span>Message</span>
                </div>
              </label>
              <textarea
                name="message"
                // RETIRÉ: required
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={`w-full border ${validationErrors.message ? "border-red-300" : "border-gray-300"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-colors resize-none`}
                placeholder="Tell us how we can help you..."
              />
              {validationErrors.message && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.message}</p>
              )}
            </div>

            {/* Bouton Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#0B3D2E] to-[#1a6b52] hover:from-[#1a6b52] hover:to-[#0B3D2E] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {/* Messages de statut */}
            {success && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-700 font-medium">
                  ✅ Your message has been sent successfully!
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-700 font-medium">
                  ❌ Error sending message. Please try again.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-10 text-center text-gray-600 text-sm">
          <p>
            We typically respond within 24 hours during business days.
          </p>
          <p className="mt-1">
            For urgent matters, please call: 
            <span className="font-medium text-[#0B3D2E] ml-1">+212 6 XX XX XX XX</span>
          </p>
        </div>
      </main>
    </div>
  );
}