export interface Kitchen {
  id: string;
  name: string;
  cats: readonly string[];
  cuisine: string;
  rating: number;
  fee: string;
  mins: readonly number[];
  offer: string | null;
  veg: boolean;
  img: string;
  hygiene: number;
  liveIndex?: number;
  camera: boolean;
  national?: boolean;
}
export type MenuSection = string;
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  section: MenuSection;
  allergens: string[];
  dietary?: "V" | "VG" | "spicy";
}
export interface CartItem {
  key: string;
  dish: Dish;
  quantity: number;
  unitPrice: number;
  options: string[];
  notes: string;
}
export interface Basket {
  kitchenId: string;
  items: CartItem[];
}
export interface PreviewOrder {
  id: string;
  kitchenId: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  service: number;
  total: number;
  mode: "delivery" | "collection";
  time: string;
  createdAt: number;
  mobile?: string;
  address?: string;
  postcode?: string;
  emailSent?: boolean;
  customerName?: string;
  customerEmail?: string;
  discount?: number;
  coupons?: { id: string; label: string; value: number }[];
  allergy?: string;
}

export type Category = [id: string, label: string];
export interface KitchenData {
  name: string;
  cats: string[];
  cuisine: string;
  rating: number;
  fee: string;
  mins: number[];
  offer: string | null;
  veg: boolean;
}
export interface DineKitchenData {
  id: string;
  name: string;
  cuisine: string;
  town: string;
  addr: string;
  about: string;
}
export interface LiveKitchenVideo {
  name: string;
  sub: string;
  cap: string;
  video: boolean;
}
export interface LiveKitchenData {
  name: string;
  cuisine: string;
  town: string;
}
export interface Auction {
  dish: string;
  img: string;
  kitchen: string;
  start: string;
  bid: string | null;
  endsMin: number;
  status: string;
}
export interface Offer {
  t: string;
  s: string;
  b: string;
  bg: string;
  img: string;
}
export interface JoinCard {
  ic: string;
  t: string;
  s: string;
  href: string;
}
export interface Coupon {
  id: string;
  amount: string;
  unit: string;
  title: string;
  line: string;
  label: string;
}
export interface FunFact {
  tag: string;
  text: string;
  image: string;
}
export interface SignupResult {
  saved: boolean;
  configured: boolean;
  error?: string;
}
