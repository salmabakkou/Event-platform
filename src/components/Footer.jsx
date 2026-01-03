import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-[#0B3D2E] to-[#083024] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EventSphere</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your premier destination for unforgettable events and experiences. Book tickets for matches, festivals, tournaments and more.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-white/20">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A75E] rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A75E] rounded-full"></span>
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A75E] rounded-full"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A75E] rounded-full"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-white/20">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#C6A75E] mt-1 shrink-0" size={18} />
                <span className="text-gray-300 text-sm">
                  123 Event Street, City Center<br />
                  Casablanca, Morocco
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#C6A75E] shrink-0" size={18} />
                <span className="text-gray-300 text-sm">+212 6 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#C6A75E] shrink-0" size={18} />
                <span className="text-gray-300 text-sm">contact@eventsphere.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 border-b border-white/20">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get updates on upcoming events and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#C6A75E] focus:ring-1 focus:ring-[#C6A75E]"
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-[#C6A75E] to-[#d4b776] hover:from-[#d4b776] hover:to-[#C6A75E] text-[#121212] font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/20">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © {currentYear} EventSphere. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span>Payment Methods:</span>
              <div className="flex gap-1">
                <span className="px-2 py-1 bg-white/10 rounded text-xs">VISA</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">MC</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}