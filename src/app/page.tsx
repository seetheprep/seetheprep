import { Craving } from "@/components/home/Craving";
import { DineIn } from "@/components/home/DineIn";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Footer, JoinCards } from "@/components/home/JoinCards";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <DineIn />
      <Craving />
      <HowItWorks />
      <JoinCards />
      <Footer />
    </main>
  );
}
