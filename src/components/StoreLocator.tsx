import React, { useState } from 'react';
import { StoreLocation } from '../types';
import { STORES } from '../data/stores';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  Check, 
  Navigation, 
  ShieldCheck, 
  ExternalLink,
  Store
} from 'lucide-react';

interface StoreLocatorProps {
  selectedStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
  onOpenConsultation: () => void;
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({
  selectedStore,
  onSelectStore,
  onOpenConsultation,
}) => {
  const [activeTabStore, setActiveTabStore] = useState<StoreLocation>(selectedStore);

  const handleSelectDefault = (store: StoreLocation) => {
    setActiveTabStore(store);
    onSelectStore(store);
  };

  return (
    <section id="stores" className="py-16 bg-[#F3F0EB] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-200/80 text-stone-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Store className="w-3.5 h-3.5 text-amber-700" />
            <span>Rhode Island Showrooms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#132533] tracking-tight">
            5 Convenient Locations Across Rhode Island
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Visit any of our fully equipped Benjamin Moore and Hunter Douglas design centers. 
            Enjoy expert in-person tinting, wallpaper libraries, and certified color consultants.
          </p>
        </div>

        {/* Store Tabs Strip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {STORES.map((store) => {
            const isTab = activeTabStore.id === store.id;
            const isDefault = selectedStore.id === store.id;
            return (
              <button
                key={store.id}
                id={`store-tab-${store.id}`}
                onClick={() => setActiveTabStore(store)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isTab
                    ? 'bg-[#1B2E3C] text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isTab ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{store.shortName}</span>
                {isDefault && (
                  <span className="text-[10px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded">
                    My Store
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Store Detailed Card & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detailed Store Info (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {activeTabStore.city}, Rhode Island
                  </span>
                  {activeTabStore.isFlagship && (
                    <span className="text-xs font-bold uppercase tracking-wider bg-stone-900 text-white px-2 py-0.5 rounded">
                      Main Flagship Showroom
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-2">
                  {activeTabStore.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{activeTabStore.tagline}</p>
              </div>

              {/* Set as My Store CTA */}
              <div>
                {selectedStore.id === activeTabStore.id ? (
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Selected for Pickup</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSelectDefault(activeTabStore)}
                    className="bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Set as My Pickup Store
                  </button>
                )}
              </div>
            </div>

            {/* Quick Contact & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-xl border border-stone-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Showroom Address:</strong>
                    <span className="text-stone-600">{activeTabStore.address}</span>
                    <span className="block text-stone-600">{activeTabStore.city}, RI {activeTabStore.zip}</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(`${activeTabStore.address}, ${activeTabStore.city}, RI ${activeTabStore.zip}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <span>Get Driving Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200">
                  <Phone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Direct Phone Line:</strong>
                    <a href={`tel:${activeTabStore.phone.replace(/[^0-9]/g, '')}`} className="text-stone-700 font-semibold hover:underline">
                      {activeTabStore.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200">
                  <User className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Store Manager:</strong>
                    <span className="text-stone-600">{activeTabStore.manager}</span>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Showroom Hours:</span>
                </div>
                <div className="space-y-1.5 text-stone-600">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold text-stone-900">{activeTabStore.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span>Saturday:</span>
                    <span className="font-semibold text-stone-900">{activeTabStore.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between py-1 text-stone-400">
                    <span>Sunday:</span>
                    <span>{activeTabStore.hours.sunday}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-emerald-800 font-medium">
                  ✓ Same-day color tinting available until 30 minutes before closing.
                </div>
              </div>
            </div>

            {/* Store Features & Amenities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                Showroom Features & Specialized Equipment:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeTabStore.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="bg-[#1B2E3C] hover:bg-[#132533] text-white font-bold text-xs py-3 px-5 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Book Consultation at {activeTabStore.shortName}
              </button>
              <a
                href={`tel:${activeTabStore.phone.replace(/[^0-9]/g, '')}`}
                className="border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs py-3 px-4 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store Desk</span>
              </a>
            </div>
          </div>

          {/* Interactive Rhode Island Map Visualizer (5 Cols) */}
          <div className="lg:col-span-5 bg-[#172632] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300">
                  Interactive Showroom Map
                </span>
                <h4 className="font-serif font-bold text-xl text-white">Rhode Island Locations</h4>
              </div>
              <span className="text-xs text-stone-400">Click any pin</span>
            </div>

            {/* Stylized Vector Map of Rhode Island with Pins */}
            <div className="relative aspect-4/3 bg-black/30 rounded-2xl border border-white/10 p-4 overflow-hidden flex items-center justify-center">
              {/* Background Water and State Boundary representation */}
              <svg viewBox="0 0 300 350" className="w-full h-full max-h-72">
                {/* Narragansett Bay & Coastline Silhouette */}
                <path
                  d="M 60,30 L 220,30 L 230,120 L 260,180 L 230,230 L 240,290 L 160,320 L 60,310 L 60,30 Z"
                  fill="#1B2E3C"
                  stroke="#2F3C47"
                  strokeWidth="2"
                />
                {/* Narragansett Bay Water Inset */}
                <path
                  d="M 170,110 Q 180,180 200,240 Q 170,250 160,200 Z"
                  fill="#0F1D27"
                  opacity="0.9"
                />
                <text x="140" y="70" fill="#4B6B75" fontSize="10" fontFamily="sans-serif">PROVIDENCE</text>
                <text x="190" y="270" fill="#4B6B75" fontSize="9" fontFamily="sans-serif">NEWPORT</text>
                <text x="75" y="280" fill="#4B6B75" fontSize="9" fontFamily="sans-serif">SOUTH COUNTY</text>

                {/* 5 RI Locations Pins on map */}
                {/* 1. Cranston (approx center-north) */}
                <g 
                  className="cursor-pointer group" 
                  onClick={() => handleSelectDefault(STORES.find(s => s.id === 'cranston')!)}
                >
                  <circle cx="130" cy="115" r={activeTabStore.id === 'cranston' ? 10 : 7} fill={activeTabStore.id === 'cranston' ? '#D97706' : '#FFFFFF'} />
                  <circle cx="130" cy="115" r="4" fill="#172632" />
                  <text x="138" y="118" fill="#FFF" fontSize="10" fontWeight="bold">Cranston (Flagship)</text>
                </g>

                {/* 2. Smithfield (northwest) */}
                <g 
                  className="cursor-pointer group" 
                  onClick={() => handleSelectDefault(STORES.find(s => s.id === 'smithfield')!)}
                >
                  <circle cx="110" cy="65" r={activeTabStore.id === 'smithfield' ? 10 : 7} fill={activeTabStore.id === 'smithfield' ? '#D97706' : '#FFFFFF'} />
                  <circle cx="110" cy="65" r="4" fill="#172632" />
                  <text x="118" y="68" fill="#FFF" fontSize="10" fontWeight="bold">Smithfield</text>
                </g>

                {/* 3. North Kingstown (central coast) */}
                <g 
                  className="cursor-pointer group" 
                  onClick={() => handleSelectDefault(STORES.find(s => s.id === 'north-kingstown')!)}
                >
                  <circle cx="135" cy="180" r={activeTabStore.id === 'north-kingstown' ? 10 : 7} fill={activeTabStore.id === 'north-kingstown' ? '#D97706' : '#FFFFFF'} />
                  <circle cx="135" cy="180" r="4" fill="#172632" />
                  <text x="143" y="183" fill="#FFF" fontSize="10" fontWeight="bold">N. Kingstown</text>
                </g>

                {/* 4. Wakefield (south) */}
                <g 
                  className="cursor-pointer group" 
                  onClick={() => handleSelectDefault(STORES.find(s => s.id === 'wakefield')!)}
                >
                  <circle cx="120" cy="250" r={activeTabStore.id === 'wakefield' ? 10 : 7} fill={activeTabStore.id === 'wakefield' ? '#D97706' : '#FFFFFF'} />
                  <circle cx="120" cy="250" r="4" fill="#172632" />
                  <text x="128" y="253" fill="#FFF" fontSize="10" fontWeight="bold">Wakefield</text>
                </g>

                {/* 5. Middletown (Aquidneck Island / Newport) */}
                <g 
                  className="cursor-pointer group" 
                  onClick={() => handleSelectDefault(STORES.find(s => s.id === 'middletown')!)}
                >
                  <circle cx="210" cy="210" r={activeTabStore.id === 'middletown' ? 10 : 7} fill={activeTabStore.id === 'middletown' ? '#D97706' : '#FFFFFF'} />
                  <circle cx="210" cy="210" r="4" fill="#172632" />
                  <text x="218" y="213" fill="#FFF" fontSize="10" fontWeight="bold">Middletown</text>
                </g>
              </svg>
            </div>

            {/* Quick Directory list */}
            <div className="space-y-2 text-xs">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Quick Phone Directory:
              </span>
              <div className="divide-y divide-white/10">
                {STORES.map((s) => (
                  <div key={s.id} className="py-2 flex items-center justify-between">
                    <button
                      onClick={() => handleSelectDefault(s)}
                      className={`hover:underline text-left cursor-pointer ${
                        activeTabStore.id === s.id ? 'text-amber-300 font-bold' : 'text-stone-300'
                      }`}
                    >
                      {s.name}
                    </button>
                    <a href={`tel:${s.phone.replace(/[^0-9]/g, '')}`} className="font-mono text-stone-400 hover:text-white">
                      {s.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
