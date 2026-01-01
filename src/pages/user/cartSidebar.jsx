import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart, removeFromCart, deleteFromCart, toggleCart, clearCart } from '../../redux/slices/cartSlice';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice, isCartOpen } = useSelector((state) => state.cart);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header  */}
            <div className="px-6 py-5 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Your Selection ({totalQuantity})</h2>
              <button onClick={() => dispatch(toggleCart())} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* List - Product  */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <p className="text-sm">Your cart is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} dispatch={dispatch} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Minimalist Price & Strong CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">{totalPrice.toFixed(2)} MAD</span>
                </div>
                
                <button className="w-full py-4 bg-[#0B3D2E] text-white font-bold rounded-lg shadow-lg hover:bg-[#082d22] transition-all flex items-center justify-center gap-3 mb-3">
                  <CreditCard size={18} />
                  Checkout Now
                </button>
                
                <button 
                  onClick={() => dispatch(clearCart())}
                  className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest font-semibold"
                >
                  Clear My Selection
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartItem({ item, dispatch }) {
  return (
    <div className="flex gap-4 items-center">
      {/* Image mise en valeur */}
      <div className="relative group">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-100 shadow-sm" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-gray-800 truncate pr-2">{item.name}</h4>
          <button onClick={() => dispatch(deleteFromCart(item.id))} className="text-gray-300 hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
        
        {/* Prix unitaire */}
        <p className="text-xs text-gray-500 mb-2">{item.price} MAD / unit</p>
        
        {/* Contrôles de quantité  */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-gray-200 rounded-md">
            <button onClick={() => dispatch(removeFromCart(item.id))} className="px-2 py-1 hover:bg-gray-50 text-gray-400"><Minus size={12} /></button>
            <span className="px-2 text-xs font-bold text-gray-700">{item.quantity}</span>
            <button onClick={() => dispatch(addToCart(item))} className="px-2 py-1 hover:bg-gray-50 text-gray-400"><Plus size={12} /></button>
          </div>
          {/* Prix total */}
          <span className="text-sm font-bold text-[#0B3D2E]">{(item.price * item.quantity).toFixed(2)} MAD</span>
        </div>
      </div>
    </div>
  );
}
