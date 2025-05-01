import { useTranslations } from "next-intl";
import HeroSection from "@/components/hero-section";
import TeamSection from "@/components/team-section";
import ClientsSection from "@/components/clients-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TeamSection />
      <ClientsSection />
    </main>
  );
}
