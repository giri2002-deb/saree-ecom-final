import React, { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && items.length === 0) {
      const timer = setTimeout(onClose, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, items.length, onClose]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-amber-600 w-6 h-6" />
              <h2 className="text-xl font-semibold">Shopping Bag</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Empty Cart */}
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 animate-fade-in">
              Your bag is empty
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <p className="text-sm text-gray-600">{getItemCount()} items</p>

                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-6 last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="font-semibold text-lg">₹{item.price.toLocaleString()}</p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="h-8 w-8 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t px-6 py-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>₹{getTotal().toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Tax included and shipping calculated at checkout
                </p>

                {/* Terms */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="rounded" />
                  <label htmlFor="terms" className="text-sm">
                    I agree with <span className="underline">Terms & Conditions</span>
                  </label>
                </div>

                {/* Buttons */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 text-lg font-medium rounded"
                >
                  CHECKOUT
                </button>
                <button
                  className="w-full border border-gray-300 py-3 text-sm font-medium rounded hover:bg-gray-50"
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                >
                  VIEW BAG
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
