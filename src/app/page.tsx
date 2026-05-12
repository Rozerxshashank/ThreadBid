import { HeroSection } from "@/components/home/HeroSection";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { LiveAuctionsStrip } from "@/components/home/LiveAuctionsStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustBadges } from "@/components/home/TrustBadges";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <LiveAuctionsStrip />
      <HowItWorks />
      <TrustBadges />
    </>
  );
}
