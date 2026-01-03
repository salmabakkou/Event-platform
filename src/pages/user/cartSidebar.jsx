import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Plus, Minus, Trash2, CreditCard, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  addToCart, 
  removeFromCart, 
  deleteFromCart, 
  toggleCart, 
  clearCart 
} from '../../redux/slices/cartSlice';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalPrice, isCartOpen } = useSelector((state) => state.cart);

  const goToCheckout = () => {
    dispatch(toggleCart());
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full pb-4  my-16 sm:w-[400px] bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6   py-5 border-b border-gray-100 bg-gradient-to-r from-[#0b3d2e] to-[#0a3528]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Ticket size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Your Tickets</h2>
                    <p className="text-xs text-white/80">{totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => dispatch(toggleCart())}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                  <ShoppingCart size={56} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium text-gray-300 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400 text-center max-w-xs">
                    Browse events and add tickets to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} dispatch={dispatch} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                {/* Total */}
                <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Amount</span>
                    <p className="text-xs text-gray-400 mt-1">All taxes included</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#0b3d2e]">{totalPrice.toFixed(2)} MAD</span>
                    <p className="text-xs text-gray-500 mt-1">Free shipping</p>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <button 
                  onClick={goToCheckout}
                  className="w-full py-4 bg-gradient-to-r from-[#8b1e1e] to-[#7a1a1a] text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 mb-4 shadow-md"
                >
                  <CreditCard size={20} />
                  Checkout Now
                </button>
                
                {/* Clear Cart */}
                <button 
                  onClick={() => dispatch(clearCart())}
                  className="w-full text-sm text-gray-500 hover:text-[#8b1e1e] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear All Tickets
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
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
    >
      {/* Image */}
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-20 object-cover rounded-lg shadow-sm"
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#8b1e1e] rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">{item.quantity}</span>
        </div>
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h4>
          <button 
            onClick={() => dispatch(deleteFromCart(item.id))}
            className="text-gray-300 hover:text-[#8b1e1e] transition-colors ml-2"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        {/* Price per unit */}
        <p className="text-xs text-gray-500 mb-3">{item.price.toFixed(2)} MAD / ticket</p>
        
        {/* Quantity controls and total */}
        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => dispatch(removeFromCart(item.id))}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 hover:text-[#8b1e1e] transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
            <button 
              onClick={() => dispatch(addToCart(item))}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 hover:text-[#0b3d2e] transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          
          {/* Item total */}
          <span className="text-base font-bold text-[#0b3d2e]">
            {(item.price * item.quantity).toFixed(2)} MAD
          </span>
        </div>
      </div>
    </motion.div>
  );
}