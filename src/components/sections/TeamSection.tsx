"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Sparkles, Award } from "lucide-react";

const teamMembers = [
  {
    name: "Harinder Singh",
    role: "CEO & Founder",
    image: "/Harinder Singh - CEO.jpeg",
    bio: "Passionate about bespoke interior design and precision engineering. Harinder leads HM Elite Interiors with a vision for exceptional UK-made craftsmanship.",
    expertise: "Executive Leadership & Project Vision",
  },
  {
    name: "Manpreet Kaur",
    role: "CEO & Founder",
    image: "/manpreet kaur - CEO.jpeg",
    bio: "Dedicated to transforming living spaces through creative innovation and customer-focused design. Manpreet ensures every project exceeds client expectations.",
    expertise: "Design Direction & Client Excellence",
  },
];

export function TeamSection() {
  return (
    <section
      id="team-section"
      className="section"
      style={{
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(40px, 6vw, 64px)",
            maxWidth: 700,
            marginInline: "auto",
          }}
        >
          <RevealOnScroll>
            <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
              <Sparkles size={14} style={{ marginRight: 6 }} /> Leadership Team
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2>
              Meet the Visionaries Behind <span style={{ color: "var(--accent)" }}>HM Elite</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p style={{ fontSize: 16, marginTop: 16 }}>
              Our leadership brings years of passion, craftsmanship, and dedication to turning your dream home interiors into reality.
            </p>
          </RevealOnScroll>
        </div>

        {/* Team Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            maxWidth: 960,
            margin: "0 auto",
          }}
          className="team-grid"
        >
          {teamMembers.map((member, index) => (
            <RevealOnScroll key={member.name} delay={0.1 * (index + 1)} y={40}>
              <div
                style={{
                  background: "var(--surface-elevated)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border-subtle)",
                  overflow: "hidden",
                  transition:
                    "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                className="team-card"
              >
                {/* Image Container with Aspect Ratio */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/5",
                    overflow: "hidden",
                    background: "var(--surface-card)",
                  }}
                >
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="team-img"
                  />
                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 24,
                      right: 24,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "6px 14px",
                        borderRadius: 20,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      <Award size={13} style={{ color: "#E0A96D" }} />
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "28px 24px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 6,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {member.name}
                  </h3>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--accent)",
                      letterSpacing: "0.05em",
                      marginBottom: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    {member.expertise}
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        .team-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .team-card:hover .team-img {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
