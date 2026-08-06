"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ContactCTA() {
  return (
    <section
      id="contact-cta"
      className="section"
      style={{
        background: "var(--surface-elevated)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
          className="contact-grid"
        >
          {/* Left - Content */}
          <div>
            <RevealOnScroll>
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                Get in Touch
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 style={{ marginBottom: 20 }}>
                Let&apos;s create your
                <br />
                <span style={{ color: "var(--accent)" }}>dream space</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p style={{ fontSize: 16, marginBottom: 36 }}>
                Whether you&apos;re renovating your home or creating a brand-new look,
                our team is here to bring your vision to life with precision and
                style. Book a free consultation today.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 40 }}>
                <a
                  href="tel:+447490180898"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    color: "var(--text-high)",
                    fontSize: 18,
                    fontWeight: 500,
                    transition: "color 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} color="#FFFFFF" />
                  </div>
                  +44 7490 180898
                </a>
                <a
                  href="mailto:info@hmeliteinteriors.co.uk"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    color: "var(--text-high)",
                    fontSize: 18,
                    fontWeight: 500,
                    transition: "color 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--surface-card)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  info@hmeliteinteriors.co.uk
                </a>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    color: "var(--text-muted)",
                    fontSize: 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--surface-card)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  10 Feathers Lane, Wraysbury, TW19 5AN
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <a href="/contact" className="btn-primary">
                Book Free Consultation
                <ArrowUpRight size={16} />
              </a>
            </RevealOnScroll>
          </div>

          {/* Right - Image */}
          <RevealOnScroll y={60} delay={0.2}>
            <div
              className="img-reveal"
              style={{
                position: "relative",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                aspectRatio: "4/5",
              }}
            >
              <Image
                src="/images/bedroom/bedroom-4.jpg"
                alt="Luxury bedroom interior by HM Elite"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Accent border */}
              <div
                style={{
                  position: "absolute",
                  inset: -1,
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
