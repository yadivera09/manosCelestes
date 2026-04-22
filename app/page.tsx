import HeroSection from "@/components/landing/HeroSection";
import QuienesSomosSection from "@/components/landing/QuienesSomosSection";
import ImpactSection from "@/components/landing/ImpactSection";
import ActivitiesSection from "@/components/landing/ActivitiesSection";
import TeamSection from "@/components/landing/TeamSection";
import InvolucrateSection from "@/components/landing/InvolucrateSection";

import { getSettings } from "@/app/actions/settings";

import { getStats } from "@/app/actions/stats";
import { getActivities } from "@/app/actions/activities";
import { getTeam } from "@/app/actions/team";

export default async function Home() {
  const { data: settings } = await getSettings();
  const { data: stats } = await getStats();
  const { data: activities } = await getActivities();
  const { data: team } = await getTeam();

  return (
    <main>
      <HeroSection settings={settings?.['hero']} />
      <QuienesSomosSection settings={settings?.['nosotros']} />
      <ImpactSection stats={stats || []} />
      <ActivitiesSection activities={activities || []} />
      <TeamSection team={team || []} />
      <InvolucrateSection settings={settings?.['involucrate']} />
    </main>
  );
}
