import type { Metadata } from "next";
import { ServiceDetailPage } from "./ServiceDetailPage";

const serviceData: Record<string, { title: string; description: string }> = {
  kitchen: {
    title: "Bespoke Fitted Kitchens",
    description: "Premium made-to-measure fitted kitchens designed and manufactured in the UK. Huge range of colours and finishes.",
  },
  bedroom: {
    title: "Fitted Bedrooms",
    description: "Luxurious fitted bedrooms with innovative storage solutions, soft close doors, and a 7-year guarantee.",
  },
  "media-wall": {
    title: "Media Wall Design",
    description: "Custom entertainment centres and media walls with LED integration and premium finishes.",
  },
  "decor-wall": {
    title: "Decorative Wall Features",
    description: "Stunning decorative wall panels and features that become the focal point of any room.",
  },
  "walk-in-wardrobe": {
    title: "Walk-In Wardrobes",
    description: "Luxurious walk-in wardrobe solutions designed to maximise space and style.",
  },
  "study-offices": {
    title: "Home Office & Study",
    description: "Bespoke home offices and study rooms designed for productivity and elegance.",
  },
  "loft-wardrobe": {
    title: "Loft Wardrobes",
    description: "Made-to-measure loft wardrobes that fit perfectly under angled ceilings.",
  },
  "shoe-rack": {
    title: "Bespoke Shoe Racks",
    description: "Custom shoe storage solutions crafted to keep your collection organised and displayed.",
  },
  understairs: {
    title: "Understairs Storage",
    description: "Transform wasted space beneath your stairs into beautifully organised storage.",
  },
};

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData[slug];
  return {
    title: `${service?.title || "Service"} — HM Elite Interiors`,
    description: service?.description || "Bespoke interior solutions by HM Elite Interiors.",
  };
}

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return <ServiceDetailPage slug={slug} />;
}
