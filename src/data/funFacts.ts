import type { FunFact } from "@/lib/types";
export const trackingFacts: FunFact[] = [
  {
    tag: "FUN FACT",
    text: "Britain’s first fish and chip shops opened in the 1860s.",
    image: "fish-and-chips",
  },
  {
    tag: "CHEF’S TIP",
    text: "Resting fried chicken for a minute keeps the coating extra crunchy.",
    image: "fried-chicken",
  },
  {
    tag: "DID YOU KNOW?",
    text: "The Margherita pizza is said to be named after Queen Margherita of Italy.",
    image: "pizza",
  },
];

export const cameraStatus = [
  ["Waiting for the kitchen to accept", "Usually under a minute"],
  ["Your food is being cooked", "Watch every step, live"],
  ["Packed and handed to your rider", "Your food is ready for the journey"],
  ["On its way", "Follow your rider on the map"],
];
export const noCameraStatus = [
  ["The kitchen has your order", "Accepted and getting ready"],
  ["Your food is being cooked", "Freshly prepared for you"],
  cameraStatus[2],
  cameraStatus[3],
];
