import React, { useState } from 'react';
import { Calculator, Check, ShoppingBag, Layers, Info } from 'lucide-react';
import { SheenType } from '../types';

interface PaintCalculatorProps {
  onAddToCart: (item: {
    productName: string;
    brand: string;
    colorName?: string;
    colorCode?: string;
    sheen?: SheenType;
    sizeLabel: string;
    price: number;
    type: 'paint-can' | 'supply';
  }) => void;
}

export const PaintCalculator: React.FC<PaintCalculatorProps> = ({ onAddToCart }) => {
  const [length, setLength] = useState<number>(14);
  const [width, setWidth] = useState<number>(12);
  const [height, setHeight] = useState<number>(8);
  const [doors, setDoors] = useState<number>(2);
  const [windows, setWindows] = useState<number>(2);
  const [coats, setCoats] = useState<number>(2);
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(false);
  const [surfaceTexture, setSurfaceTexture] = useState<'smooth' | 'textured'>('smooth');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Calculations
  const grossWallArea = 2 * (length + width) * height;
  const doorDeductions = doors * 21; // 21 sq ft standard interior door
  const windowDeductions = windows * 15; // 15 sq ft standard window
  const netWallArea = Math.max(0, grossWallArea - doorDeductions - windowDeductions);
  const ceilingArea = includeCeiling ? length * width : 0;

  const totalAreaToPaint = (netWallArea * coats) + (ceilingArea * (coats > 1 ? 2 : 1));

  // 1 gallon covers approx 350-400 sq ft
  const coverageRate = surfaceTexture === 'textured' ? 320 : 380;
  const rawGallons = totalAreaToPaint / coverageRate;
  const recommendedGallons = Math.ceil(rawGallons);

  const handleAddCalculatedPaint = () => {
    onAddToCart({
      productName: `Regal® Select Interior (Calculator Estimate)`,
      brand: 'Benjamin Moore',
      colorName: 'Custom Tint at Store',
      sheen: 'Eggshell',
      sizeLabel: `${recommendedGallons} × 1 Gallon Can(s)`,
      price: recommendedGallons * 76.99,
      type: 'paint-can'
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <section id="calculator" className="py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            <span>Rhode Island Paint Coverage Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#132533] tracking-tight">
            How Much Paint Do You Need?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Avoid mid-project trips to our Cranston, Smithfield, or Middletown stores. 
            Calculate the exact gallons required for walls, ceilings, and primers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Form Inputs (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <span>Room Dimensions</span>
              <span className="text-xs font-sans font-normal text-stone-500">(in feet)</span>
            </h3>

            {/* Room Dimensions Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Length (ft)</label>
                <input
                  type="number"
                  min="4"
                  max="100"
                  value={length}
                  onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Width (ft)</label>
                <input
                  type="number"
                  min="4"
                  max="100"
                  value={width}
                  onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Height (ft)</label>
                <input
                  type="number"
                  min="6"
                  max="30"
                  value={height}
                  onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            {/* Openings & Deductions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-200">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Doors</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={doors}
                  onChange={(e) => setDoors(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
                <span className="text-[10px] text-stone-500">21 sq ft ea</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Windows</label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={windows}
                  onChange={(e) => setWindows(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
                <span className="text-[10px] text-stone-500">15 sq ft ea</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">Coats</label>
                <select
                  value={coats}
                  onChange={(e) => setCoats(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                >
                  <option value="1">1 Coat (Touch-up)</option>
                  <option value="2">2 Coats (Recommended)</option>
                  <option value="3">3 Coats (Major shift)</option>
                </select>
                <span className="text-[10px] text-amber-800 font-medium">Standard = 2 coats</span>
              </div>
            </div>

            {/* Ceiling Option & Surface Texture */}
            <div className="pt-2 border-t border-stone-200 space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCeiling}
                  onChange={(e) => setIncludeCeiling(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600"
                />
                <span className="text-xs font-semibold text-stone-800">
                  Include Ceiling in Estimate (+{length * width} sq ft flat ceiling)
                </span>
              </label>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-bold text-stone-700">Wall Texture:</span>
                <button
                  type="button"
                  onClick={() => setSurfaceTexture('smooth')}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    surfaceTexture === 'smooth' 
                      ? 'bg-stone-900 text-white font-bold' 
                      : 'bg-white text-stone-700 border border-stone-300'
                  }`}
                >
                  Smooth Drywall
                </button>
                <button
                  type="button"
                  onClick={() => setSurfaceTexture('textured')}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    surfaceTexture === 'textured' 
                      ? 'bg-stone-900 text-white font-bold' 
                      : 'bg-white text-stone-700 border border-stone-300'
                  }`}
                >
                  Historic Plaster / Textured
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#1B2E3C] text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            <div className="border-b border-white/15 pb-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Estimated Paint Requirement
              </span>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-5xl font-serif font-bold text-white">{recommendedGallons}</span>
                <span className="text-lg font-medium text-stone-300">Gallon{recommendedGallons > 1 ? 's' : ''}</span>
              </div>
              <p className="text-stone-300 text-xs mt-1">
                Total paintable coverage: <strong className="text-white">{totalAreaToPaint} sq ft</strong> ({coats} coats)
              </p>
            </div>

            {/* Breakdown breakdown list */}
            <div className="space-y-2.5 text-xs text-stone-200">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">Net Wall Surface:</span>
                <span className="font-mono font-medium">{netWallArea} sq ft</span>
              </div>
              {includeCeiling && (
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-stone-400">Ceiling Surface:</span>
                  <span className="font-mono font-medium">{ceilingArea} sq ft</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">Recommended Sheen:</span>
                <span className="font-semibold text-amber-300">Eggshell (Living) / Satin (Baths)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-stone-400">Recommended Applicator:</span>
                <span className="font-medium text-white">Purdy 3/8" White Dove Roller</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-400">Primer Needed?</span>
                <span className="font-medium text-emerald-400">
                  {coats === 1 ? 'Not required for fresh touch-up' : '1 Gallon Fresh Start® if bare surface'}
                </span>
              </div>
            </div>

            {/* Pro Tip Box */}
            <div className="bg-white/10 rounded-xl p-3 text-xs text-stone-300 flex items-start gap-2 border border-white/10">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                The Color House pro tip: Always save 1 quart of leftover paint in a sealed Mason jar for instant scuff touch-ups down the road!
              </p>
            </div>

            {/* Direct Order Button */}
            <button
              id="calc-add-to-cart-btn"
              onClick={handleAddCalculatedPaint}
              className="w-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Add {recommendedGallons} Gallon{recommendedGallons > 1 ? 's' : ''} to Order (${(recommendedGallons * 76.99).toFixed(2)})</span>
            </button>

            {addedToast && (
              <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-3 rounded-lg text-center animate-in zoom-in-95">
                ✓ Added {recommendedGallons} Gallon(s) to Cart!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
