import HeroSection from "@/components/landing/HeroSection";
import QuienesSomosSection from "@/components/landing/QuienesSomosSection";
import ImpactSection from "@/components/landing/ImpactSection";
import ActivitiesSection from "@/components/landing/ActivitiesSection";
import TeamSection from "@/components/landing/TeamSection";
import InvolucrateSection from "@/components/landing/InvolucrateSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <QuienesSomosSection />
      <ImpactSection />
      <ActivitiesSection />
      <TeamSection />
      <InvolucrateSection />
    </main>
  );
}
