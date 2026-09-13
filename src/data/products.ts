import { PaintProduct } from '../types';

export const PRODUCTS: PaintProduct[] = [
  {
    id: 'bm-aura-interior',
    name: 'Aura® Interior Paint',
    brand: 'Benjamin Moore',
    line: 'Aura Premium Series',
    category: 'interior',
    description: 'Benjamin Moore’s ultimate luxury architectural coating. Proprietary Color Lock® technology delivers richer, deeper colors that resist scuffs, stains, and fading even in humid bathrooms.',
    features: [
      'Proprietary Color Lock® technology for unparalleled color richness',
      'Seamless touch-up and extreme washability across all sheens',
      'Zero VOC, low odor formulation engineered with Gennex® colorants',
      'Paint and primer in one with maximum single-coat hide'
    ],
    sheens: ['Flat / Matte', 'Eggshell', 'Satin', 'Semi-Gloss'],
    sizes: [
      { label: 'Pint Sample (16 oz)', price: 11.99, coverageSqFt: 50 },
      { label: '1 Gallon', price: 92.99, coverageSqFt: 400 },
      { label: '5 Gallon Pail', price: 445.00, coverageSqFt: 2000 }
    ],
    rating: 4.9,
    reviewsCount: 384,
    isPopular: true,
    isEco: true,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Living rooms, primary bedrooms, formal dining rooms, and high-end residential interiors.'
  },
  {
    id: 'bm-regal-select',
    name: 'Regal® Select Interior Paint',
    brand: 'Benjamin Moore',
    line: 'Regal Select Series',
    category: 'interior',
    description: 'The time-tested trusted favorite of Rhode Island homeowners and master painting contractors for over 60 years. Renowned for effortless flow, exceptional leveling, and outstanding stain release.',
    features: [
      'Outstanding durability and washability in every sheen',
      'Spatter-resistant formula with velvety smooth application',
      'Mildew resistant finish ideal for kitchens, baths, and coastal moisture',
      'Engineered with Gennex® colorant technology'
    ],
    sheens: ['Flat / Matte', 'Eggshell', 'Satin', 'Semi-Gloss'],
    sizes: [
      { label: 'Pint Sample (16 oz)', price: 11.99, coverageSqFt: 50 },
      { label: '1 Gallon', price: 76.99, coverageSqFt: 400 },
      { label: '5 Gallon Pail', price: 368.00, coverageSqFt: 2000 }
    ],
    rating: 4.9,
    reviewsCount: 620,
    isPopular: true,
    isEco: true,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Hallways, family rooms, busy kitchens, kids rooms, and trim work.'
  },
  {
    id: 'bm-ben-interior',
    name: 'ben® Interior Paint',
    brand: 'Benjamin Moore',
    line: 'ben Series',
    category: 'interior',
    description: 'An approachable, user-friendly premium paint formulated for effortless DIY decorating. Offers great hide, easy touch-up, low splatter, and zero VOC.',
    features: [
      'User-friendly application with extended open time',
      'Excellent hide and uniform sheen leveling',
      'Zero VOC with virtually no odor during and after painting',
      'Quick recoat time in just 2 hours'
    ],
    sheens: ['Flat / Matte', 'Eggshell', 'Semi-Gloss'],
    sizes: [
      { label: 'Pint Sample (16 oz)', price: 11.99, coverageSqFt: 50 },
      { label: '1 Gallon', price: 54.99, coverageSqFt: 400 },
      { label: '5 Gallon Pail', price: 260.00, coverageSqFt: 2000 }
    ],
    rating: 4.8,
    reviewsCount: 290,
    isPopular: false,
    isEco: true,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    idealFor: 'DIY home refreshing, guest bedrooms, ceilings, and rental renovations.'
  },
  {
    id: 'bm-scuff-x',
    name: 'Ultra Spec® SCUFF-X® Interior',
    brand: 'Benjamin Moore',
    line: 'Commercial & High-Traffic',
    category: 'interior',
    description: 'Breakthrough single-component interior coating engineered specifically to resist scuff marks and black shoe heel marks in demanding high-traffic environments before they start.',
    features: [
      'Proprietary scuff-resistant formula with no mixing required',
      'Withstands repeated commercial scrubbing and disinfectant cleaning',
      'Low odor and LEED v4 qualifying',
      'Saves thousands in frequent repainting and touch-up cycles'
    ],
    sheens: ['Eggshell', 'Satin', 'Semi-Gloss'],
    sizes: [
      { label: '1 Gallon', price: 84.99, coverageSqFt: 400 },
      { label: '5 Gallon Pail', price: 405.00, coverageSqFt: 2000 }
    ],
    rating: 4.9,
    reviewsCount: 178,
    isPopular: true,
    isEco: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Entry mudrooms, stairwells, school hallways, commercial offices, and retail spaces.'
  },
  {
    id: 'bm-advance-enamel',
    name: 'Advance® Interior Satin Enamel',
    brand: 'Benjamin Moore',
    line: 'Specialty Architectural Enamels',
    category: 'interior',
    description: 'Waterborne alkyd formula providing the mirror-smooth leveling and durability of traditional oil-based paint with the water cleanup, low VOC, and non-yellowing qualities of latex.',
    features: [
      'Flows out glass-smooth with zero brush marks or stipple',
      'Hard, furniture-grade chip-resistant cured finish',
      'Soap and water clean-up without harsh mineral spirits',
      'Will not yellow over time unlike traditional solvent alkyds'
    ],
    sheens: ['Satin', 'Semi-Gloss', 'High Gloss'],
    sizes: [
      { label: '1 Quart', price: 34.99, coverageSqFt: 100 },
      { label: '1 Gallon', price: 86.99, coverageSqFt: 400 }
    ],
    rating: 4.9,
    reviewsCount: 412,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Kitchen cabinets, bathroom vanities, interior doors, baseboards, and custom built-ins.'
  },
  {
    id: 'bm-element-guard',
    name: 'Element Guard® Exterior Paint',
    brand: 'Benjamin Moore',
    line: 'Exterior Performance',
    category: 'exterior',
    description: 'Specially engineered for coastal New England weather to resist high humidity, morning dew, and early rainfall shortly after application, extending the outdoor painting season.',
    features: [
      'Moisture resistant in as little as 60 minutes after painting',
      'Applies down to 35°F (1.7°C) for early spring and late fall projects',
      'Superior adhesion to vinyl, masonry, wood, and fiber cement',
      'UV-blocking pigments that shield against intense seaside sun'
    ],
    sheens: ['Flat / Matte', 'Low Lustre', 'Soft Gloss'],
    sizes: [
      { label: '1 Gallon', price: 82.99, coverageSqFt: 400 },
      { label: '5 Gallon Pail', price: 395.00, coverageSqFt: 2000 }
    ],
    rating: 4.9,
    reviewsCount: 145,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Coastal shingle exteriors, clapboards, trim, porticos, and siding.'
  },
  {
    id: 'bm-woodluxe-stain',
    name: 'Woodluxe® Exterior Deck & Siding Stain',
    brand: 'Benjamin Moore',
    line: 'Exterior Wood Care',
    category: 'stains',
    description: 'Next-generation exterior wood stain formulated to protect and highlight natural wood grain with advanced UV protection and waterproof barrier against harsh Rhode Island winters.',
    features: [
      'Available in Translucent, Semi-Transparent, Semi-Solid, and Solid opacities',
      'Advanced mildewcides prevent black mold spots on coastal cedar',
      'Easy soap and water cleanup with long-lasting grain enhancement'
    ],
    sheens: ['Flat / Matte', 'Satin'],
    sizes: [
      { label: '1 Gallon', price: 74.99, coverageSqFt: 350 },
      { label: '5 Gallon Pail', price: 355.00, coverageSqFt: 1750 }
    ],
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Cedar shakes, mahogany decks, pressure-treated pine, pergolas, and fences.'
  },
  {
    id: 'bm-fresh-start',
    name: 'Fresh Start® High-Hiding Primer',
    brand: 'Benjamin Moore',
    line: 'Primers & Undercoaters',
    category: 'primers',
    description: 'The foundation of every flawless paint finish. Maximum sealing, superior stain blocking against water and cedar bleed, and unmatched adhesion to glossy surfaces.',
    features: [
      'Blocks water stains, tannins, knot holes, and marker stains',
      'Deep penetrating acrylic adhesion eliminates peeling',
      'Creates uniform porosity for maximum topcoat sheen brilliance'
    ],
    sheens: ['Flat / Matte'],
    sizes: [
      { label: '1 Quart', price: 23.99, coverageSqFt: 100 },
      { label: '1 Gallon', price: 56.99, coverageSqFt: 400 },
      { label: '5 Gallon Pail', price: 265.00, coverageSqFt: 2000 }
    ],
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    idealFor: 'New drywall, bare wood, repaired plaster, dark color transitions, and glossy trim.'
  },
  {
    id: 'purdy-pro-kit',
    name: 'Purdy® Nylox™ & White Dove™ Complete Painter Kit',
    brand: 'Purdy',
    line: 'Professional Applicators',
    category: 'supplies',
    description: 'Handcrafted professional applicator kit featuring Purdy Nylox 2.5" angled sash brush, 9" heavy-duty roller frame, 2 high-density lint-free White Dove 3/8" covers, and deep-well metal tray.',
    features: [
      '100% tipped nylon bristle for flawless mirror-smooth latex finishes',
      'Lint-free woven Dralon roller sleeves that leave zero fuzz',
      'Heavy-duty 5-wire cage roller frame with threaded handle'
    ],
    sheens: ['Flat / Matte'],
    sizes: [
      { label: 'Complete 5-Piece Professional Kit', price: 42.99 }
    ],
    rating: 5.0,
    reviewsCount: 310,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Precision cutting-in, interior walls, ceilings, and trim perfection.'
  }
];
