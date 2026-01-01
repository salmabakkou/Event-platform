import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Optionnel pour l'animation
import { addToCart, removeFromCart, deleteFromCart, toggleCart, clearCart } from '../../redux/slices/cartSlice';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice, isCartOpen } = useSelector((state) => state.cart);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay (fond flou/sombre) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all"
          />
          
          {/* Sidebar */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-xl flex flex-col"
          >
            
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-3 font-bold text-xl">
                <ShoppingCart className="text-[#0B3D2E]" />
                <span>Panier ({totalQuantity})</span>
              </div>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingCart size={64} strokeWidth={1} />
                  <p className="text-lg">Votre panier est vide</p>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem key={item.id} item={item} dispatch={dispatch} />
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-600 font-medium">Sous-total</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#0B3D2E]">{totalPrice.toFixed(2)} MAD</p>
                    <p className="text-xs text-gray-500">TVA incluse</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full py-4 bg-[#0B3D2E] text-white font-bold rounded-xl hover:bg-[#082d22] transition-colors flex items-center justify-center gap-2">
                    <CreditCard size={20} />
                    Commander
                  </button>
                  <button 
                    onClick={() => { if(window.confirm("Vider le panier ?")) dispatch(clearCart()) }}
                    className="text-sm text-red-500 hover:underline py-2"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Sous-composant pour un article (Clean Code : Extraction)
function CartItem({ item, dispatch }) {
  return (
    <div className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100" />
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
          <button onClick={() => dispatch(deleteFromCart(item.id))} className="text-gray-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="font-bold text-[#0B3D2E]">{item.price} MAD</p>
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1 border">
            <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-600 hover:text-black">
              <Minus size={14} />
            </button>
            <span className="font-semibold min-w-[20px] text-center">{item.quantity}</span>
            <button onClick={() => dispatch(addToCart(item))} className="text-gray-600 hover:text-black">
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
