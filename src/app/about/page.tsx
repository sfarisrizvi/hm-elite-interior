import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us — HM Elite Interiors | Bespoke Interior Design UK",
  description:
    "Learn about HM Elite Interiors — a trusted name in bespoke interior solutions. Proudly designed and crafted in the UK with a focus on craftsmanship and innovation.",
};

export default function Page() {
  return <AboutPage />;
}
