import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Our Services — HM Elite Interiors | Fitted Kitchens, Bedrooms & More",
  description:
    "Explore our comprehensive range of bespoke interior services — fitted kitchens, bedrooms, media walls, walk-in wardrobes, home offices, and more. Made to measure in the UK.",
};

export default function Page() {
  return <ServicesPage />;
}
