import { WindowTreatment } from '../types';

export const WINDOW_TREATMENTS: WindowTreatment[] = [
  {
    id: 'hd-duette',
    name: 'Duette® Honeycomb Shades',
    collection: 'Cellular Shades',
    brand: 'Hunter Douglas',
    tagline: 'Industry-Leading Energy Efficiency & Acoustic Comfort',
    description: 'The original cellular honeycomb shades engineered to trap air in distinct pockets, keeping your home warm in New England winters and cool in summer while softening incoming light.',
    features: [
      'Architella® honeycomb-within-a-honeycomb design reduces energy loss through windows up to 40%',
      'Absorbs up to 70% of ambient acoustic noise for quieter rooms',
      'Available in Top-Down/Bottom-Up and PowerView® automated motorization',
      'Over 150 designer fabric colors and textures'
    ],
    controlTypes: ['PowerView® Smart Automation', 'LiteRise® Cordless Push/Pull', 'UltraGlide® Wand'],
    opacityLevels: ['Sheer', 'Semi-Sheer', 'Semi-Opaque', 'Opaque (Blackout)'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    startingPrice: 'Custom Quote / Free In-Home Measure'
  },
  {
    id: 'hd-silhouette',
    name: 'Silhouette® Window Shadings',
    collection: 'Sheer Shadings',
    brand: 'Hunter Douglas',
    tagline: 'Transform Harsh Sunlight into Soft Ambient Glow',
    description: 'Signature S-shaped fabric vanes floating between two sheer fabric panels. Tilt vanes to control light and privacy while filtering out up to 88% of harmful UV rays.',
    features: [
      'Filters intense glare while maintaining outward outdoor views',
      'Protects flooring, art, and Benjamin Moore painted walls from UV sun fading',
      'ClearView® specialty sheens for superior exterior view clarity',
      'A Deux® dual-shade option combines sheer with independent blackout roller'
    ],
    controlTypes: ['PowerView® Smart Motorization', 'EasyRise® Continuous Cord Loop', 'SoftTouch® Battery Wand'],
    opacityLevels: ['Light Filtering', 'Room Darkening'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    startingPrice: 'Custom Quote / Free In-Home Measure'
  },
  {
    id: 'hd-heritance',
    name: 'Heritance® Hardwood Shutters',
    collection: 'Plantation Shutters',
    brand: 'Hunter Douglas',
    tagline: 'Artisanal Craftsmanship from 100% Genuine Hardwood',
    description: 'Handcrafted from seasoned American basswood with master Truemill® dovetail joinery. Adds permanent architectural value and coastal classic character to any home.',
    features: [
      'Crafted from sustainable genuine basswood and poplar',
      'Integra™ multi-coat luster finish resists fading and peeling',
      'Custom color matching to any Benjamin Moore paint color',
      'Specialty shapes for arches, sunbursts, French doors, and bay windows'
    ],
    controlTypes: ['Traditional Front Tilt Bar', 'Hidden Tilt Rear Gear System'],
    opacityLevels: ['Complete Light Blocking & Privacy'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    startingPrice: 'Custom Quote / Free In-Home Measure'
  },
  {
    id: 'hd-luminette',
    name: 'Luminette® Privacy Sheers',
    collection: 'Vertical Sheers & Drapery',
    brand: 'Hunter Douglas',
    tagline: 'Drapery Grandeur with Precision Light Control',
    description: 'Specially designed for wide expanses of glass, sliding patio doors, and walls of windows. Soft fabric drapery faces integrate rotating vertical fabric vanes.',
    features: [
      'Seamlessly spans large coastal patio sliders up to 192 inches wide',
      'Vanes rotate 180 degrees for infinite light control',
      'Coordinates with Hunter Douglas Silhouette® fabrics for whole-home harmony'
    ],
    controlTypes: ['PowerView® Automation', 'Combination Wand / Cord Control'],
    opacityLevels: ['Translucent Sheer', 'Room Darkening'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    startingPrice: 'Custom Quote / Free In-Home Measure'
  },
  {
    id: 'hd-powerview',
    name: 'PowerView® Smart Automation',
    collection: 'Smart Home Integration',
    brand: 'Hunter Douglas',
    tagline: 'Window Treatments That Move with the Rhythm of Your Day',
    description: 'Award-winning motorized smart shade system. Program your window treatments to open with the sunrise, close during mid-day heat, or sync with Amazon Alexa, Apple HomeKit, and Google Home.',
    features: [
      'Rechargeable internal battery wand with up to 1 year battery life per charge',
      'Scene scheduling to maximize heating and cooling efficiency',
      'Operate with Pebble® remote, smart phone app, or voice commands'
    ],
    controlTypes: ['PowerView App (iOS/Android)', 'Pebble Remote', 'Voice Control'],
    opacityLevels: ['Available across all Hunter Douglas product lines'],
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
    startingPrice: 'Motorization upgrade available on all styles'
  }
];
