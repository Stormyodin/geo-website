import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import HighlightsSection from "@/components/home/HighlightsSection";
import InfoSection from "@/components/home/InfoSection";
import StatsSection from "@/components/home/StatsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HighlightsSection />
      <InfoSection />
      <StatsSection />
      <CtaSection />
    </main>
  );
}
