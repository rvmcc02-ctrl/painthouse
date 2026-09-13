import { ColorSwatch } from '../types';

export const BENJAMIN_MOORE_COLORS: ColorSwatch[] = [
  {
    id: 'hale-navy',
    name: 'Hale Navy',
    code: 'HC-154',
    hex: '#2F3C47',
    collection: 'Historical Collection',
    family: 'blues',
    lrv: 8.36,
    description: 'A timeless, deep navy classic with subtle charcoal notes that brings enduring maritime elegance to any room or exterior.',
    undertone: 'Deep slate navy with muted charcoal',
    complements: [
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Trim / Molding' },
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Ceiling' },
      { name: 'Revere Pewter', code: 'HC-172', hex: '#CBC6B8', role: 'Accent Wall' }
    ]
  },
  {
    id: 'revere-pewter',
    name: 'Revere Pewter',
    code: 'HC-172',
    hex: '#CBC6B8',
    collection: 'Historical Collection',
    family: 'warm-neutrals',
    lrv: 55.51,
    description: 'An iconic, highly adaptable neutral that bridges warm gray and beige with effortless warmth under natural and warm light.',
    undertone: 'Warm greige with soft earthen tint',
    complements: [
      { name: 'Simply White', code: 'OC-117', hex: '#F7F6EE', role: 'Trim / Molding' },
      { name: 'Chelsea Gray', code: 'HC-168', hex: '#84837E', role: 'Accent Wall' },
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Ceiling' }
    ]
  },
  {
    id: 'white-dove',
    name: 'White Dove',
    code: 'OC-17',
    hex: '#F0EFEA',
    collection: 'Whites & Off-Whites',
    family: 'whites',
    lrv: 83.16,
    description: 'The premier warm white beloved by interior designers. Luminous and gentle without ever turning yellow or sterile.',
    undertone: 'Warm luminous white with a drop of greige',
    complements: [
      { name: 'Kendall Charcoal', code: 'HC-166', hex: '#585955', role: 'Accent Wall' },
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Trim / Molding' },
      { name: 'Hale Navy', code: 'HC-154', hex: '#2F3C47', role: 'Accent Wall' }
    ]
  },
  {
    id: 'chantilly-lace',
    name: 'Chantilly Lace',
    code: 'OC-65',
    hex: '#F5F5F3',
    collection: 'Whites & Off-Whites',
    family: 'whites',
    lrv: 90.04,
    description: 'Benjamin Moore’s crispest, purest white with virtually no warm or cool undertones—creating pristine contrast for millwork.',
    undertone: 'Ultra-clean pure neutral white',
    complements: [
      { name: 'Hale Navy', code: 'HC-154', hex: '#2F3C47', role: 'Accent Wall' },
      { name: 'Wrought Iron', code: '2124-10', hex: '#3B3D3E', role: 'Accent Wall' },
      { name: 'Aegean Teal', code: '2136-40', hex: '#4B6B75', role: 'Accent Wall' }
    ]
  },
  {
    id: 'aegean-teal',
    name: 'Aegean Teal',
    code: '2136-40',
    hex: '#4B6B75',
    collection: 'Color Preview',
    family: 'blues',
    lrv: 23.96,
    description: 'An intriguing, calming blue-green softened by a dusty gray cast. Celebrated for creating serene, grounded sanctuaries.',
    undertone: 'Soft blue-green with slate undertone',
    complements: [
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Trim / Molding' },
      { name: 'Fog Mist', code: 'OC-31', hex: '#DFDDD5', role: 'Ceiling' },
      { name: 'Simply White', code: 'OC-117', hex: '#F7F6EE', role: 'Trim / Molding' }
    ]
  },
  {
    id: 'caldwell-green',
    name: 'Caldwell Green',
    code: 'HC-124',
    hex: '#626B5D',
    collection: 'Historical Collection',
    family: 'greens',
    lrv: 16.48,
    description: 'A stately historic olive-sage that infuses natural botanical depth into library walls, dining rooms, and cabinetry.',
    undertone: 'Rich earthen botanical olive-moss',
    complements: [
      { name: 'Simply White', code: 'OC-117', hex: '#F7F6EE', role: 'Trim / Molding' },
      { name: 'Pale Oak', code: 'OC-20', hex: '#DEDBD2', role: 'Ceiling' },
      { name: 'Wrought Iron', code: '2124-10', hex: '#3B3D3E', role: 'Accent Wall' }
    ]
  },
  {
    id: 'kendall-charcoal',
    name: 'Kendall Charcoal',
    code: 'HC-166',
    hex: '#585955',
    collection: 'Historical Collection',
    family: 'grays',
    lrv: 12.96,
    description: 'A versatile and luxurious deep charcoal that works brilliantly on accent walls, kitchen islands, and dramatic exteriors.',
    undertone: 'Warm deep slate with rich green-bronze hint',
    complements: [
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Trim / Molding' },
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Ceiling' },
      { name: 'First Light', code: '2102-70', hex: '#EBE2DC', role: 'Accent Wall' }
    ]
  },
  {
    id: 'pale-oak',
    name: 'Pale Oak',
    code: 'OC-20',
    hex: '#DEDBD2',
    collection: 'Whites & Off-Whites',
    family: 'warm-neutrals',
    lrv: 68.64,
    description: 'A delicate, sophisticated greige reminiscent of sun-bleached European white oak with subtle blush-warmth.',
    undertone: 'Gentle warm taupe greige',
    complements: [
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Trim / Molding' },
      { name: 'Chelsea Gray', code: 'HC-168', hex: '#84837E', role: 'Accent Wall' },
      { name: 'Simply White', code: 'OC-117', hex: '#F7F6EE', role: 'Ceiling' }
    ]
  },
  {
    id: 'smoke',
    name: 'Smoke',
    code: '2122-40',
    hex: '#96A9AB',
    collection: 'Color Preview',
    family: 'blues',
    lrv: 56.49,
    description: 'An ethereal, coastal blue with silvery-gray undertones that mirrors morning Rhode Island coastal fog.',
    undertone: 'Silvery soft coastal blue-gray',
    complements: [
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Trim / Molding' },
      { name: 'Hale Navy', code: 'HC-154', hex: '#2F3C47', role: 'Accent Wall' },
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Ceiling' }
    ]
  },
  {
    id: 'wrought-iron',
    name: 'Wrought Iron',
    code: '2124-10',
    hex: '#3B3D3E',
    collection: 'Color Preview',
    family: 'grays',
    lrv: 6.16,
    description: 'A charismatic soft black with gentle charcoal and navy undertones, much softer and more welcoming than harsh jet black.',
    undertone: 'Soft velvety charcoal black',
    complements: [
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Trim / Molding' },
      { name: 'Revere Pewter', code: 'HC-172', hex: '#CBC6B8', role: 'Accent Wall' },
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Ceiling' }
    ]
  },
  {
    id: 'chelsea-gray',
    name: 'Chelsea Gray',
    code: 'HC-168',
    hex: '#84837E',
    collection: 'Historical Collection',
    family: 'grays',
    lrv: 22.16,
    description: 'A rich, substantial architectural gray with warm earthen balance. A designer staple for cabinetry, trim, and doors.',
    undertone: 'Mid-tone warm stony gray',
    complements: [
      { name: 'Simply White', code: 'OC-117', hex: '#F7F6EE', role: 'Trim / Molding' },
      { name: 'Pale Oak', code: 'OC-20', hex: '#DEDBD2', role: 'Accent Wall' },
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Ceiling' }
    ]
  },
  {
    id: 'october-mist',
    name: 'October Mist',
    code: '1495',
    hex: '#BFC5B7',
    collection: 'Color Preview',
    family: 'greens',
    lrv: 46.33,
    description: 'A delicate botanical sage that evokes the silvery underside of olive leaves, harmonizing effortless relaxation.',
    undertone: 'Silvery soft botanical sage',
    complements: [
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Trim / Molding' },
      { name: 'Caldwell Green', code: 'HC-124', hex: '#626B5D', role: 'Accent Wall' },
      { name: 'Simply White', code: 'OC-117', hex: '#F7F6EE', role: 'Ceiling' }
    ]
  },
  {
    id: 'caliente',
    name: 'Caliente',
    code: 'AF-290',
    hex: '#962A2B',
    collection: 'Affinity',
    family: 'accents',
    lrv: 11.02,
    description: 'A magnetic, courageous, radiant red that makes statement front doors, focal accent walls, and dining rooms unforgettable.',
    undertone: 'Vibrant ruby red with warm spice',
    complements: [
      { name: 'Chantilly Lace', code: 'OC-65', hex: '#F5F5F3', role: 'Trim / Molding' },
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Ceiling' },
      { name: 'Kendall Charcoal', code: 'HC-166', hex: '#585955', role: 'Accent Wall' }
    ]
  },
  {
    id: 'hawthorne-yellow',
    name: 'Hawthorne Yellow',
    code: 'HC-4',
    hex: '#E9CE87',
    collection: 'Historical Collection',
    family: 'warm-neutrals',
    lrv: 66.82,
    description: 'A historic New England sunshine hue that brings gentle optimism, light, and warmth without ever being brassy.',
    undertone: 'Historic creamy buttery gold',
    complements: [
      { name: 'White Dove', code: 'OC-17', hex: '#F0EFEA', role: 'Trim / Molding' },
      { name: 'Hale Navy', code: 'HC-154', hex: '#2F3C47', role: 'Accent Wall' },
      { name: 'Simply White', code: 'OC-117', hex: '#F7F6EE', role: 'Ceiling' }
    ]
  }
];
