import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import HighlightsSection from "@/components/home/HighlightsSection";
import InfoSection from "@/components/home/InfoSection";
import StatsSection from "@/components/home/StatsSection";
import ReviewSection from "@/components/ReviewSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HighlightsSection />
      <InfoSection />
      <StatsSection />
      <ReviewSection context="home" title="Visitor Experiences" />
      <CtaSection />
    </main>
  );
}
