import type { Coupon } from "@/lib/types";
export const coupons: Coupon[] = [
  {
    id: "live-fifteen",
    amount: "15%",
    unit: "OFF",
    title: "Watch it cook",
    line: "Any kitchen on camera",
    label: "15% off live kitchens",
  },
  {
    id: "free-delivery",
    amount: "FREE",
    unit: "DELIVERY",
    title: "Your first live order",
    line: "No minimum spend",
    label: "Free delivery",
  },
  {
    id: "before-eight",
    amount: "£5",
    unit: "OFF",
    title: "Order before 8pm",
    line: "Watch the kitchen go live",
    label: "£5 off before 8pm",
  },
];
