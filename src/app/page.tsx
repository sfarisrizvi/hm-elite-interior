import { HeroMorph } from "@/components/sections/HeroMorph";
import { FrameSequence } from "@/components/sections/FrameSequence";
import { AboutSection } from "@/components/sections/AboutSection";
import { HorizontalCategories } from "@/components/sections/HorizontalCategories";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { Showreel } from "@/components/sections/Showreel";
import { TeamSection } from "@/components/sections/TeamSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroMorph />
      <FrameSequence />
      <AboutSection />
      <HorizontalCategories />
      <BeforeAfterSlider />
      <BentoGrid />
      <WhyChooseUsSection />
      <Showreel />
      <TeamSection />
      <ContactCTA />
    </>
  );
}
