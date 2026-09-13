import React, { useState } from 'react';
import { WINDOW_TREATMENTS } from '../data/windowTreatments';
import { WindowTreatment } from '../types';
import { 
  Sparkles, 
  Ruler, 
  Sun, 
  ShieldCheck, 
  Calendar, 
  Check, 
  Smartphone, 
  ChevronRight,
  Home
} from 'lucide-react';

interface WindowTreatmentsShowcaseProps {
  onOpenConsultation: () => void;
}

export const WindowTreatmentsShowcase: React.FC<WindowTreatmentsShowcaseProps> = ({
  onOpenConsultation,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<WindowTreatment>(WINDOW_TREATMENTS[0]);

  return (
    <section id="window-treatments" className="py-16 bg-[#FAF9F6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Hunter Douglas® Gallery Partner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#132533] tracking-tight">
            Custom Window Treatments & Motorization
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Elevate your home’s natural lighting and energy efficiency with custom Hunter Douglas shades, blinds, 
            and handcrafted plantation shutters. We provide complimentary in-home laser measurements throughout Rhode Island.
          </p>
        </div>

        {/* Feature Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm mb-12">
          {/* Left Column: Image with Floating Badges (6 Cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3 sm:aspect-16/10">
              <img
                src={selectedTreatment.image}
                alt={selectedTreatment.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {selectedTreatment.collection}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl mt-1 text-white">
                  {selectedTreatment.name}
                </h3>
              </div>
            </div>

            {/* In-Home Badge */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-[#1B2E3C] text-white p-3 rounded-xl shadow-xl flex items-center gap-2 text-xs border border-white/10">
              <Ruler className="w-4 h-4 text-amber-400" />
              <div>
                <p className="font-bold">Free In-Home Measurement</p>
                <p className="text-[10px] text-stone-300">Certified Rhode Island Installers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Treatment Details & Consultation CTA (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {selectedTreatment.tagline}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
                {selectedTreatment.name}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {selectedTreatment.description}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Signature Advantages:
              </span>
              <ul className="space-y-2 text-xs text-stone-600">
                {selectedTreatment.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Control Types & Opacities */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-800 block mb-1">Smart Control:</span>
                <p className="text-stone-600 text-[11px]">{selectedTreatment.controlTypes.join(', ')}</p>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-800 block mb-1">Light Filtering:</span>
                <p className="text-stone-600 text-[11px]">{selectedTreatment.opacityLevels.join(', ')}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="book-window-consult-btn"
                onClick={onOpenConsultation}
                className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs py-3 px-5 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Schedule Free In-Home Measure</span>
                <ChevronRight className="w-4 h-4 text-stone-950" />
              </button>

              <span className="text-xs text-stone-500 font-medium">
                {selectedTreatment.startingPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {WINDOW_TREATMENTS.map((treatment) => {
            const isSelected = selectedTreatment.id === treatment.id;
            return (
              <button
                key={treatment.id}
                onClick={() => setSelectedTreatment(treatment)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-amber-600 ring-2 ring-amber-500/20 shadow-md'
                    : 'bg-white/70 hover:bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="aspect-16/10 rounded-xl overflow-hidden mb-2">
                  <img src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 leading-tight">{treatment.name}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">{treatment.collection}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Value Proposition Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-stone-200 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Professional Laser Measurement</p>
              <p className="text-stone-600 mt-1 leading-relaxed">
                Our Hunter Douglas certified specialists measure window frames to the 1/16th of an inch for guaranteed fit.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Color Coordination with BM Paint</p>
              <p className="text-stone-600 mt-1 leading-relaxed">
                We coordinate fabrics, valances, and wood shutter finishes with your exact Benjamin Moore wall color palettes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">PowerView® Motorization Setup</p>
              <p className="text-stone-600 mt-1 leading-relaxed">
                Seamless smart home installation with Alexa, Apple HomeKit, Google Assistant, and handheld Pebble remotes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
