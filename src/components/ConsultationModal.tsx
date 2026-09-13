import React, { useState } from 'react';
import { StoreLocation } from '../types';
import { STORES } from '../data/stores';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Palette, 
  Ruler, 
  Sparkles,
  Home
} from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStore: StoreLocation;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  selectedStore,
}) => {
  const [serviceType, setServiceType] = useState<string>('In-Store Color Consultation');
  const [storeId, setStoreId] = useState<string>(selectedStore.id);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('2026-09-18');
  const [preferredTime, setPreferredTime] = useState<string>('10:00 AM');
  const [roomsCount, setRoomsCount] = useState<number>(2);
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'CH-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmationCode(randomCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const chosenStore = STORES.find(s => s.id === storeId) || selectedStore;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-md mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Complimentary Design Services</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#132533]">
              Book Your Design Consultation
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Meet with certified Benjamin Moore color stylists or Hunter Douglas window experts.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Confirmation #{confirmationCode}
              </span>
              <h3 className="font-serif font-bold text-2xl text-stone-900 mt-3">
                Your Consultation is Confirmed!
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{name}</strong>. A design specialist from our <strong>{chosenStore.name}</strong> team will contact you at <strong>{phone}</strong> to confirm project details.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Service:</span>
                <span className="font-semibold text-stone-900">{serviceType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Showroom Location:</span>
                <span className="font-semibold text-stone-900">{chosenStore.shortName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Preferred Date & Time:</span>
                <span className="font-semibold text-stone-900">{preferredDate} at {preferredTime}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Project Scope:</span>
                <span className="font-semibold text-stone-900">{roomsCount} Room(s)</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#1B2E3C] hover:bg-[#132533] text-white font-bold text-xs py-3 px-8 rounded-xl transition-colors cursor-pointer shadow-md"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                1. Select Consultation Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'In-Store Color Consultation',
                    title: 'In-Store Color Consultation',
                    desc: 'Work with certified color specialists in our showroom lighting lab.',
                    icon: Palette
                  },
                  {
                    id: 'In-Home Window Treatments',
                    title: 'In-Home Hunter Douglas Measure',
                    desc: 'Laser measurement & fabric selection right on your windows.',
                    icon: Ruler
                  },
                  {
                    id: 'Contractor Pro Service',
                    title: 'Contractor Pro Consultation',
                    desc: 'Commercial account setup, submittals, and jobsite delivery.',
                    icon: Home
                  },
                  {
                    id: 'Wallpaper & Finishes',
                    title: 'Wallpaper & Specialty Finishes',
                    desc: 'Explore luxury grasscloths, murals, and faux finishes.',
                    icon: Sparkles
                  }
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceType(s.id)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        serviceType === s.id
                          ? 'bg-amber-50/70 border-amber-600 ring-2 ring-amber-500/20 shadow-xs'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${serviceType === s.id ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">{s.title}</p>
                        <p className="text-[11px] text-stone-500 leading-tight mt-0.5">{s.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Store Selection & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  2. Select Showroom:
                </label>
                <select
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                >
                  {STORES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Preferred Date:
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Preferred Time:
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                >
                  <option value="9:00 AM">9:00 AM (Morning)</option>
                  <option value="11:00 AM">11:00 AM (Mid-Day)</option>
                  <option value="1:30 PM">1:30 PM (Early Afternoon)</option>
                  <option value="3:30 PM">3:30 PM (Late Afternoon)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Approx. Rooms:
                </label>
                <select
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                >
                  <option value={1}>1 Room / Accent</option>
                  <option value={2}>2 - 3 Rooms</option>
                  <option value={5}>Whole House (4+ Rooms)</option>
                  <option value={8}>Commercial / Exterior Project</option>
                </select>
              </div>
            </div>

            {/* Client Contact Info */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                3. Contact Information:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Tell us a little about your space, lighting conditions, or color goals..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500">
                No payment required • 100% complimentary consultation
              </span>
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Confirm Appointment Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
