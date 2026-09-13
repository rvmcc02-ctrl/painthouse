import React from 'react';
import { 
  Palette, 
  Ruler, 
  Pipette, 
  Truck, 
  Wrench, 
  Recycle, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  onNavigateToStores: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenConsultation,
  onNavigateToStores,
}) => {
  const services = [
    {
      icon: Palette,
      title: 'In-Store & In-Home Color Consultation',
      badge: 'Homeowners & Designers',
      desc: 'Struggling with lighting or coordinating undertones? Our certified Benjamin Moore color consultants review architectural light, flooring, and room transitions to create custom cohesive palettes.',
      actionText: 'Book Color Consultation',
      onClick: onOpenConsultation
    },
    {
      icon: Ruler,
      title: 'Hunter Douglas In-Home Window Design',
      badge: 'Free Laser Measurement',
      desc: 'Explore custom honeycomb shades, plantation shutters, and motorized blinds in your own lighting. Our certified specialists handle precise measurement, custom ordering, and white-glove installation.',
      actionText: 'Schedule Free In-Home Measure',
      onClick: onOpenConsultation
    },
    {
      icon: Pipette,
      title: 'Spectrophotometer Custom Color Matching',
      badge: 'High-Precision Lab',
      desc: 'Bring in an antique fabric, chipped paint flake, piece of trim, or tile. Our computer-aided spectrophotometer analyzes spectral reflectance curves to formulate an exact 100% paint match in minutes.',
      actionText: 'Find Nearest RI Match Lab',
      onClick: onNavigateToStores
    },
    {
      icon: Truck,
      title: 'Contractor Pro Accounts & Jobsite Delivery',
      badge: 'Commercial & Trades',
      desc: 'Fast-track morning dispatch, discounted tiered commercial pricing, 30-day charge accounts, and free jobsite delivery anywhere across Rhode Island from Providence to Newport and South County.',
      actionText: 'Open Pro Contractor Account',
      onClick: onOpenConsultation
    },
    {
      icon: Wrench,
      title: 'Paint Sprayer Service & Repair',
      badge: 'Authorized Service Center',
      desc: 'Keep your equipment running without costly project delays. Our Cranston flagship is an authorized repair depot for Graco, Titan, and Festool sprayers with OEM replacement packings and tip kits.',
      actionText: 'Contact Cranston Service Desk',
      onClick: onNavigateToStores
    },
    {
      icon: Recycle,
      title: 'Rhode Island PaintCare Recycling Drop-Off',
      badge: 'Eco Responsibility',
      desc: 'Dispose of unwanted leftover architectural latex and oil-based paints safely. All 5 of our Rhode Island stores are designated drop-off stations participating in the state PaintCare recycling program.',
      actionText: 'View Drop-Off Guidelines',
      onClick: onNavigateToStores
    }
  ];

  return (
    <section id="services" className="py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-amber-700" />
            <span>Comprehensive Paint & Design Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#132533] tracking-tight">
            Expert Craftsmanship Backed by 60 Years of Experience
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            More than just a paint counter. We partner with Rhode Island homeowners, architects, and professional 
            painting contractors to ensure every coating, window shade, and wallcovering performs flawlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF9F6] rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-stone-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#1B2E3C] text-amber-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-xl leading-tight">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-stone-200">
                  <button
                    onClick={srv.onClick}
                    className="text-xs font-bold text-[#1B2E3C] hover:text-amber-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{srv.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contractor Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#172632] to-[#1F3647] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 max-w-2xl">
            <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wide uppercase">
              Rhode Island Painting Contractors & Builders
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Partner with The Color House Pro Desk
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Enjoy volume pricing on Benjamin Moore Regal Select, Aura, and SCUFF-X, dedicated morning phone/text ordering, submittal support for architects, and free jobsite delivery straight to your projects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Open Commercial Account
            </button>
            <a
              href="tel:4019428888"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-medium text-xs py-3 px-5 rounded-xl border border-white/20 transition-colors text-center"
            >
              Call Pro Desk: (401) 942-8888
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
