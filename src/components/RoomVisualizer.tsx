import React, { useState } from 'react';
import { ColorSwatch, RoomTypeId, SheenType } from '../types';
import { BENJAMIN_MOORE_COLORS } from '../data/colors';
import { 
  Palette, 
  Sun, 
  Moon, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Sliders, 
  Info, 
  Calendar,
  RotateCcw,
  Eye
} from 'lucide-react';

interface RoomVisualizerProps {
  onAddToCart: (item: {
    productName: string;
    brand: string;
    colorName: string;
    colorCode: string;
    colorHex: string;
    sheen: SheenType;
    sizeLabel: string;
    price: number;
    type: 'sample-pot' | 'paint-can';
  }) => void;
  onOpenConsultation: () => void;
}

type LightingCondition = 'natural' | 'warm' | 'cool';

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({
  onAddToCart,
  onOpenConsultation,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(BENJAMIN_MOORE_COLORS[0]); // Hale Navy default
  const [selectedRoom, setSelectedRoom] = useState<RoomTypeId>('living');
  const [lighting, setLighting] = useState<LightingCondition>('natural');
  const [selectedSheen, setSelectedSheen] = useState<SheenType>('Eggshell');
  const [colorFamilyFilter, setColorFamilyFilter] = useState<string>('all');
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  // Lighting overlay styles
  const getLightingOverlayStyle = () => {
    switch (lighting) {
      case 'warm':
        return {
          filter: 'sepia(0.2) contrast(1.02) brightness(0.96)',
          mixBlendMode: 'multiply' as const,
        };
      case 'cool':
        return {
          filter: 'hue-rotate(-8deg) brightness(1.04) saturate(0.95)',
          mixBlendMode: 'normal' as const,
        };
      default:
        return {
          filter: 'none',
          mixBlendMode: 'normal' as const,
        };
    }
  };

  const filteredColors = colorFamilyFilter === 'all' 
    ? BENJAMIN_MOORE_COLORS 
    : BENJAMIN_MOORE_COLORS.filter(c => c.family === colorFamilyFilter);

  const handleOrderSample = () => {
    onAddToCart({
      productName: `Benjamin Moore Color Sample Pot (16 oz)`,
      brand: 'Benjamin Moore',
      colorName: selectedColor.name,
      colorCode: selectedColor.code,
      colorHex: selectedColor.hex,
      sheen: 'Eggshell',
      sizeLabel: '16 oz Color Tester Pot',
      price: 11.99,
      type: 'sample-pot'
    });
    showSuccessToast(`Added 16oz Sample Pot of ${selectedColor.name} to Cart`);
  };

  const handleOrderGallon = () => {
    onAddToCart({
      productName: `Regal® Select Interior Paint - 1 Gallon`,
      brand: 'Benjamin Moore',
      colorName: selectedColor.name,
      colorCode: selectedColor.code,
      colorHex: selectedColor.hex,
      sheen: selectedSheen,
      sizeLabel: '1 Gallon',
      price: 76.99,
      type: 'paint-can'
    });
    showSuccessToast(`Added 1 Gallon of ${selectedColor.name} (${selectedSheen}) to Cart`);
  };

  const showSuccessToast = (msg: string) => {
    setAddedNotification(msg);
    setTimeout(() => {
      setAddedNotification(null);
    }, 3500);
  };

  return (
    <section id="visualizer" className="py-16 bg-[#F3F0EB] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Palette className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Color Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#132533] tracking-tight">
            See Benjamin Moore Colors Live on Your Walls
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Switch between realistic Rhode Island living spaces, adjust ambient lighting conditions, and test true-to-life 
            Gennex® formulations before ordering physical sample pots.
          </p>
        </div>

        {/* Visualizer Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Room Stage Display (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Room Tabs */}
            <div className="flex items-center justify-between bg-white p-1.5 rounded-xl shadow-xs border border-stone-200">
              <div className="flex items-center gap-1 overflow-x-auto">
                <button
                  id="tab-room-living"
                  onClick={() => setSelectedRoom('living')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedRoom === 'living' 
                      ? 'bg-[#1B2E3C] text-white shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  Living Room
                </button>
                <button
                  id="tab-room-kitchen"
                  onClick={() => setSelectedRoom('kitchen')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedRoom === 'kitchen' 
                      ? 'bg-[#1B2E3C] text-white shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  Kitchen & Island
                </button>
                <button
                  id="tab-room-bedroom"
                  onClick={() => setSelectedRoom('bedroom')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedRoom === 'bedroom' 
                      ? 'bg-[#1B2E3C] text-white shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  Master Bedroom
                </button>
                <button
                  id="tab-room-exterior"
                  onClick={() => setSelectedRoom('exterior')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedRoom === 'exterior' 
                      ? 'bg-[#1B2E3C] text-white shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  Coastal Exterior
                </button>
              </div>

              {/* Reset / Live Indicator */}
              <div className="hidden sm:flex items-center gap-2 pr-2 text-xs text-stone-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Rendering</span>
              </div>
            </div>

            {/* Room Canvas Stage */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-300 bg-stone-900 aspect-4/3 sm:aspect-16/10">
              {/* Dynamic Wall Color Layer */}
              <div 
                className="absolute inset-0 transition-colors duration-500 ease-out"
                style={{ 
                  backgroundColor: selectedColor.hex,
                  ...getLightingOverlayStyle()
                }}
              />

              {/* Room Scene Architectural SVG Mask & Architectural Elements */}
              {selectedRoom === 'living' && (
                <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  {/* Subtle Wall Shading & Shadows */}
                  <defs>
                    <linearGradient id="wallGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#000" stopOpacity="0.2" />
                      <stop offset="35%" stopColor="#fff" stopOpacity="0.08" />
                      <stop offset="70%" stopColor="#fff" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id="floorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8C6D52" />
                      <stop offset="100%" stopColor="#5E432E" />
                    </linearGradient>
                  </defs>

                  <rect width="800" height="380" fill="url(#wallGradient)" />

                  {/* Pristine Ceiling with Crown Molding */}
                  <polygon points="0,0 800,0 800,45 0,45" fill="#F8F8F6" />
                  <rect x="0" y="42" width="800" height="6" fill="#E6E6E2" />

                  {/* Window on Left with Natural Light & Silhouette Shade */}
                  <rect x="40" y="70" width="160" height="240" fill="#E8F1F5" stroke="#FFFFFF" strokeWidth="8" rx="2" />
                  <line x1="120" y1="70" x2="120" y2="310" stroke="#FFFFFF" strokeWidth="6" />
                  <line x1="40" y1="190" x2="200" y2="190" stroke="#FFFFFF" strokeWidth="6" />
                  {/* Hunter Douglas shade effect */}
                  <rect x="44" y="74" width="152" height="90" fill="#FFFFFF" fillOpacity="0.85" />
                  <line x1="44" y1="100" x2="196" y2="100" stroke="#DDD" strokeWidth="1" />
                  <line x1="44" y1="130" x2="196" y2="130" stroke="#DDD" strokeWidth="1" />
                  <line x1="44" y1="160" x2="196" y2="160" stroke="#DDD" strokeWidth="1" />

                  {/* Framed Wall Art on Right Wall */}
                  <rect x="540" y="90" width="180" height="130" fill="#FFFFFF" stroke="#222" strokeWidth="6" rx="2" />
                  <rect x="555" y="105" width="150" height="100" fill="#F4EDE4" />
                  <circle cx="630" cy="155" r="35" fill="#D97706" fillOpacity="0.6" />
                  <path d="M570,185 Q630,130 690,185 Z" fill="#1B2E3C" fillOpacity="0.7" />

                  {/* Baseboard Trim */}
                  <rect x="0" y="372" width="800" height="16" fill="#FFFFFF" />
                  <line x1="0" y1="372" x2="800" y2="372" stroke="#E2E2DC" strokeWidth="1.5" />

                  {/* Hardwood Flooring */}
                  <polygon points="0,388 800,388 800,500 0,500" fill="url(#floorGradient)" />
                  {/* Wood floor planks */}
                  <line x1="0" y1="410" x2="800" y2="410" stroke="#4A3423" strokeWidth="1" opacity="0.4" />
                  <line x1="0" y1="445" x2="800" y2="445" stroke="#4A3423" strokeWidth="1" opacity="0.4" />
                  <line x1="0" y1="475" x2="800" y2="475" stroke="#4A3423" strokeWidth="1" opacity="0.4" />

                  {/* Designer Rug */}
                  <polygon points="180,410 700,410 760,490 120,490" fill="#EAE5DB" opacity="0.95" />
                  <polygon points="200,420 680,420 735,480 145,480" fill="none" stroke="#C5BEB3" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Modern Sofa */}
                  <path d="M 230,340 Q 230,310 260,310 L 620,310 Q 650,310 650,340 L 660,420 L 220,420 Z" fill="#D4D0C8" />
                  {/* Sofa back cushions */}
                  <rect x="250" y="315" width="180" height="55" rx="8" fill="#ECE9E3" stroke="#BBB" strokeWidth="1" />
                  <rect x="440" y="315" width="190" height="55" rx="8" fill="#ECE9E3" stroke="#BBB" strokeWidth="1" />
                  {/* Accent Pillows */}
                  <rect x="260" y="335" width="40" height="40" rx="6" fill="#B45309" transform="rotate(-8 260 335)" />
                  <rect x="580" y="335" width="40" height="40" rx="6" fill="#1B2E3C" transform="rotate(10 580 335)" />
                  {/* Sofa base & legs */}
                  <rect x="235" y="370" width="410" height="50" rx="6" fill="#E2DFD8" />
                  <rect x="250" y="420" width="12" height="15" fill="#3D291C" />
                  <rect x="618" y="420" width="12" height="15" fill="#3D291C" />

                  {/* Designer Coffee Table */}
                  <ellipse cx="440" cy="450" rx="90" ry="22" fill="#2E241E" />
                  <ellipse cx="440" cy="448" rx="88" ry="20" fill="#42352C" />
                  {/* Books & Candle */}
                  <rect x="410" y="438" width="28" height="6" fill="#F8F8F8" />
                  <rect x="412" y="434" width="24" height="4" fill="#C25E3E" />
                  <circle cx="465" cy="440" r="5" fill="#FFF" />
                </svg>
              )}

              {selectedRoom === 'kitchen' && (
                <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  {/* Kitchen wall behind subway tiles and open shelving */}
                  <rect x="0" y="0" width="800" height="500" fill="none" />
                  {/* Ceiling */}
                  <rect x="0" y="0" width="800" height="40" fill="#FAFAF8" />
                  <rect x="0" y="38" width="800" height="4" fill="#E2E2DE" />

                  {/* Modern Open Shelving */}
                  <rect x="100" y="110" width="280" height="10" fill="#654321" rx="2" />
                  <rect x="100" y="180" width="280" height="10" fill="#654321" rx="2" />
                  {/* Ceramics on shelves */}
                  <rect x="130" y="85" width="25" height="25" rx="3" fill="#FFFFFF" />
                  <rect x="170" y="75" width="20" height="35" rx="2" fill="#D4AF37" />
                  <circle cx="240" cy="98" r="12" fill="#EAE5DB" />
                  <rect x="140" y="155" width="30" height="25" rx="2" fill="#FFFFFF" />
                  <rect x="200" y="150" width="40" height="30" rx="2" fill="#E0DDD7" />

                  {/* Window with Garden View */}
                  <rect x="440" y="70" width="240" height="180" fill="#C8E6C9" stroke="#FFFFFF" strokeWidth="10" rx="2" />
                  <line x1="560" y1="70" x2="560" y2="250" stroke="#FFFFFF" strokeWidth="6" />

                  {/* Countertop Backsplash (White subway tile) */}
                  <rect x="0" y="250" width="800" height="80" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="2" />
                  <line x1="0" y1="275" x2="800" y2="275" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="0" y1="300" x2="800" y2="300" stroke="#E2E8F0" strokeWidth="1" />

                  {/* Quartz Countertop */}
                  <rect x="0" y="330" width="800" height="18" fill="#ECEFF1" />
                  <line x1="0" y1="348" x2="800" y2="348" stroke="#CFD8DC" strokeWidth="2" />

                  {/* Base Cabinets */}
                  <rect x="0" y="350" width="800" height="150" fill="#374151" />
                  {/* Shaker Panel Doors */}
                  <rect x="50" y="365" width="140" height="110" fill="#2E3744" stroke="#4B5563" strokeWidth="6" rx="2" />
                  <rect x="230" y="365" width="140" height="110" fill="#2E3744" stroke="#4B5563" strokeWidth="6" rx="2" />
                  <rect x="410" y="365" width="140" height="110" fill="#2E3744" stroke="#4B5563" strokeWidth="6" rx="2" />
                  <rect x="590" y="365" width="140" height="110" fill="#2E3744" stroke="#4B5563" strokeWidth="6" rx="2" />
                  {/* Brass Pull Handles */}
                  <rect x="175" y="410" width="4" height="25" rx="2" fill="#D97706" />
                  <rect x="355" y="410" width="4" height="25" rx="2" fill="#D97706" />
                  <rect x="425" y="410" width="4" height="25" rx="2" fill="#D97706" />
                  <rect x="605" y="410" width="4" height="25" rx="2" fill="#D97706" />

                  {/* Brass Pendant Lights hanging from ceiling */}
                  <line x1="280" y1="40" x2="280" y2="120" stroke="#111" strokeWidth="2" />
                  <path d="M 255,145 L 305,145 L 290,120 L 270,120 Z" fill="#D97706" />
                  <line x1="520" y1="40" x2="520" y2="120" stroke="#111" strokeWidth="2" />
                  <path d="M 495,145 L 545,145 L 530,120 L 510,120 Z" fill="#D97706" />
                </svg>
              )}

              {selectedRoom === 'bedroom' && (
                <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  {/* Ceiling */}
                  <rect x="0" y="0" width="800" height="45" fill="#FAF9F6" />
                  <line x1="0" y1="45" x2="800" y2="45" stroke="#E5E4E0" strokeWidth="2" />

                  {/* Sconces on left and right */}
                  <circle cx="160" cy="180" r="10" fill="#D4AF37" />
                  <path d="M140,210 L180,210 L170,185 L150,185 Z" fill="#FFF" opacity="0.9" />
                  <circle cx="640" cy="180" r="10" fill="#D4AF37" />
                  <path d="M620,210 L660,210 L650,185 L630,185 Z" fill="#FFF" opacity="0.9" />

                  {/* Master Bed Headboard */}
                  <rect x="230" y="160" width="340" height="170" rx="14" fill="#4B4844" stroke="#333" strokeWidth="3" />
                  <rect x="250" y="180" width="300" height="130" rx="8" fill="#58544F" />

                  {/* Bed & Linens */}
                  <polygon points="180,310 620,310 670,470 130,470" fill="#F8F8F7" />
                  {/* Pillows */}
                  <rect x="260" y="270" width="120" height="45" rx="8" fill="#FFFFFF" stroke="#DDD" strokeWidth="1" />
                  <rect x="420" y="270" width="120" height="45" rx="8" fill="#FFFFFF" stroke="#DDD" strokeWidth="1" />
                  {/* Duvet & Throw Blanket */}
                  <polygon points="160,370 640,370 670,470 130,470" fill="#E8E4DD" />
                  <polygon points="145,420 655,420 670,470 130,470" fill="#B09D88" />

                  {/* Nightstands */}
                  <rect x="90" y="320" width="110" height="100" rx="4" fill="#3D291C" />
                  <rect x="600" y="320" width="110" height="100" rx="4" fill="#3D291C" />

                  {/* Soft Carpet Flooring */}
                  <polygon points="0,460 800,460 800,500 0,500" fill="#D1CCC1" />
                </svg>
              )}

              {selectedRoom === 'exterior' && (
                <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  {/* Roof Gable */}
                  <polygon points="0,0 800,0 800,70 400,10 0,70" fill="#282C34" />
                  {/* White Exterior Trim Fascia */}
                  <line x1="0" y1="70" x2="400" y2="10" stroke="#FFFFFF" strokeWidth="12" />
                  <line x1="400" y1="10" x2="800" y2="70" stroke="#FFFFFF" strokeWidth="12" />

                  {/* Siding Planks subtle horizontal lines */}
                  <g stroke="#000" strokeWidth="1" opacity="0.15">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line key={i} x1="0" y1={75 + i * 20} x2="800" y2={75 + i * 20} />
                    ))}
                  </g>

                  {/* Left Window with White Shutters */}
                  <rect x="80" y="140" width="140" height="180" fill="#E3F2FD" stroke="#FFFFFF" strokeWidth="10" />
                  <line x1="150" y1="140" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="5" />
                  <line x1="80" y1="230" x2="220" y2="230" stroke="#FFFFFF" strokeWidth="5" />
                  {/* Shutters */}
                  <rect x="40" y="138" width="38" height="184" fill="#1B2E3C" rx="2" />
                  <rect x="222" y="138" width="38" height="184" fill="#1B2E3C" rx="2" />

                  {/* Right Window with White Shutters */}
                  <rect x="580" y="140" width="140" height="180" fill="#E3F2FD" stroke="#FFFFFF" strokeWidth="10" />
                  <line x1="650" y1="140" x2="650" y2="320" stroke="#FFFFFF" strokeWidth="5" />
                  <line x1="580" y1="230" x2="720" y2="230" stroke="#FFFFFF" strokeWidth="5" />
                  <rect x="540" y="138" width="38" height="184" fill="#1B2E3C" rx="2" />
                  <rect x="722" y="138" width="38" height="184" fill="#1B2E3C" rx="2" />

                  {/* Grand Portico & Front Door */}
                  <polygon points="320,110 480,110 400,65" fill="#FFFFFF" />
                  <rect x="330" y="110" width="16" height="270" fill="#FFFFFF" />
                  <rect x="454" y="110" width="16" height="270" fill="#FFFFFF" />

                  {/* Front Door */}
                  <rect x="350" y="140" width="100" height="240" fill="#C25E3E" stroke="#FFFFFF" strokeWidth="6" rx="2" />
                  <circle cx="365" cy="260" r="5" fill="#D4AF37" />
                  {/* Door Glass Transom */}
                  <rect x="360" y="155" width="80" height="40" fill="#E0F7FA" stroke="#FFF" strokeWidth="3" />

                  {/* Porch steps & Foundation */}
                  <rect x="280" y="380" width="240" height="40" fill="#9E9E9E" />
                  <rect x="250" y="420" width="300" height="30" fill="#757575" />
                  <rect x="0" y="450" width="800" height="50" fill="#388E3C" />
                </svg>
              )}

              {/* In-Room Information Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md rounded-xl p-3 sm:p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-white/15">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg shadow-inner border-2 border-white shrink-0" 
                    style={{ backgroundColor: selectedColor.hex }} 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base sm:text-lg leading-none">{selectedColor.name}</span>
                      <span className="bg-white/20 text-[11px] font-mono px-1.5 py-0.5 rounded text-amber-300">{selectedColor.code}</span>
                    </div>
                    <p className="text-stone-300 text-xs mt-1">
                      {selectedColor.collection} • Sheen: <strong className="text-white">{selectedSheen}</strong>
                    </p>
                  </div>
                </div>

                {/* Quick Action in Overlay */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    id="viz-order-sample-btn"
                    onClick={handleOrderSample}
                    className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order 16oz Sample ($11.99)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lighting & Sheen Controls Toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
              {/* Lighting Condition */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ambient Light Simulation</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    id="light-natural"
                    onClick={() => setLighting('natural')}
                    className={`text-xs py-1.5 px-2 rounded-md font-medium border text-center transition-all cursor-pointer ${
                      lighting === 'natural' 
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' 
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Daylight 5500K
                  </button>
                  <button
                    id="light-warm"
                    onClick={() => setLighting('warm')}
                    className={`text-xs py-1.5 px-2 rounded-md font-medium border text-center transition-all cursor-pointer ${
                      lighting === 'warm' 
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' 
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Warm Eve 2700K
                  </button>
                  <button
                    id="light-cool"
                    onClick={() => setLighting('cool')}
                    className={`text-xs py-1.5 px-2 rounded-md font-medium border text-center transition-all cursor-pointer ${
                      lighting === 'cool' 
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' 
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Cool Sky 6500K
                  </button>
                </div>
              </div>

              {/* Sheen Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sheen Lustre</span>
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['Flat / Matte', 'Eggshell', 'Satin', 'Semi-Gloss'] as SheenType[]).map((sheen) => (
                    <button
                      key={sheen}
                      id={`sheen-${sheen.toLowerCase().replace(/[^a-z]/g, '')}`}
                      onClick={() => setSelectedSheen(sheen)}
                      className={`text-[11px] py-1.5 px-1 rounded-md font-medium border text-center transition-all cursor-pointer truncate ${
                        selectedSheen === sheen 
                          ? 'bg-[#1B2E3C] text-white border-[#1B2E3C] font-bold' 
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                      title={sheen}
                    >
                      {sheen.split('/')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notification Toast */}
            {addedNotification && (
              <div className="bg-emerald-800 text-white text-xs font-semibold py-2.5 px-4 rounded-lg shadow-md flex items-center justify-between animate-in fade-in duration-200">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" />
                  {addedNotification}
                </span>
                <span className="text-[11px] text-emerald-200">Ready for RI Store Pickup</span>
              </div>
            )}
          </div>

          {/* Right Column: Color Swatches & Architectural Specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Color Swatch Picker Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif font-bold text-stone-900 text-lg">Curated Color Palette</h3>
                <span className="text-xs text-stone-500 font-medium">14 Iconic Benjamin Moore Hues</span>
              </div>

              {/* Family Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'whites', label: 'Whites' },
                  { id: 'blues', label: 'Coastal Blues' },
                  { id: 'greens', label: 'Greens' },
                  { id: 'grays', label: 'Historic Grays' },
                  { id: 'warm-neutrals', label: 'Warm Neutrals' },
                  { id: 'accents', label: 'Bold Accents' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setColorFamilyFilter(tab.id)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                      colorFamilyFilter === tab.id 
                        ? 'bg-stone-900 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Swatch Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1 py-1">
                {filteredColors.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      id={`swatch-${color.id}`}
                      onClick={() => setSelectedColor(color)}
                      className={`text-left p-2 rounded-xl border transition-all flex items-center gap-2 cursor-pointer group ${
                        isSelected 
                          ? 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/40 shadow-xs' 
                          : 'border-stone-200 hover:border-stone-400 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg shadow-inner border border-black/10 shrink-0 group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-stone-900 truncate leading-tight">{color.name}</p>
                        <p className="text-[10px] text-stone-500 font-mono">{color.code}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Color Architectural Specs Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Color Profile & Chemistry
                  </span>
                  <h4 className="font-serif font-bold text-xl text-stone-900 mt-1">{selectedColor.name}</h4>
                  <p className="text-xs text-stone-500">{selectedColor.collection} • Code: {selectedColor.code}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">LRV {selectedColor.lrv.toFixed(1)}</div>
                  <div className="text-[10px] text-stone-500">Light Reflectance</div>
                </div>
              </div>

              {/* Light Reflectance Gauge */}
              <div>
                <div className="flex justify-between text-[10px] text-stone-500 mb-1">
                  <span>Absorbs Light (0 - Deep)</span>
                  <span>Reflects Light (100 - Luminous)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                  <div 
                    className="bg-amber-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(5, selectedColor.lrv))}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {selectedColor.description}
              </p>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                  <Info className="w-3.5 h-3.5 text-stone-500" />
                  <span>Undertones & Lighting Notes</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  {selectedColor.undertone}
                </p>
              </div>

              {/* Recommended Complementary Palettes */}
              <div className="space-y-2 pt-1 border-t border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Designer Coordinating Colors:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {selectedColor.complements.map((comp, idx) => (
                    <div key={idx} className="bg-stone-50 p-2 rounded-lg border border-stone-200 text-center">
                      <div 
                        className="w-6 h-6 rounded-full mx-auto mb-1 border border-stone-300 shadow-xs" 
                        style={{ backgroundColor: comp.hex }} 
                      />
                      <p className="text-[11px] font-bold text-stone-800 truncate">{comp.name}</p>
                      <p className="text-[9px] text-stone-500 font-mono">{comp.code}</p>
                      <p className="text-[9px] text-amber-800 font-medium mt-0.5">{comp.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Ordering CTAs */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  id="order-sample-btn-sidebar"
                  onClick={handleOrderSample}
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs py-2.5 px-3 rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Sample ($11.99)</span>
                </button>

                <button
                  id="order-gallon-btn-sidebar"
                  onClick={handleOrderGallon}
                  className="bg-[#1B2E3C] hover:bg-[#132533] text-white font-bold text-xs py-2.5 px-3 rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add 1 Gallon ($76.99)</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onOpenConsultation}
                  className="text-xs text-stone-600 hover:text-stone-900 font-semibold underline underline-offset-2 cursor-pointer flex items-center justify-center gap-1 mx-auto"
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>Need an in-home color consultation? Schedule today</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
