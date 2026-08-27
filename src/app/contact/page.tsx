import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — HM Elite Interiors | Book a Free Consultation",
  description:
    "Get in touch with HM Elite Interiors for a free consultation. WhatsApp +44 7490 180898, email info@hmeliteinteriors.co.uk, or visit us at 10 Feathers Lane, Wraysbury, TW19 5AN.",
};

export default function Page() {
  return <ContactPage />;
}
