import React, { useState } from 'react';
import { PaintCategory, PaintProduct, SheenType } from '../types';
import { PRODUCTS } from '../data/products';
import { 
  ShoppingBag, 
  Star, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Sliders, 
  X,
  Layers
} from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (item: {
    productId: string;
    productName: string;
    brand: string;
    sheen?: SheenType;
    sizeLabel: string;
    price: number;
    image: string;
    type: 'paint-can' | 'supply';
  }) => void;
  selectedStoreName: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  selectedStoreName,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSheens, setSelectedSheens] = useState<Record<string, SheenType>>({
    'bm-aura-interior': 'Eggshell',
    'bm-regal-select': 'Eggshell',
    'bm-ben-interior': 'Eggshell',
    'bm-scuff-x': 'Eggshell',
    'bm-advance-enamel': 'Satin',
    'bm-element-guard': 'Low Lustre' as any,
    'bm-woodluxe-stain': 'Satin',
    'bm-fresh-start': 'Flat / Matte',
  });

  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'bm-aura-interior': 1, // 1 Gallon index
    'bm-regal-select': 1,
    'bm-ben-interior': 1,
    'bm-scuff-x': 0,
    'bm-advance-enamel': 1,
    'bm-element-guard': 0,
    'bm-woodluxe-stain': 0,
    'bm-fresh-start': 1,
    'purdy-pro-kit': 0
  });

  const [detailModalProduct, setDetailModalProduct] = useState<PaintProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [showSheenGuide, setShowSheenGuide] = useState<boolean>(false);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleSheenChange = (productId: string, sheen: SheenType) => {
    setSelectedSheens(prev => ({ ...prev, [productId]: sheen }));
  };

  const handleSizeChange = (productId: string, sizeIdx: number) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: sizeIdx }));
  };

  const handleAddToCart = (product: PaintProduct) => {
    const sizeIdx = selectedSizes[product.id] ?? 0;
    const currentSize = product.sizes[sizeIdx] || product.sizes[0];
    const currentSheen = selectedSheens[product.id] || product.sheens[0];

    onAddToCart({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      sheen: product.category === 'supplies' ? undefined : currentSheen,
      sizeLabel: currentSize.label,
      price: currentSize.price,
      image: product.image,
      type: product.category === 'supplies' ? 'supply' : 'paint-can'
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2500);
  };

  return (
    <section id="paints" className="py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Authorized Benjamin Moore® Flagship Retailer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#132533] tracking-tight">
              Premium Paints, Stains & Primers
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Engineered with Benjamin Moore’s patented waterborne Gennex® colorants for unmatched hide, 
              zero-VOC tinting, and decades of color fidelity. Ready for same-day curbside pickup at {selectedStoreName}.
            </p>
          </div>

          {/* Sheen Guide Toggle Button */}
          <div>
            <button
              onClick={() => setShowSheenGuide(!showSheenGuide)}
              className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-amber-700" />
              <span>{showSheenGuide ? 'Hide Sheen Guide' : 'Interactive Paint Sheen Guide'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Sheen Guide Box */}
        {showSheenGuide && (
          <div className="bg-[#FAF9F6] border border-stone-300 rounded-2xl p-6 mb-10 shadow-xs animate-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-600" />
                <span>Choosing the Right Benjamin Moore Sheen</span>
              </h3>
              <button
                onClick={() => setShowSheenGuide(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-sm block mb-1">Flat / Matte</span>
                <p className="text-stone-600 leading-relaxed">
                  Zero to low light reflection. Hides surface imperfections and drywall seams beautifully.
                </p>
                <div className="mt-2 text-amber-800 font-semibold text-[11px]">
                  Best for: Ceilings, adult bedrooms, formal dining rooms, low-traffic areas.
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-sm block mb-1">Eggshell</span>
                <p className="text-stone-600 leading-relaxed">
                  Soft, velvety glow reminiscent of an eggshell. The most popular interior living sheen.
                </p>
                <div className="mt-2 text-amber-800 font-semibold text-[11px]">
                  Best for: Living rooms, hallways, home offices, and family dens.
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-sm block mb-1">Satin / Pearl</span>
                <p className="text-stone-600 leading-relaxed">
                  Gentle pearl-like lustre with superior stain resistance and scrubbability against moisture.
                </p>
                <div className="mt-2 text-amber-800 font-semibold text-[11px]">
                  Best for: Kitchens, humid bathrooms, laundry rooms, and trim work.
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 text-sm block mb-1">Semi-Gloss</span>
                <p className="text-stone-600 leading-relaxed">
                  Luminous, highly reflective mirror-clean finish that repels water, grease, and fingerprints.
                </p>
                <div className="mt-2 text-amber-800 font-semibold text-[11px]">
                  Best for: Doors, window frames, baseboards, cabinets, and architectural millwork.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'all', label: 'All Coatings & Tools' },
            { id: 'interior', label: 'Interior Paints' },
            { id: 'exterior', label: 'Exterior Paints' },
            { id: 'stains', label: 'Exterior Wood Stains' },
            { id: 'primers', label: 'Primers & Sealers' },
            { id: 'supplies', label: 'Purdy & Wooster Applicators' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1B2E3C] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const sizeIdx = selectedSizes[product.id] ?? 0;
            const currentSize = product.sizes[sizeIdx] || product.sizes[0];
            const currentSheen = selectedSheens[product.id] || product.sheens[0];

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Product Image Stage */}
                <div className="relative h-56 bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#1B2E3C] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.brand}
                    </span>
                    {product.isPopular && (
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded">
                        Contractor Favorite
                      </span>
                    )}
                  </div>
                  {product.isEco && (
                    <div className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Zero VOC
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-600 text-xs mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                    </div>

                    <h3 className="font-serif font-bold text-stone-900 text-xl leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">{product.line}</p>

                    <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Sheen & Size Selectors (if paint) */}
                  {product.sheens && product.sheens.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                          Available Sheens:
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {product.sheens.map((sheen) => (
                            <button
                              key={sheen}
                              type="button"
                              onClick={() => handleSheenChange(product.id, sheen)}
                              className={`text-[10px] px-2 py-1 rounded-md border font-medium transition-all cursor-pointer ${
                                currentSheen === sheen
                                  ? 'bg-[#1B2E3C] text-white border-[#1B2E3C] font-bold'
                                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                              }`}
                            >
                              {sheen}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Size Selector */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                          Size & Volume:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                          {product.sizes.map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSizeChange(product.id, idx)}
                              className={`text-[10px] p-1.5 rounded-md border text-center font-medium transition-all cursor-pointer ${
                                sizeIdx === idx
                                  ? 'bg-amber-50 text-amber-950 border-amber-300 font-bold'
                                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                              }`}
                            >
                              <div className="truncate">{s.label.split('(')[0]}</div>
                              <div className="text-[9px] text-stone-500">${s.price.toFixed(2)}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price & Action Button */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xl font-serif font-bold text-stone-900">
                        ${currentSize.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        Pickup at {selectedStoreName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailModalProduct(product)}
                        className="p-2 text-stone-500 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                        title="Technical Specs & Info"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        id={`add-to-cart-${product.id}`}
                        onClick={() => handleAddToCart(product)}
                        className={`text-xs font-bold py-2.5 px-3.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                          addedProductId === product.id
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#1B2E3C] hover:bg-[#132533] text-white'
                        }`}
                      >
                        {addedProductId === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Detail Modal */}
        {detailModalProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
              <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Technical Formulation
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                    {detailModalProduct.name}
                  </h3>
                  <p className="text-xs text-stone-500">{detailModalProduct.line}</p>
                </div>
                <button
                  onClick={() => setDetailModalProduct(null)}
                  className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {detailModalProduct.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Key Engineering Features:
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {detailModalProduct.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="font-bold text-stone-900">Recommended Project Application:</div>
                <p className="text-stone-600 leading-relaxed">{detailModalProduct.idealFor}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  onClick={() => setDetailModalProduct(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(detailModalProduct);
                    setDetailModalProduct(null);
                  }}
                  className="bg-[#1B2E3C] hover:bg-[#132533] text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Store Pickup</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
