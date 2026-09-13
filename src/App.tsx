import React, { useState, useEffect } from 'react';
import { CartItem, ColorSwatch, StoreLocation } from './types';
import { STORES } from './data/stores';
import { BENJAMIN_MOORE_COLORS } from './data/colors';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoomVisualizer } from './components/RoomVisualizer';
import { ProductCatalog } from './components/ProductCatalog';
import { ColorPaletteExplorer } from './components/ColorPaletteExplorer';
import { SmartColorMatcher } from './components/SmartColorMatcher';
import { PaintCalculator } from './components/PaintCalculator';
import { WindowTreatmentsShowcase } from './components/WindowTreatmentsShowcase';
import { ServicesSection } from './components/ServicesSection';
import { StoreLocator } from './components/StoreLocator';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  // Store selection state (default Cranston Flagship)
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(() => {
    try {
      const saved = localStorage.getItem('colorhouse_selected_store');
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = STORES.find(s => s.id === parsed.id);
        if (match) return match;
      }
    } catch {
      // ignore
    }
    return STORES[0]; // Cranston Flagship
  });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('colorhouse_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'sample-hale-navy',
        productName: 'Benjamin Moore Color Sample Pot (16 oz)',
        brand: 'Benjamin Moore',
        colorName: 'Hale Navy',
        colorCode: 'HC-154',
        colorHex: '#2F3C47',
        sheen: 'Eggshell',
        sizeLabel: '16 oz Tester Pot',
        price: 11.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80',
        type: 'sample-pot'
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavSection, setActiveNavSection] = useState('paints');

  // Persist selected store
  useEffect(() => {
    try {
      localStorage.setItem('colorhouse_selected_store', JSON.stringify(selectedStore));
    } catch {
      // ignore
    }
  }, [selectedStore]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('colorhouse_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const handleNavigate = (sectionId: string) => {
    setActiveNavSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    setCartItems(prev => {
      // Check if matching item exists
      const existingIdx = prev.findIndex(
        i => i.productName === item.productName && 
             i.colorCode === item.colorCode && 
             i.sheen === item.sheen && 
             i.sizeLabel === item.sizeLabel
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1
        };
        return updated;
      }

      return [
        ...prev,
        {
          ...item,
          id: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          quantity: 1,
          image: item.image || (item.colorHex ? '' : 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80')
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectColorForVisualizer = (color: ColorSwatch) => {
    // Navigate smoothly to room visualizer
    handleNavigate('visualizer');
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation Header with 5 RI Store Switcher & Cart */}
      <Header
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeNavSection={activeNavSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero
          selectedStore={selectedStore}
          onNavigate={handleNavigate}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Interactive Room Color Visualizer */}
        <RoomVisualizer
          onAddToCart={handleAddToCart}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Benjamin Moore Paints & Coatings Catalog */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
          selectedStoreName={selectedStore.shortName}
        />

        {/* 3,500+ Color Formulas Explorer */}
        <ColorPaletteExplorer
          onSelectColorForVisualizer={handleSelectColorForVisualizer}
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Smart Color Matcher / Spectrophotometer */}
        <SmartColorMatcher
          onSelectColorForVisualizer={handleSelectColorForVisualizer}
          onAddToCart={handleAddToCart}
        />

        {/* Paint Gallon Estimator Calculator */}
        <PaintCalculator
          onAddToCart={handleAddToCart}
        />

        {/* Hunter Douglas Custom Window Treatments Showcase */}
        <WindowTreatmentsShowcase
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Comprehensive Services: Color Consultation, Delivery, Sprayer Repair */}
        <ServicesSection
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onNavigateToStores={() => handleNavigate('stores')}
        />

        {/* 5 Rhode Island Showrooms & Map Locator */}
        <StoreLocator
          selectedStore={selectedStore}
          onSelectStore={setSelectedStore}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />
      </main>

      {/* Footer with 5 Store Directories, Hours, and Newsletter */}
      <Footer
        onNavigate={handleNavigate}
        onSelectStore={setSelectedStore}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* In-Store & In-Home Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedStore={selectedStore}
      />

      {/* Shopping Bag & Store Curbside Pickup Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
      />
    </div>
  );
}
