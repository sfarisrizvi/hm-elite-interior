"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface ServiceInfo {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  heroImage: string;
  gallery: string[];
}

const servicesMap: Record<string, ServiceInfo> = {
  kitchen: {
    title: "Bespoke Fitted Kitchens",
    subtitle: "Made to Measure",
    description: "The right colour palette and thoughtful spacing between furniture pieces can completely transform your kitchen space.",
    longDescription: "We offer a wide range of colours to choose from. Our kitchens are designed and manufactured in the UK using only high-quality materials. From modern handleless designs to classic shaker styles, every kitchen is crafted to your exact specifications with precision engineering and beautiful finishes. Our experienced team works closely with you from initial design through to professional installation.",
    features: ["Made in UK", "Huge Range of Colours", "High Quality Materials", "National Coverage", "Made to Measure", "Soft Close Doors", "In-House Fitters", "7 Years Guarantee"],
    heroImage: "/images/kitchen/main.jpg",
    gallery: ["/images/kitchen/kitchen-1.jpg", "/images/kitchen/kitchen-2.jpg", "/images/kitchen/kitchen-3.jpg", "/images/kitchen/kitchen-4.jpg", "/images/kitchen/kitchen-5.jpg", "/images/kitchen/kitchen-6.jpg"],
  },
  bedroom: {
    title: "Fitted Bedrooms",
    subtitle: "Elegant & Functional",
    description: "Innovative storage solutions with a huge range of colours to choose from. All inclusive prices with a 7-year guarantee.",
    longDescription: "Transform your bedroom into a sanctuary of style and organisation. Our fitted bedrooms feature innovative storage solutions, premium soft-close mechanisms, and are available in over 200 colour options. Every wardrobe, chest of drawers, and bedside unit is manufactured to your exact room dimensions, ensuring a perfect fit every time.",
    features: ["7 Years Guarantee", "Made to Measure", "Innovative Storage", "Great Customer Service", "Soft Close Doors", "200+ Colours", "In-House Fitting", "All Inclusive Prices"],
    heroImage: "/images/bedroom/main.jpg",
    gallery: ["/images/bedroom/bedroom-1.jpg", "/images/bedroom/bedroom-2.jpg", "/images/bedroom/bedroom-3.jpg", "/images/bedroom/bedroom-4.jpg", "/images/bedroom/bedroom-5.jpg", "/images/bedroom/bedroom-6.jpg"],
  },
  "media-wall": {
    title: "Media Wall Design",
    subtitle: "Entertainment Centres",
    description: "Custom entertainment centres and media walls that become the stunning centrepiece of your living space.",
    longDescription: "Our bespoke media walls are designed to seamlessly integrate your entertainment system into a beautifully crafted feature wall. With options for LED lighting, concealed cable management, and custom shelving, we create a focal point that transforms your living room into an immersive entertainment experience.",
    features: ["Custom Design", "LED Integration", "Premium Finish", "Cable Management", "Surround Sound Ready", "Made to Measure", "Fire-Rated Options", "Smart Home Compatible"],
    heroImage: "/images/living-room/main.jpg",
    gallery: ["/images/living-room/living-1.jpg", "/images/living-room/living-2.jpg", "/images/living-room/living-3.jpg", "/images/living-room/living-4.jpg", "/images/living-room/living-5.jpg"],
  },
  "decor-wall": {
    title: "Decorative Wall Features",
    subtitle: "Statement Pieces",
    description: "Stunning decorative wall panels and features that transform any room into a design showcase.",
    longDescription: "Elevate your interior with bespoke decorative wall panels that add texture, depth, and character to any room. From contemporary geometric designs to classic panelling, our decor walls are crafted from premium materials and finished to the highest standards.",
    features: ["Bespoke Design", "Premium Materials", "Feature Lighting", "Modern Aesthetics", "Multiple Finishes", "Easy Maintenance", "Made in UK", "Professional Install"],
    heroImage: "/images/living-room/living-3.jpg",
    gallery: ["/images/living-room/living-1.jpg", "/images/living-room/living-4.jpg", "/images/living-room/living-5.jpg"],
  },
  "walk-in-wardrobe": {
    title: "Walk-In Wardrobes",
    subtitle: "Luxury Storage",
    description: "Luxurious walk-in wardrobe solutions designed to maximise space and showcase your collection.",
    longDescription: "Step into luxury with a bespoke walk-in wardrobe designed around your lifestyle. Our walk-in solutions feature dedicated zones for hanging, folding, shoes, and accessories — all crafted with premium soft-close mechanisms, internal lighting, and your choice of over 200 finishes.",
    features: ["Soft Close Doors", "Internal Lighting", "Made to Measure", "Premium Handles", "Shoe Storage", "Accessory Drawers", "Mirror Options", "Island Units"],
    heroImage: "/images/bedroom/bedroom-5.jpg",
    gallery: ["/images/bedroom/bedroom-1.jpg", "/images/bedroom/bedroom-7.jpg", "/images/bedroom/bedroom-8.jpg"],
  },
  "study-offices": {
    title: "Home Office & Study",
    subtitle: "Work From Home",
    description: "Bespoke home offices and study rooms designed for productivity and elegance.",
    longDescription: "Create the perfect workspace at home with our bespoke office and study solutions. From built-in desks with integrated cable management to floor-to-ceiling bookshelves and storage, every element is designed to enhance your productivity while maintaining the aesthetic harmony of your home.",
    features: ["Ergonomic Design", "Cable Management", "Built-in Storage", "Made in UK", "Custom Shelving", "Desk Integration", "Task Lighting", "Sound Insulation"],
    heroImage: "/images/office-study/main.jpg",
    gallery: ["/images/office-study/office-1.jpg", "/images/office-study/office-2.jpg", "/images/office-study/office-3.jpg", "/images/office-study/office-4.jpg"],
  },
  "loft-wardrobe": {
    title: "Loft Wardrobes",
    subtitle: "Angled Ceiling Specialists",
    description: "Made-to-measure loft wardrobes that fit perfectly under angled ceilings and in awkward spaces.",
    longDescription: "Don't let sloped ceilings waste valuable storage space. Our loft wardrobes are expertly designed and manufactured to fit the exact angles and dimensions of your loft conversion, maximising every inch of available space while looking absolutely stunning.",
    features: ["Angled Ceiling Fit", "Space Maximising", "Custom Shelving", "Soft Close", "Internal Lighting", "Made to Measure", "Premium Materials", "In-House Fitters"],
    heroImage: "/images/bedroom/bedroom-6.jpg",
    gallery: ["/images/bedroom/bedroom-2.jpg", "/images/bedroom/bedroom-3.jpg"],
  },
  "shoe-rack": {
    title: "Bespoke Shoe Racks",
    subtitle: "Organised Display",
    description: "Custom shoe storage solutions crafted to keep your collection organised, protected, and beautifully displayed.",
    longDescription: "Our bespoke shoe racks and storage solutions are designed to accommodate collections of any size. From compact hallway units to dedicated shoe rooms, we create beautiful, practical storage that keeps your footwear organised, accessible, and in perfect condition.",
    features: ["Custom Sizing", "Pull-out Shelves", "Ventilation Options", "LED Lighting", "Made to Measure", "Premium Finish", "Multiple Configurations", "Wall or Floor Mount"],
    heroImage: "/images/understairs/understairs-2.jpg",
    gallery: ["/images/understairs/understairs-1.jpg", "/images/understairs/understairs-3.jpg"],
  },
  understairs: {
    title: "Understairs Storage",
    subtitle: "Hidden Potential",
    description: "Transform wasted understairs space into beautifully organised, functional storage solutions.",
    longDescription: "The space beneath your staircase is full of hidden potential. Our bespoke understairs storage solutions are designed to transform this often-neglected area into a beautifully organised, functional part of your home — whether as a walk-in cupboard, built-in shelving, a home office nook, or a stylish display area.",
    features: ["Space Maximising", "Custom Fit", "Hidden Storage", "Premium Finish", "Pull-out Drawers", "Internal Lighting", "Wine Storage Options", "Coat & Shoe Storage"],
    heroImage: "/images/understairs/main.jpg",
    gallery: ["/images/understairs/understairs-1.jpg", "/images/understairs/understairs-2.jpg", "/images/understairs/understairs-3.jpg", "/images/understairs/understairs-4.jpg", "/images/understairs/understairs-5.jpg"],
  },
};

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = servicesMap[slug] || servicesMap.kitchen;

  return (
    <div style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "flex-end" }}>
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: 60 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            <a href="/" style={{ color: "var(--accent)" }}>Home</a>
            <span style={{ margin: "0 8px" }}>»</span>
            <a href="/services" style={{ color: "rgba(255,255,255,0.6)" }}>Services</a>
            <span style={{ margin: "0 8px" }}>»</span>
            {service.title}
          </nav>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{service.subtitle}</div>
          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 16 }}>
            {service.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, maxWidth: 600 }}>
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "clamp(40px, 6vw, 80px)",
            }}
            className="service-content-grid"
          >
            <div>
              <RevealOnScroll>
                <h2 style={{ marginBottom: 24, fontSize: "clamp(28px, 3vw, 40px)" }}>
                  About this <span style={{ color: "var(--accent)" }}>service</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 24 }}>
                  {service.longDescription}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15}>
                <p style={{ fontSize: 17, lineHeight: 1.9 }}>
                  We offer a wide range of colours to choose from. The right colour palette and thoughtful
                  spacing between furniture pieces can completely transform your space. Make sure your
                  furniture not only fits but also reflects your professional personality or your brand&apos;s identity.
                </p>
              </RevealOnScroll>
            </div>

            {/* Features sidebar */}
            <RevealOnScroll delay={0.2}>
              <div
                style={{
                  background: "var(--surface-elevated)",
                  borderRadius: 16,
                  padding: 32,
                  border: "1px solid var(--border-subtle)",
                  position: "sticky",
                  top: 120,
                }}
              >
                <h4 style={{ marginBottom: 24, fontSize: 18 }}>Key Features</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontSize: 14,
                        color: "var(--text-muted)",
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: "var(--accent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={14} color="#FFFFFF" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: 32,
                    padding: "20px 0 0",
                    borderTop: "1px solid var(--border-subtle)",
                  }}
                >
                  <a
                    href="/contact"
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Get a Free Quote
                  </a>
                  <a
                    href="https://wa.me/447466976460"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginTop: 16,
                      color: "var(--accent)",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <WhatsAppIcon size={16} color="var(--accent)" /> +44 7466 976460
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" style={{ background: "var(--surface-elevated)" }}>
        <div className="container">
          <RevealOnScroll>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 16 }}>Gallery</div>
              <h2>
                Our <span style={{ color: "var(--accent)" }}>{service.title.split(" ").pop()}</span> work
              </h2>
            </div>
          </RevealOnScroll>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {service.gallery.map((img, i) => (
              <RevealOnScroll key={img} delay={i * 0.08}>
                <div
                  className="img-reveal"
                  style={{
                    position: "relative",
                    aspectRatio: i % 3 === 0 ? "4/5" : "3/2",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={img}
                    alt={`${service.title} project ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation between services */}
      <section style={{ padding: "40px 0", borderTop: "1px solid var(--border-subtle)" }}>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Link
            href="/services"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-muted)",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={16} />
            All Services
          </Link>
          <Link
            href="/contact"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--accent)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Book Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .service-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
