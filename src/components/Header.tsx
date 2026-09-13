import React, { useState } from 'react';
import { StoreLocation } from '../types';
import { STORES } from '../data/stores';
import { 
  MapPin, 
  Phone, 
  ShoppingBag, 
  Search, 
  Calendar, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

interface HeaderProps {
  selectedStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeNavSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedStore,
  onSelectStore,
  cartCount,
  onOpenCart,
  onOpenConsultation,
  searchQuery,
  setSearchQuery,
  activeNavSection,
  onNavigate,
}) => {
  const [isStorePickerOpen, setIsStorePickerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navItems = [
    { id: 'paints', label: 'Paints & Stains' },
    { id: 'visualizer', label: 'Room Visualizer', highlight: true },
    { id: 'colors', label: 'Color Explorer' },
    { id: 'calculator', label: 'Paint Calculator' },
    { id: 'window-treatments', label: 'Window Treatments' },
    { id: 'services', label: 'Services' },
    { id: 'stores', label: '5 RI Locations' },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200" id="site-header">
      {/* Top Utility Bar */}
      <div className="bg-[#1B2E3C] text-stone-200 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Store status & selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                id="store-switcher-button"
                onClick={() => setIsStorePickerOpen(!isStorePickerOpen)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-medium py-0.5"
                title="Change Store Location"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Selected Store: <strong>{selectedStore.shortName}</strong></span>
                <span className="hidden md:inline text-stone-400">({selectedStore.openUntilText})</span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isStorePickerOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Store dropdown */}
              {isStorePickerOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white text-stone-800 rounded-lg shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="text-xs font-bold text-stone-500 uppercase px-3 py-1.5 border-b border-stone-100 flex items-center justify-between">
                    <span>5 Rhode Island Locations</span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">All Open Today</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-stone-100 py-1">
                    {STORES.map((store) => (
                      <button
                        key={store.id}
                        id={`select-store-${store.id}`}
                        onClick={() => {
                          onSelectStore(store);
                          setIsStorePickerOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors flex items-start justify-between cursor-pointer ${
                          selectedStore.id === store.id ? 'bg-stone-100 font-semibold text-[#1B2E3C]' : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-sm">{store.shortName}</span>
                            {store.isFlagship && (
                              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">Flagship</span>
                            )}
                          </div>
                          <p className="text-stone-500 text-[11px] mt-0.5">{store.address}, {store.city}</p>
                          <p className="text-emerald-700 font-medium text-[11px] mt-0.5 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> {store.hours.weekdays}
                          </p>
                        </div>
                        {selectedStore.id === store.id && (
                          <span className="text-xs text-amber-600 font-bold">Active</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 px-2 border-t border-stone-100 text-center">
                    <button
                      onClick={() => {
                        setIsStorePickerOpen(false);
                        onNavigate('stores');
                      }}
                      className="text-xs text-[#1B2E3C] hover:underline font-semibold"
                    >
                      View All Store Hours & Directions →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <span className="hidden md:inline text-stone-500">|</span>
            <a 
              href={`tel:${selectedStore.phone.replace(/[^0-9]/g, '')}`} 
              className="hidden md:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-stone-400" />
              <span>{selectedStore.phone}</span>
            </a>
          </div>

          {/* Quick value props */}
          <div className="hidden lg:flex items-center gap-4 text-stone-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Authorized Benjamin Moore® & Hunter Douglas® Dealer
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-300">Same-Day In-Store & Curbside Pickup</span>
            <span className="text-stone-500">•</span>
            <button 
              onClick={() => onNavigate('services')}
              className="hover:text-white transition-colors font-medium text-amber-300 underline underline-offset-2"
            >
              Contractor Pro Desk
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Nav Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button 
            id="brand-logo-button"
            onClick={() => onNavigate('hero')}
            className="flex flex-col text-left group cursor-pointer"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#132533] group-hover:text-stone-700 transition-colors">
                THE COLOR HOUSE
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wider text-stone-600 uppercase">
              <span>BENJAMIN MOORE PAINTS</span>
              <span className="text-amber-700 font-bold">•</span>
              <span>HUNTER DOUGLAS</span>
              <span className="hidden sm:inline text-amber-700 font-bold">•</span>
              <span className="hidden sm:inline">WALLCOVERINGS</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeNavSection === item.id 
                    ? 'text-[#1B2E3C] bg-stone-100 font-semibold' 
                    : item.highlight
                    ? 'text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {item.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Search, Consultation & Cart CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Bar */}
            <div className="relative">
              <div className={`flex items-center border border-stone-200 rounded-full bg-stone-50 px-3 py-1.5 transition-all ${
                isSearchExpanded ? 'w-48 sm:w-64 bg-white ring-2 ring-stone-300' : 'w-36 sm:w-48'
              }`}>
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search colors, paints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setIsSearchExpanded(false)}
                  className="bg-transparent text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden pl-2 w-full"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-stone-400 hover:text-stone-600 text-xs px-1"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Book Consultation Button */}
            <button
              id="header-book-consult-btn"
              onClick={onOpenConsultation}
              className="hidden md:flex items-center gap-1.5 bg-[#1B2E3C] hover:bg-[#132533] text-white text-xs font-semibold px-3.5 py-2 rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Consultation</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-stone-700 hover:text-[#1B2E3C] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              title="View Cart & Samples"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md hover:bg-stone-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2.5 text-sm font-medium rounded-md text-left flex items-center justify-between ${
                  activeNavSection === item.id 
                    ? 'bg-stone-100 text-[#1B2E3C] font-semibold' 
                    : item.highlight
                    ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.highlight && <Sparkles className="w-4 h-4 text-amber-600" />}
                  {item.label}
                </span>
                <span className="text-xs text-stone-400">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#1B2E3C] hover:bg-[#132533] text-white font-medium text-sm py-2.5 px-4 rounded-md flex items-center justify-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Schedule Free Design Consultation</span>
            </button>
            <div className="text-center text-xs text-stone-500 pt-1">
              Store Help: <a href={`tel:${selectedStore.phone.replace(/[^0-9]/g, '')}`} className="font-semibold text-stone-700 underline">{selectedStore.phone}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
