import React, { useState } from 'react';
import { ColorSwatch, SheenType } from '../types';
import { BENJAMIN_MOORE_COLORS } from '../data/colors';
import { 
  Palette, 
  Search, 
  Copy, 
  Check, 
  ShoppingBag, 
  SlidersHorizontal, 
  Sparkles, 
  Eye, 
  X,
  ArrowRight
} from 'lucide-react';

interface ColorPaletteExplorerProps {
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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ColorPaletteExplorer: React.FC<ColorPaletteExplorerProps> = ({
  onSelectColorForVisualizer,
  onAddToCart,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeModalColor, setActiveModalColor] = useState<ColorSwatch | null>(null);

  const filteredColors = BENJAMIN_MOORE_COLORS.filter((color) => {
    const matchesFamily = selectedFamily === 'all' || color.family === selectedFamily;
    const matchesSearch = searchQuery === '' || 
      color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.collection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  const handleCopyHex = (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleOrderSample = (color: ColorSwatch, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      productName: `Benjamin Moore Color Sample Pot (16 oz)`,
      brand: 'Benjamin Moore',
      colorName: color.name,
      colorCode: color.code,
      colorHex: color.hex,
      sheen: 'Eggshell',
      sizeLabel: '16 oz Tester Pot',
      price: 11.99,
      type: 'sample-pot'
    });
  };

  return (
    <section id="colors" className="py-16 bg-[#FAF9F6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-stone-200/80 text-stone-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Palette className="w-3.5 h-3.5 text-amber-700" />
              <span>3,500+ Authentic Formulas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#132533] tracking-tight">
              Explore Benjamin Moore Color Collections
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              From historic Newport coastal navies to Providence modern greiges, discover the iconic 
              hues that define New England architecture. Every color is mixed in-house with zero-VOC Gennex® colorants.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search color name or code (e.g. HC-154)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-8 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'all', label: 'All Colors' },
            { id: 'whites', label: 'Whites & Off-Whites' },
            { id: 'blues', label: 'Coastal Blues' },
            { id: 'greens', label: 'Historic Greens' },
            { id: 'grays', label: 'Architectural Grays' },
            { id: 'warm-neutrals', label: 'Warm Neutrals & Greiges' },
            { id: 'accents', label: 'Bold Accents' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFamily(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFamily === tab.id
                  ? 'bg-[#1B2E3C] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredColors.map((color) => (
            <div
              key={color.id}
              id={`color-card-${color.id}`}
              onClick={() => setActiveModalColor(color)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all transform hover:-translate-y-1 group cursor-pointer flex flex-col"
            >
              {/* Color Block Banner */}
              <div 
                className="h-44 w-full relative p-4 flex flex-col justify-between"
                style={{ backgroundColor: color.hex }}
              >
                {/* Top Badge: LRV */}
                <div className="flex items-center justify-between">
                  <span className="bg-black/30 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    LRV {color.lrv.toFixed(1)}
                  </span>
                  <button
                    onClick={(e) => handleCopyHex(color.hex, e)}
                    className="bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition-colors"
                    title="Copy HEX Code"
                  >
                    {copiedHex === color.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Bottom Color Code Overlay */}
                <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg inline-flex items-center justify-between self-start shadow-xs">
                  <span className="font-mono text-xs font-bold text-stone-900">{color.code}</span>
                </div>
              </div>

              {/* Color Meta Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif font-bold text-stone-900 text-lg group-hover:text-amber-800 transition-colors">
                      {color.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider mt-0.5">
                    {color.collection}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {color.description}
                  </p>
                </div>

                {/* Coordinating Trim Hint */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Pair with: <strong>{color.complements[0]?.name}</strong></span>
                  <div 
                    className="w-4 h-4 rounded-full border border-stone-300 shadow-xs" 
                    style={{ backgroundColor: color.complements[0]?.hex }} 
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectColorForVisualizer(color);
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-600" />
                    <span>Try in Room</span>
                  </button>

                  <button
                    onClick={(e) => handleOrderSample(color, e)}
                    className="bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold py-2 px-2.5 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Sample $11.99</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredColors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">No colors found matching "{searchQuery}".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-amber-700 font-semibold underline mt-2"
            >
              Clear search query
            </button>
          </div>
        )}

        {/* Color Detail Modal */}
        {activeModalColor && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
              {/* Modal Color Header */}
              <div 
                className="h-48 relative p-6 flex flex-col justify-between"
                style={{ backgroundColor: activeModalColor.hex }}
              >
                <button
                  onClick={() => setActiveModalColor(null)}
                  className="self-end bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="bg-white/95 backdrop-blur-xs px-4 py-2 rounded-xl self-start shadow-md">
                  <span className="font-mono text-xs font-bold text-stone-900">{activeModalColor.code}</span>
                  <span className="text-stone-400 mx-2">|</span>
                  <span className="font-mono text-xs text-stone-600">{activeModalColor.hex}</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-stone-900">{activeModalColor.name}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">{activeModalColor.collection} • LRV: {activeModalColor.lrv.toFixed(1)}</p>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {activeModalColor.description}
                </p>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                  <span className="font-bold text-stone-800">Undertone analysis: </span>
                  <span className="text-stone-600">{activeModalColor.undertone}</span>
                </div>

                {/* Coordinating Palette */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Recommended Coordinating Palette:
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {activeModalColor.complements.map((comp, idx) => (
                      <div key={idx} className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-center">
                        <div 
                          className="w-8 h-8 rounded-full mx-auto mb-1.5 border border-stone-300 shadow-xs" 
                          style={{ backgroundColor: comp.hex }} 
                        />
                        <p className="text-xs font-bold text-stone-900 truncate">{comp.name}</p>
                        <p className="text-[10px] text-stone-500 font-mono">{comp.code}</p>
                        <p className="text-[10px] text-amber-800 font-medium">{comp.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      onSelectColorForVisualizer(activeModalColor);
                      setActiveModalColor(null);
                    }}
                    className="flex-1 bg-[#1B2E3C] hover:bg-[#132533] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-amber-300" />
                    <span>Open in Room Visualizer</span>
                  </button>

                  <button
                    onClick={(e) => {
                      handleOrderSample(activeModalColor, e);
                      setActiveModalColor(null);
                    }}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order 16oz Pot ($11.99)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
