"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const footerServices = [
  { name: "Kitchen", slug: "kitchen" },
  { name: "Bedroom", slug: "bedroom" },
  { name: "Media Wall", slug: "media-wall" },
  { name: "Walk In Wardrobe", slug: "walk-in-wardrobe" },
  { name: "Study / Offices", slug: "study-offices" },
  { name: "Loft Wardrobe", slug: "loft-wardrobe" },
  { name: "Understairs", slug: "understairs" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Why Choose Us", href: "/why-choose-us" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface-elevated)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CTA Band */}
      <div
        style={{
          background: `linear-gradient(135deg, var(--accent) 0%, #8A5C3E 100%)`,
          padding: "60px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <RevealOnScroll>
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(28px, 4vw, 44px)",
                maxWidth: 500,
              }}
            >
              Ready to transform
              <br />
              your space?
            </h3>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                background: "#FFFFFF",
                color: "var(--accent)",
                fontSize: 16,
                padding: "20px 44px",
              }}
            >
              Get a Free Quote
              <ArrowUpRight size={18} />
            </Link>
          </RevealOnScroll>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container" style={{ padding: "80px var(--container-padding)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <Image
                src="/logo.png"
                alt="HM Elite Interiors"
                width={52}
                height={52}
                style={{ objectFit: "contain" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                HM <span style={{ color: "var(--accent)" }}>ELITE</span>
              </h4>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
              We specialise in designing and manufacturing high-quality,
              made-to-measure fitted bedrooms, kitchens, loft conversions, home
              offices, and more.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a
                href="tel:+447490180898"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--text-muted)",
                  fontSize: 14,
                  transition: "color 0.3s",
                }}
              >
                <Phone size={15} style={{ color: "var(--accent)" }} />
                +44 7490 180898
              </a>
              <a
                href="tel:+4407443385861"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--text-muted)",
                  fontSize: 14,
                  transition: "color 0.3s",
                }}
              >
                <Phone size={15} style={{ color: "var(--accent)" }} />
                +44 07443 385861
              </a>
              <a
                href="mailto:info@hmeliteinteriors.co.uk"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--text-muted)",
                  fontSize: 14,
                  transition: "color 0.3s",
                }}
              >
                <Mail size={15} style={{ color: "var(--accent)" }} />
                info@hmeliteinteriors.co.uk
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  color: "var(--text-muted)",
                  fontSize: 14,
                }}
              >
                <MapPin size={15} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                10 Feathers Lane, Wraysbury, TW19 5AN
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 24,
              }}
            >
              Quick Links
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 14,
                    transition: "color 0.3s",
                  }}
                  className="footer-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 24,
              }}
            >
              Services
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {footerServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 14,
                    transition: "color 0.3s",
                  }}
                  className="footer-link"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 24,
              }}
            >
              Working Hours
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
                { day: "Sunday", hours: "By Appointment" },
              ].map((item) => (
                <div key={item.day}>
                  <div style={{ fontSize: 14, color: "var(--text-high)", fontWeight: 500 }}>
                    {item.day}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {item.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "24px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: "var(--text-dim)" }}>
            © {new Date().getFullYear()} HM Elite Interiors. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "var(--text-dim)" }}>
            Proudly crafted in the United Kingdom
          </p>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--accent) !important; }
      `}</style>
    </footer>
  );
}
