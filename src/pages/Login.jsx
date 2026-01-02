import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@admin.com";
  const ADMIN_PASSWORD = "123456";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      dispatch(login({ role: "admin" }));
      navigate("/admin/dashboard");
    } else {
      dispatch(login({ role: "user" }));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F3] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Carte de login */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#0B3D2E]/5 to-transparent">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#121212]">Sign In</h2>
              <p className="text-gray-600 mt-1">Access your account</p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E]/20 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E]/20 outline-none"
                  />
                </div>
              </div>

              {/* Bouton */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0B3D2E] to-[#1a5c48] text-white font-medium py-2.5 rounded-lg hover:from-[#1a5c48] hover:to-[#0B3D2E] transition-all duration-200"
              >
                Continue
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}