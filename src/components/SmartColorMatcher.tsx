import React, { useState, useRef } from 'react';
import { ColorSwatch, SheenType } from '../types';
import { BENJAMIN_MOORE_COLORS } from '../data/colors';
import { 
  Sparkles, 
  Upload, 
  Pipette, 
  Check, 
  ShoppingBag, 
  Eye, 
  MapPin, 
  Camera,
  RefreshCw
} from 'lucide-react';

interface SmartColorMatcherProps {
  onSelectColorForVisualizer: (color: ColorSwatch) => void;
  onAddToCart: (item: {
    productName: string;
    brand: string;
    colorName: string;
    colorCode: string;
    colorHex: string;
    sheen: SheenType;
    sizeLabel: string;
    price: number;
    type: 'sample-pot';
  }) => void;
}

// Convert Hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Calculate color distance (0 is identical)
function colorDistance(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  return Math.sqrt(2 * dr * dr + 4 * dg * dg + 3 * db * db);
}

export const SmartColorMatcher: React.FC<SmartColorMatcherProps> = ({
  onSelectColorForVisualizer,
  onAddToCart,
}) => {
  const [targetHex, setTargetHex] = useState<string>('#3A4B56');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const targetRgb = hexToRgb(targetHex);

  // Find top 3 closest Benjamin Moore colors
  const matches = [...BENJAMIN_MOORE_COLORS]
    .map(color => {
      const cRgb = hexToRgb(color.hex);
      const dist = colorDistance(targetRgb, cRgb);
      const similarity = Math.max(70, Math.round(100 - (dist / 765) * 100));
      return { color, dist, similarity };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3);

  const bestMatch = matches[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target?.result as string;
        setUploadedImage(imgUrl);
        // Simulate extracting a signature tone
        setTargetHex('#526B74');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="color-matcher" className="py-16 bg-[#172632] text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Spectrophotometer Matcher</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Match Any Color to Benjamin Moore
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Have an existing wall color, fabric swatch, or inspiration photo? 
            Find the closest official Benjamin Moore paint formula in seconds, or bring your physical sample to any of our 5 RI showrooms for lab-grade spectrophotometer analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Input Selector Card (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-2xl p-6 border border-white/10 space-y-6">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Pipette className="w-4 h-4 text-amber-400" />
              <span>Input Your Target Hue</span>
            </h3>

            {/* Live Color Picker & Hex Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-2">
                  Adjust color picker or type hex code:
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={targetHex}
                      onChange={(e) => setTargetHex(e.target.value)}
                      className="w-14 h-14 rounded-xl cursor-pointer bg-transparent border-2 border-white/20 p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={targetHex.toUpperCase()}
                      onChange={(e) => setTargetHex(e.target.value)}
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      placeholder="#2F3C47"
                    />
                    <p className="text-[11px] text-stone-400 mt-1">RGB: {targetRgb.r}, {targetRgb.g}, {targetRgb.b}</p>
                  </div>
                </div>
              </div>

              {/* Sample Preset Tones */}
              <div className="space-y-2">
                <span className="text-xs text-stone-400">Quick Inspiration Chips:</span>
                <div className="flex items-center gap-2">
                  {[
                    { hex: '#2F3C47', label: 'Navy' },
                    { hex: '#626B5D', label: 'Sage' },
                    { hex: '#C25E3E', label: 'Terracotta' },
                    { hex: '#CBC6B8', label: 'Greige' },
                    { hex: '#84837E', label: 'Slate' },
                  ].map((chip) => (
                    <button
                      key={chip.hex}
                      onClick={() => setTargetHex(chip.hex)}
                      className="w-8 h-8 rounded-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: chip.hex }}
                      title={chip.label}
                    />
                  ))}
                </div>
              </div>

              {/* Photo Upload Option */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <label className="block text-xs font-medium text-stone-300">
                  Or upload an inspiration photo:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-xs text-stone-300 py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>{uploadedImage ? 'Change Uploaded Photo' : 'Upload Swatch or Room Photo'}</span>
                </button>

                {uploadedImage && (
                  <div className="relative rounded-lg overflow-hidden h-24 border border-white/10">
                    <img src={uploadedImage} alt="Uploaded sample" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-2 bg-black/60 text-[10px] px-2 py-0.5 rounded text-white">
                      Extracted Palette
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Matches Output Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white text-stone-900 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {bestMatch.similarity}% Match Found
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#132533] mt-1">
                  {bestMatch.color.name}
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  Benjamin Moore {bestMatch.color.code} • {bestMatch.color.collection}
                </p>
              </div>

              {/* Comparison visual */}
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <div 
                    className="w-10 h-10 rounded-xl border border-stone-300 shadow-inner" 
                    style={{ backgroundColor: targetHex }} 
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">Your Target</span>
                </div>
                <span className="text-stone-400 text-xs">vs</span>
                <div className="text-center">
                  <div 
                    className="w-10 h-10 rounded-xl border border-stone-300 shadow-inner" 
                    style={{ backgroundColor: bestMatch.color.hex }} 
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">BM Match</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {bestMatch.color.description}
            </p>

            {/* Top 3 closest alternatives list */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Top 3 Formula Matches:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {matches.map((item, idx) => (
                  <div 
                    key={item.color.id} 
                    className={`p-3 rounded-xl border text-left transition-all ${
                      idx === 0 
                        ? 'bg-amber-50/50 border-amber-300 shadow-xs' 
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div 
                        className="w-6 h-6 rounded-lg border border-black/10 shadow-xs" 
                        style={{ backgroundColor: item.color.hex }} 
                      />
                      <span className="text-[10px] font-bold text-stone-500 font-mono">{item.similarity}%</span>
                    </div>
                    <p className="text-xs font-bold text-stone-900 truncate">{item.color.name}</p>
                    <p className="text-[10px] text-stone-500 font-mono">{item.color.code}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onSelectColorForVisualizer(bestMatch.color)}
                className="bg-[#1B2E3C] hover:bg-[#132533] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>Test in Room Visualizer</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart({
                    productName: `Benjamin Moore Color Sample Pot (16 oz)`,
                    brand: 'Benjamin Moore',
                    colorName: bestMatch.color.name,
                    colorCode: bestMatch.color.code,
                    colorHex: bestMatch.color.hex,
                    sheen: 'Eggshell',
                    sizeLabel: '16 oz Tester Pot',
                    price: 11.99,
                    type: 'sample-pot'
                  });
                }}
                className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <span>Order 16oz Tester ($11.99)</span>
              </button>
            </div>

            {/* Store Spectrophotometer note */}
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Need 100% precision?</strong> Bring any fabric, tile, or chipped paint sample to our Cranston, Smithfield, Middletown, Wakefield, or North Kingstown lab counters. Our master tint technicians use high-resolution optical spectrophotometers to match your sample instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
