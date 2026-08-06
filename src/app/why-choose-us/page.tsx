import type { Metadata } from "next";
import { WhyChooseUsPage } from "./WhyChooseUsPage";

export const metadata: Metadata = {
  title: "Why Choose Us — HM Elite Interiors | UK Interior Design",
  description:
    "Discover why homeowners across the UK trust HM Elite Interiors — UK manufactured, 7-year guarantee, in-house fitters, 200+ design choices, and exceptional customer service.",
};

export default function Page() {
  return <WhyChooseUsPage />;
}
