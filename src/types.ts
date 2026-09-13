export type StoreId = 'cranston' | 'smithfield' | 'middletown' | 'wakefield' | 'north-kingstown';

export interface StoreLocation {
  id: StoreId;
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  city: string;
  state: 'RI';
  zip: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  openUntilText: string;
  manager: string;
  features: string[];
  lat: number;
  lng: number;
  isFlagship?: boolean;
}

export type PaintCategory = 'interior' | 'exterior' | 'stains' | 'primers' | 'supplies' | 'window-treatments' | 'wallpaper';

export type SheenType = 'Flat / Matte' | 'Eggshell' | 'Satin' | 'Semi-Gloss' | 'High Gloss' | 'Low Lustre' | 'Soft Gloss';

export interface PaintProduct {
  id: string;
  name: string;
  brand: 'Benjamin Moore' | 'Hunter Douglas' | 'Wooster' | 'Purdy' | 'Thibaut';
  line: string;
  category: PaintCategory;
  description: string;
  features: string[];
  sheens: SheenType[];
  sizes: {
    label: string;
    price: number;
    coverageSqFt?: number;
  }[];
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isEco?: boolean;
  image: string;
  idealFor: string;
}

export interface ColorSwatch {
  id: string;
  name: string;
  code: string;
  hex: string;
  collection: 'Historical Collection' | 'Color Preview' | 'Affinity' | 'Whites & Off-Whites' | 'New England Coastal' | 'Designer Classics';
  family: 'whites' | 'blues' | 'greens' | 'grays' | 'warm-neutrals' | 'accents';
  lrv: number; // Light Reflectance Value 0-100
  description: string;
  undertone: string;
  complements: {
    name: string;
    code: string;
    hex: string;
    role: 'Trim / Molding' | 'Ceiling' | 'Accent Wall';
  }[];
}

export type RoomTypeId = 'living' | 'kitchen' | 'bedroom' | 'exterior';

export interface RoomScene {
  id: RoomTypeId;
  title: string;
  subtitle: string;
  defaultColorId: string;
}

export interface WindowTreatment {
  id: string;
  name: string;
  collection: string;
  brand: 'Hunter Douglas';
  tagline: string;
  description: string;
  features: string[];
  controlTypes: string[];
  opacityLevels: string[];
  image: string;
  startingPrice: string;
}

export interface CartItem {
  id: string;
  productId?: string;
  productName: string;
  brand: string;
  colorName?: string;
  colorCode?: string;
  colorHex?: string;
  sheen?: SheenType;
  sizeLabel: string;
  price: number;
  quantity: number;
  image: string;
  type: 'paint-can' | 'sample-pot' | 'supply' | 'window-consult';
}

export interface ConsultationRequest {
  serviceType: 'In-Store Color Consultation' | 'In-Home Window Treatments' | 'Contractor Pro Service' | 'Wallpaper & Finishes';
  storeId: StoreId;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  projectDescription: string;
  roomsCount: number;
  address?: string;
}
