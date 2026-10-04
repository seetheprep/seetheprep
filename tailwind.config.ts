import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// Edit brand values here: utilities and approved component CSS share these tokens.
const colors = {
  orange: "#F26B21",
  "orange-light": "#FF9A4D",
  "orange-deep": "#E0561A",
  ink: "#111111",
  cream: "#FAF7F2",
  night: "#141210",
  live: "#FF3B30",
  hygiene: "#1B7F3B",
  "fork-yellow": "#F1B528",
  white: "#FFFFFF",
  line: "#ECE4DB",
  muted: "#7A726A",
  soft: "#F4EFE9",
  tracking: "#0E0C0B",
  "tone-14": "#222222",
  "tone-15": "#EDE6DD",
  "tone-16": "#BDB3AA",
  "tone-17": "#000000",
  "tone-18": "#2A2622",
  "tone-19": "#1D1916",
  "tone-20": "#E9E2DA",
  "tone-21": "#FFE0C7",
  "tone-22": "#D9ECF7",
  "tone-23": "#E2F3DA",
  "tone-24": "#8C827A",
  "tone-25": "#2D2824",
  "tone-26": "#DCCFC2",
  "tone-27": "#FFF1E6",
  "tone-28": "#A69C92",
  "tone-29": "#2F2A26",
  "tone-30": "#26221F",
  "tone-31": "#EDE6DF",
  "tone-32": "#1E1B18",
  "tone-33": "#CFC6BD",
  "tone-34": "#E8F5E9",
  "tone-35": "#C8E6C9",
  "tone-36": "#1B5E20",
  "tone-37": "#4A443E",
  "tone-38": "#E4DBD1",
  "tone-39": "#C9C0B6",
  "tone-40": "#DDDDDD",
  "tone-41": "#2E7D32",
  "tone-42": "#665E56",
  "tone-43": "#A94210",
  "tone-44": "#A79D94",
  "tone-45": "#23180F12",
  "tone-46": "#1112",
  "tone-47": "#665D54",
  "tone-48": "#EEE7DF",
  "tone-49": "#665E55",
  "tone-50": "#0003",
  "tone-51": "#EEE8E1",
  "tone-52": "#FFFFFF80",
  "tone-53": "#50280A1A",
  "tone-54": "#776E65",
  "tone-55": "#F2E9DF",
  "tone-56": "#F26B2140",
  "tone-57": "#0004",
  "tone-58": "#0009",
  "tone-59": "#D4CABE",
  "tone-60": "#1111",
  "tone-61": "#EEE6DC",
  "tone-62": "#7B310C",
  "tone-63": "#EBC3A5",
  "tone-64": "#D8B79D",
  "tone-65": "#DED4C9",
  "tone-66": "#8C370C",
  "tone-67": "#3A342E",
  "tone-68": "#B3A89E",
  "tone-69": "#2B241F",
  "tone-70": "#0002",
  "tone-71": "#A64714",
  "tone-72": "#EEE5DC",
  "tone-73": "#FFDFC6",
  "tone-74": "#71665C",
  "tone-75": "#51463C",
  "tone-76": "#25211E",
  "tone-77": "#000C",
  "tone-78": "#111B",
  "tone-79": "#D5CBC2",
  "tone-80": "#39312B",
  "tone-81": "#201C18",
  "tone-82": "#F2E4D5",
  "tone-83": "#000E",
  "tone-84": "#E3D9CF",
  "tone-85": "#111A",
  "tone-86": "#2B251F",
  "tone-87": "#E2D9D0",
  "tone-88": "#B7ACA2",
  "tone-89": "#51473E",
  "tone-90": "#F26B2190",
  "tone-91": "#C1B5AA",
  "tone-92": "#544A40",
  "tone-93": "#211D19",
  "tone-94": "#B5DBB9",
  "tone-95": "#29241F",
  "tone-96": "#FFC21A",
  "tone-97": "#B5ADA5",
  "tone-98": "#1115",
  "tone-99": "#FFF6",
  "tone-100": "#F2EDE7",
  "tone-101": "#1118",
  "tone-102": "#FFFFFF30",
  "tone-103": "#FFFFFF50",
  "tone-104": "#FFF4",
  "tone-105": "#1113",
  "tone-106": "#E8DFD6",
  "tone-107": "#2A1E16",
  "tone-108": "#4A2E1C",
  "tone-109": "#FFB27A",
  "tone-110": "#FF8B83",
  "tone-111": "#322A23",
  "tone-112": "#534538",
  "tone-113": "#C8BFB7",
  "tone-114": "#847365",
  "tone-115": "#0E0C0BEF",
  "tone-116": "#FFFFFF0D",
  "tone-117": "#FFFFFF70",
  "tone-118": "#B4AAA1",
  "tone-119": "#37312D",
  "tone-120": "#2B231C",
  "tone-121": "#171411",
  "tone-122": "#E9E0D7",
  "tone-123": "#F1EDE7",
  "tone-124": "#6B635B",
  "tone-125": "#70685F",
  "tone-126": "#3A342F",
  "tone-127": "#C9BFB4",
  "tone-128": "#9B3F10",
  "tone-129": "#AC271E",
  "tone-133": "#8B8176",
  "tone-132": "#BDD7DE",
  "tone-131": "#DCE6D2",
  "tone-130": "#E6DFD5",
};
const radius = { sm: "12px", md: "20px", lg: "28px", pill: "999px" };
const expo = "cubic-bezier(.22,1,.36,1)";
const keyframes = {
  bob: {
    "0%,100%": {
      transform: "translateY(0) rotate(0)",
    },
    "50%": {
      transform: "translateY(-10px) rotate(-4deg)",
    },
  },
  hop: {
    "50%": {
      transform: "translateY(-8px)",
    },
  },
  fade: {
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  },
  dropIn: {
    from: {
      opacity: "0",
      transform: "translateY(-16px)",
    },
    to: {
      opacity: "1",
      transform: "none",
    },
  },
  rise: {
    from: {
      transform: "translateY(105%)",
    },
    to: {
      transform: "none",
    },
  },
  underline: {
    from: {
      transform: "scaleX(0)",
    },
    to: {
      transform: "scaleX(1)",
    },
  },
  plateIn: {
    from: {
      opacity: "0",
      transform: "translate(60px,70px) rotate(10deg) scale(.94)",
    },
    to: {
      opacity: "1",
      transform: "none",
    },
  },
  wiggle: {
    "0%": {
      transform: "rotate(0)",
    },
    "30%": {
      transform: "rotate(-5deg) scale(1.01)",
    },
    "60%": {
      transform: "rotate(3deg)",
    },
    "100%": {
      transform: "rotate(0)",
    },
  },
  jelly: {
    "0%": {
      transform: "scale(1,1)",
    },
    "30%": {
      transform: "scale(1.05,.95) rotate(-4deg)",
    },
    "55%": {
      transform: "scale(.97,1.03) rotate(3deg)",
    },
    "75%": {
      transform: "scale(1.02,.98) rotate(-1deg)",
    },
    "100%": {
      transform: "none",
    },
  },
  steam: {
    "0%": {
      opacity: "0",
      transform: "translateY(10px)",
    },
    "35%": {
      opacity: ".45",
    },
    "100%": {
      opacity: "0",
      transform: "translateY(-36px)",
    },
  },
  rec: {
    "0%,33%": {
      opacity: "1",
    },
    "16%,50%,100%": {
      opacity: "0",
    },
  },
  float: {
    "0%,100%": {
      transform: "translateY(0) rotate(0)",
    },
    "50%": {
      transform: "translateY(-8px) rotate(-1.5deg)",
    },
  },
  cardUp: {
    from: {
      opacity: "0",
      transform: "translateY(28px)",
    },
    to: {
      opacity: "1",
      transform: "none",
    },
  },
  pulse: {
    from: {
      transform: "scale(1)",
      opacity: ".7",
    },
    to: {
      transform: "scale(2.6)",
      opacity: "0",
    },
  },
  ph: {
    "0%": {
      opacity: "0",
      transform: "translateY(8px)",
    },
    "3%,30%": {
      opacity: "1",
      transform: "none",
    },
    "33%,100%": {
      opacity: "0",
      transform: "translateY(-8px)",
    },
  },
  pop: {
    "0%": {
      transform: "scale(1)",
    },
    "40%": {
      transform: "scale(1.35)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  kb: {
    from: {
      transform: "scale(1)",
    },
    to: {
      transform: "scale(1.07) translate(-1.5%,-1%)",
    },
  },
  popin: {
    from: {
      transform: "scale(.4)",
      opacity: "0",
    },
    to: {
      transform: "none",
      opacity: "1",
    },
  },
  fill: {
    from: {
      transform: "scaleX(0)",
    },
    to: {
      transform: "scaleX(1)",
    },
  },
  load: {
    "0%": {
      transform: "translateX(-100%)",
    },
    "100%": {
      transform: "translateX(100%)",
    },
  },
  livePulse: {
    "0%": {
      transform: "scale(1)",
      opacity: ".7",
    },
    "100%": {
      transform: "scale(2.8)",
      opacity: "0",
    },
  },
  cartBounce: {
    "0%,100%": {
      transform: "scale(1)",
    },
    "45%": {
      transform: "scale(1.3)",
    },
    "70%": {
      transform: "scale(.94)",
    },
  },
  shimmer: {
    to: {
      transform: "translateX(100%)",
    },
  },
  sheetUp: {
    from: {
      transform: "translateY(60px)",
      opacity: "0",
    },
    to: {
      transform: "none",
      opacity: "1",
    },
  },
  numberRoll: {
    from: {
      transform: "translateY(4px)",
      opacity: ".4",
    },
    to: {
      transform: "none",
      opacity: "1",
    },
  },
  refreshSpin: {
    to: {
      transform: "rotate(360deg)",
    },
  },
  newPulse: {
    "50%": {
      opacity: ".65",
    },
  },
  toastIn: {
    from: {
      opacity: "0",
      transform: "translateY(14px)",
    },
    to: {
      opacity: "1",
      transform: "none",
    },
  },
  swipeNudge: {
    "50%": {
      transform: "translateX(5px)",
    },
  },
  liveFlip: {
    from: {
      transform: "rotateX(90deg) scale(.8)",
      opacity: "0",
    },
    "65%": {
      transform: "scale(1.1)",
    },
    to: {
      transform: "none",
      opacity: "1",
    },
  },
  soldStamp: {
    from: {
      transform: "rotate(-22deg) scale(1.8)",
      opacity: "0",
    },
    to: {
      transform: "rotate(-14deg) scale(1)",
      opacity: "1",
    },
  },
  waitingRing: {
    "50%": {
      transform: "scale(1.1)",
      opacity: ".4",
    },
  },
  liveFlash: {
    "0%": {
      opacity: ".65",
    },
    "100%": {
      opacity: "0",
    },
  },
  riderTravel: {
    "0%": {
      transform: "translate(90px,235px)",
    },
    "20%": {
      transform: "translate(94px,187px)",
    },
    "65%": {
      transform: "translate(219px,175px)",
    },
    "85%": {
      transform: "translate(225px,110px)",
    },
    "100%": {
      transform: "translate(300px,115px)",
    },
  },
  couponTear: {
    "0%,100%": {
      transform: "none",
    },
    "35%": {
      transform: "translateX(-5px) rotate(-3deg)",
    },
    "65%": {
      transform: "translateX(-2px) rotate(2deg)",
    },
  },
  auctionDrift: {
    to: {
      transform: "translateX(-50%)",
    },
  },
  finalRider: {
    "0%": {
      transform: "translate(90px,197px)",
    },
    "55%": {
      transform: "translate(218px,190px)",
    },
    "72%": {
      transform: "translate(230px,124px)",
    },
    "100%": {
      transform: "translate(315px,120px)",
    },
  },
};
export default {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors,
      borderRadius: radius,
      transitionTimingFunction: { expo },
      fontFamily: { jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"] },
      fontWeight: { medium: "500", bold: "700", extrabold: "800" },
      keyframes,
      animation: {
        shimmer: "shimmer 1.5s linear infinite",
        pulse: "liveDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          ...Object.fromEntries(
            Object.entries(colors).map(([name, value]) => ["--" + name, value]),
          ),
          ...{
            "--orange-1": "var(--orange-light)",
            "--orange-3": "var(--orange-deep)",
            "--yellow": "var(--fork-yellow)",
            "--card": "var(--white)",
            "--green": "var(--hygiene)",
            "--gutter": "16px",
            "--app-muted": "var(--tone-125)",
            "--app-ease": "cubic-bezier(.22,1,.36,1)",
          },
          "--ease": expo,
          "--r-sm": radius.sm,
          "--r-md": radius.md,
          "--r-lg": radius.lg,
        },
        ...Object.fromEntries(
          Object.entries(keyframes).map(([name, frames]) => ["@keyframes " + name, frames]),
        ),
      });
    }),
  ],
} satisfies Config;
