import React, { useState } from 'react';
import { CartItem, StoreLocation } from '../types';
import { STORES } from '../data/stores';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  selectedStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedStore,
  onSelectStore,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const riTax = subtotal * 0.07; // Rhode Island 7% sales tax
  const total = subtotal + riTax;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
  };

  const handleCloseAndReset = () => {
    setOrderComplete(false);
    setIsCheckingOut(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Top Bar */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1B2E3C]" />
              <h2 className="font-serif font-bold text-xl text-stone-900">Your Paint Order</h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pickup Store Selector Banner */}
          <div className="bg-[#FAF9F6] px-6 py-3 border-b border-stone-200">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Pickup At: <strong>{selectedStore.shortName}</strong></span>
              </div>
              <select
                value={selectedStore.id}
                onChange={(e) => {
                  const store = STORES.find(s => s.id === e.target.value);
                  if (store) onSelectStore(store);
                }}
                className="text-[11px] bg-white border border-stone-300 rounded-md px-2 py-1 font-semibold text-stone-800"
              >
                {STORES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortName}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-emerald-800 font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Ready in 15–30 mins during store hours</span>
            </p>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-900">
                  Curbside Order Received!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  Thank you, <strong>{customerName}</strong>. Our tint master at <strong>{selectedStore.name}</strong> has received your formulation and is preparing your order for pickup.
                </p>
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-stone-200 text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Pickup Location:</span>
                    <span className="font-bold text-stone-900">{selectedStore.address}, {selectedStore.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Contact Phone:</span>
                    <span className="font-mono text-stone-900">{customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Total Charged:</span>
                    <span className="font-bold text-emerald-800">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCloseAndReset}
                  className="w-full bg-[#1B2E3C] hover:bg-[#132533] text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Close & Back to Store
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Simple Express Store Checkout Form */
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
                  <strong>Express In-Store / Curbside Pickup</strong>
                  <p className="mt-0.5 text-[11px] text-amber-800">
                    No waiting at the tint counter! Your order will be mixed and bagged ready with your name.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. John Miller"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Cell Phone (for pickup text):</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(401) 555-0192"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Pickup Vehicle / Parking spot notes (optional):</label>
                  <input
                    type="text"
                    placeholder="e.g. Silver Subaru or In-Store Counter"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-900 py-2.5 px-3"
                  >
                    ← Back to Bag
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs py-3 px-4 rounded-xl shadow-md cursor-pointer transition-all"
                  >
                    Place Pickup Order (${total.toFixed(2)})
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty Bag State */
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-stone-700 font-semibold text-sm">Your paint bag is empty</p>
                <p className="text-stone-500 text-xs max-w-xs mx-auto">
                  Browse our Benjamin Moore paints, test sample pots, or calculate your room volume to add items.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs font-bold text-[#1B2E3C] hover:underline"
                >
                  Continue Browsing →
                </button>
              </div>
            ) : (
              /* Cart Item List */
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FAF9F6] rounded-xl border border-stone-200 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Color chip or image */}
                      {item.colorHex ? (
                        <div
                          className="w-10 h-10 rounded-lg border border-stone-300 shadow-inner shrink-0"
                          style={{ backgroundColor: item.colorHex }}
                        />
                      ) : (
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80'}
                          alt={item.productName}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-300 shrink-0"
                        />
                      )}

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate leading-tight">
                          {item.productName}
                        </h4>
                        {item.colorName && (
                          <p className="text-[11px] text-stone-600">
                            Color: <strong className="text-stone-900">{item.colorName}</strong> ({item.colorCode})
                          </p>
                        )}
                        {item.sheen && (
                          <p className="text-[10px] text-stone-500">Sheen: {item.sheen}</p>
                        )}
                        <p className="text-[10px] text-stone-500">{item.sizeLabel}</p>
                        <p className="text-xs font-bold text-amber-900 mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded text-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {!orderComplete && items.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rhode Island Sales Tax (7%):</span>
                  <span>${riTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-100">
                  <span>Estimated Total:</span>
                  <span className="font-serif text-lg text-[#1B2E3C]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="checkout-curbside-btn"
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-[#1B2E3C] hover:bg-[#132533] text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Curbside Pickup</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <div className="text-center text-[11px] text-stone-500">
                Pick up in-store or curbside at our {selectedStore.shortName} location
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
