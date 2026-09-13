import React, { useState } from 'react';
import { STORES } from '../data/stores';
import { StoreLocation } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Check, 
  ArrowRight,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectStore: (store: StoreLocation) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectStore,
  onOpenConsultation,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
    }
  };

  return (
    <footer className="bg-[#132533] text-stone-300 pt-16 pb-12 border-t border-stone-800" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Promo Banner */}
        <div className="bg-gradient-to-r from-[#1B2E3C] to-[#253D4F] rounded-3xl p-8 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Color House Insider</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Get $10 Off Your Next Gallon of Benjamin Moore
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Sign up for seasonal color forecasts, Hunter Douglas rebate promotions, and design advice from our Rhode Island color stylists.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            {newsletterSubmitted ? (
              <div className="bg-emerald-900/80 border border-emerald-500/50 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Check your inbox for your $10 in-store voucher.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md"
                >
                  Claim $10 Voucher
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5 Rhode Island Showrooms Directory Grid */}
        <div className="pt-6 border-t border-white/10">
          <h4 className="font-serif font-bold text-lg text-white mb-6 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Our 5 Rhode Island Locations</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-xs">
            {STORES.map((store) => (
              <div key={store.id} className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm font-serif">{store.shortName}</strong>
                  {store.isFlagship && (
                    <span className="text-[9px] bg-amber-500/30 text-amber-300 font-bold px-1.5 py-0.2 rounded">
                      Flagship
                    </span>
                  )}
                </div>
                <p className="text-stone-300 leading-tight">{store.address}</p>
                <p className="text-stone-400">{store.city}, RI {store.zip}</p>
                <p className="pt-1">
                  <a href={`tel:${store.phone.replace(/[^0-9]/g, '')}`} className="text-amber-300 font-semibold hover:underline">
                    {store.phone}
                  </a>
                </p>
                <p className="text-[11px] text-stone-400">
                  Mon-Fri: {store.hours.weekdays.split('-')[0].trim()} - {store.hours.weekdays.split('-')[1]?.trim()}
                </p>
                <button
                  onClick={() => {
                    onSelectStore(store);
                    onNavigate('stores');
                  }}
                  className="text-[11px] text-stone-300 hover:text-white underline pt-1 block cursor-pointer"
                >
                  View Details & Map →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation & Services Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 text-xs">
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Benjamin Moore Paints
            </h5>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => onNavigate('paints')} className="hover:text-white cursor-pointer">Aura® Luxury Interior</button></li>
              <li><button onClick={() => onNavigate('paints')} className="hover:text-white cursor-pointer">Regal® Select Interior</button></li>
              <li><button onClick={() => onNavigate('paints')} className="hover:text-white cursor-pointer">ben® Easy Care Zero VOC</button></li>
              <li><button onClick={() => onNavigate('paints')} className="hover:text-white cursor-pointer">SCUFF-X® Commercial</button></li>
              <li><button onClick={() => onNavigate('paints')} className="hover:text-white cursor-pointer">Advance® Cabinet Enamel</button></li>
              <li><button onClick={() => onNavigate('paints')} className="hover:text-white cursor-pointer">Element Guard® Exterior</button></li>
              <li><button onClick={() => onNavigate('paints')} className="hover:text-white cursor-pointer">Woodluxe® Deck & Shingle Stain</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Hunter Douglas Window Coverings
            </h5>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => onNavigate('window-treatments')} className="hover:text-white cursor-pointer">Duette® Honeycomb Shades</button></li>
              <li><button onClick={() => onNavigate('window-treatments')} className="hover:text-white cursor-pointer">Silhouette® Window Shadings</button></li>
              <li><button onClick={() => onNavigate('window-treatments')} className="hover:text-white cursor-pointer">Heritance® Hardwood Shutters</button></li>
              <li><button onClick={() => onNavigate('window-treatments')} className="hover:text-white cursor-pointer">Luminette® Privacy Sheers</button></li>
              <li><button onClick={() => onNavigate('window-treatments')} className="hover:text-white cursor-pointer">PowerView® Smart Motorization</button></li>
              <li><button onClick={onOpenConsultation} className="hover:text-white cursor-pointer text-amber-300">Free In-Home Laser Measuring</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Design Tools & Services
            </h5>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={() => onNavigate('visualizer')} className="hover:text-white cursor-pointer">Interactive Room Color Visualizer</button></li>
              <li><button onClick={() => onNavigate('colors')} className="hover:text-white cursor-pointer">3,500+ Color Formula Explorer</button></li>
              <li><button onClick={() => onNavigate('calculator')} className="hover:text-white cursor-pointer">Gallon Coverage Paint Calculator</button></li>
              <li><button onClick={() => onNavigate('color-matcher')} className="hover:text-white cursor-pointer">Smart Color & Photo Matcher</button></li>
              <li><button onClick={onOpenConsultation} className="hover:text-white cursor-pointer">In-Store Color Consultation</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white cursor-pointer">PaintCare RI Recycling</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Contractor & Trade Desk
            </h5>
            <ul className="space-y-2 text-stone-400">
              <li><button onClick={onOpenConsultation} className="hover:text-white cursor-pointer">Commercial Credit Accounts</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white cursor-pointer">Free Jobsite Delivery Across RI</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white cursor-pointer">Graco & Festool Sprayer Repair</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white cursor-pointer">Architectural Submittal Support</button></li>
              <li><span className="text-stone-300">Contractor Hotline: (401) 942-8888</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal & Authorizations */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white">THE COLOR HOUSE</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} The Color House. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Authorized Benjamin Moore® & Hunter Douglas® Gallery Retailer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
