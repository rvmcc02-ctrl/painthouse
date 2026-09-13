import React from 'react';
import { StoreLocation } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Palette, 
  Layers, 
  Calculator, 
  ChevronRight, 
  Award, 
  Truck, 
  Clock 
} from 'lucide-react';

interface HeroProps {
  selectedStore: StoreLocation;
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedStore,
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <section id="hero" className="relative bg-[#172632] text-white overflow-hidden">
      {/* Decorative background gradients and subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,60,71,0.8),transparent_50%)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/15 px-3 py-1 rounded-full text-xs font-medium text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rhode Island's Premier Benjamin Moore & Hunter Douglas Retailer</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Bring Your Vision to Life with Rhode Island’s <span className="text-amber-200 italic font-normal">Color & Design</span> Experts.
            </h1>

            {/* Subheading */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Serving homeowners, interior designers, and painting contractors for over 60 years. 
              Discover premium Benjamin Moore architectural paints, custom Hunter Douglas window treatments, 
              designer wallpaper, and personalized color consultations at our 5 state-of-the-art Rhode Island showrooms.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-launch-visualizer-btn"
                onClick={() => onNavigate('visualizer')}
                className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm px-6 py-3.5 rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Palette className="w-4 h-4 text-stone-950" />
                <span>Launch Room Visualizer</span>
                <ChevronRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                id="hero-explore-paints-btn"
                onClick={() => onNavigate('paints')}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm px-5 py-3.5 rounded-lg backdrop-blur-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-300" />
                <span>Explore Paints & Stains</span>
              </button>

              <button
                id="hero-book-consult-btn"
                onClick={onOpenConsultation}
                className="text-stone-300 hover:text-white text-sm font-medium px-4 py-3.5 flex items-center gap-1.5 transition-colors underline underline-offset-4 cursor-pointer"
              >
                <span>Book In-Home Consultation</span>
              </button>
            </div>

            {/* Selected Store Status Card */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-stone-300">
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-md border border-white/5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white">{selectedStore.name}</span>
                  <span className="mx-1 text-stone-400">•</span>
                  <span className="text-emerald-400 font-medium">{selectedStore.openUntilText}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-stone-300">
                <Truck className="w-4 h-4 text-amber-300" />
                <span>Free Jobsite Delivery for Pros in RI</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="The Color House Designer Living Space with Benjamin Moore Color"
                className="w-full h-80 sm:h-96 object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/90 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                      Trending New England Color
                    </span>
                    <span className="text-stone-300 text-xs font-mono">HC-154</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white flex items-center justify-between">
                    <span>Hale Navy & Simply White</span>
                    <span className="text-xs font-sans font-normal text-amber-200">LRV 8.4</span>
                  </h3>

                  <p className="text-stone-300 text-xs leading-relaxed">
                    Paired seamlessly with Hunter Douglas custom Silhouette® Shadings for filtered seaside daylight.
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center -space-x-1.5">
                      <div className="w-5 h-5 rounded-full border border-white bg-[#2F3C47]" title="Hale Navy (HC-154)" />
                      <div className="w-5 h-5 rounded-full border border-white bg-[#CBC6B8]" title="Revere Pewter (HC-172)" />
                      <div className="w-5 h-5 rounded-full border border-white bg-[#F0EFEA]" title="White Dove (OC-17)" />
                      <div className="w-5 h-5 rounded-full border border-white bg-[#4B6B75]" title="Aegean Teal (2136-40)" />
                    </div>

                    <button
                      onClick={() => onNavigate('visualizer')}
                      className="text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      Try on Your Walls →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Metric Badges */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white text-stone-900 px-4 py-2.5 rounded-xl shadow-xl border border-stone-200 flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-600" />
              <div>
                <p className="text-xs font-bold leading-tight">60+ Years in Rhode Island</p>
                <p className="text-[10px] text-stone-600">Family Owned & Operated</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white text-stone-900 px-4 py-2 rounded-xl shadow-xl border border-stone-200 hidden sm:flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold">5 Rhode Island Stores Open</span>
            </div>
          </div>
        </div>

        {/* Category Quick Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-white/10">
          <button
            onClick={() => onNavigate('paints')}
            className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-amber-400/40 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Paints & Stains</span>
              <Layers className="w-4 h-4 text-stone-400 group-hover:text-amber-300 transition-colors" />
            </div>
            <p className="font-serif font-bold text-white text-base">Aura & Regal Select</p>
            <p className="text-[11px] text-stone-400 mt-1">Interior, exterior, cabinet & deck</p>
          </button>

          <button
            onClick={() => onNavigate('window-treatments')}
            className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-amber-400/40 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Window Treatments</span>
              <Sparkles className="w-4 h-4 text-stone-400 group-hover:text-amber-300 transition-colors" />
            </div>
            <p className="font-serif font-bold text-white text-base">Hunter Douglas Gallery</p>
            <p className="text-[11px] text-stone-400 mt-1">Motorized shades, blinds & shutters</p>
          </button>

          <button
            onClick={() => onNavigate('visualizer')}
            className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-amber-400/40 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Room Visualizer</span>
              <Palette className="w-4 h-4 text-stone-400 group-hover:text-amber-300 transition-colors" />
            </div>
            <p className="font-serif font-bold text-white text-base">Test 3,500+ Colors</p>
            <p className="text-[11px] text-stone-400 mt-1">Instant living room, kitchen & bedroom simulation</p>
          </button>

          <button
            onClick={() => onNavigate('calculator')}
            className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-amber-400/40 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Paint Calculator</span>
              <Calculator className="w-4 h-4 text-stone-400 group-hover:text-amber-300 transition-colors" />
            </div>
            <p className="font-serif font-bold text-white text-base">Accurate Gallon Estimator</p>
            <p className="text-[11px] text-stone-400 mt-1">Calculates walls, doors, coats & primers</p>
          </button>
        </div>
      </div>
    </section>
  );
};
