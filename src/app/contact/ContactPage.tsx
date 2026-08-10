"use client";

import { Mail, MapPin, Clock, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ContactPage() {
  return (
    <div style={{ paddingTop: 120 }}>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <RevealOnScroll>
            <nav style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 40 }}>
              <a href="/" style={{ color: "var(--accent)" }}>Home</a>
              <span style={{ margin: "0 8px" }}>»</span>
              Contact
            </nav>
          </RevealOnScroll>

          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <RevealOnScroll>
              <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
                Get in Touch
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", marginBottom: 20 }}>
                Let&apos;s start your
                <br />
                <span style={{ color: "var(--accent)" }}>project</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p style={{ margin: "0 auto", maxWidth: 560, fontSize: 18 }}>
                Ready to transform your space? Get in touch for a free consultation
                and quote. We&apos;d love to hear about your project.
              </p>
            </RevealOnScroll>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 80px)",
            }}
            className="contact-page-grid"
          >
            {/* Contact Form */}
            <RevealOnScroll>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label
                      htmlFor="firstName"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        marginBottom: 8,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: 10,
                        color: "var(--text-high)",
                        fontSize: 15,
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        marginBottom: 8,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: 10,
                        color: "var(--text-high)",
                        fontSize: 15,
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 10,
                      color: "var(--text-high)",
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      transition: "border-color 0.3s",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+44 7XXX XXXXXX"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 10,
                      color: "var(--text-high)",
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      transition: "border-color 0.3s",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 10,
                      color: "var(--text-high)",
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      transition: "border-color 0.3s",
                      appearance: "none",
                    }}
                  >
                    <option value="">Select a service...</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="media-wall">Media Wall</option>
                    <option value="walk-in-wardrobe">Walk In Wardrobe</option>
                    <option value="study-offices">Study / Office</option>
                    <option value="loft-wardrobe">Loft Wardrobe</option>
                    <option value="understairs">Understairs</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project, dimensions, and any preferences..."
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 10,
                      color: "var(--text-high)",
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.3s",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "18px 36px" }}
                >
                  Send Message
                  <Send size={16} />
                </button>
              </form>
            </RevealOnScroll>

            {/* Contact Info */}
            <RevealOnScroll delay={0.2}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                }}
              >
                {/* Contact cards */}
                {[
                  {
                    icon: WhatsAppIcon,
                    label: "WhatsApp Us",
                    primary: "+44 7466 976460",
                    secondary: "Phone: +44 07443 385861",
                    href: "https://wa.me/447466976460",
                  },
                  {
                    icon: Mail,
                    label: "Email Us",
                    primary: "info@hmeliteinteriors.co.uk",
                    secondary: "We respond within 24 hours",
                    href: "mailto:info@hmeliteinteriors.co.uk",
                  },
                  {
                    icon: MapPin,
                    label: "Visit Us",
                    primary: "10 Feathers Lane",
                    secondary: "Wraysbury, TW19 5AN",
                    href: "https://maps.google.com/?q=10+Feathers+Lane+Wraysbury+TW19+5AN",
                  },
                  {
                    icon: Clock,
                    label: "Working Hours",
                    primary: "Mon – Fri: 8:00 AM – 6:00 PM",
                    secondary: "Sat: 9:00 AM – 4:00 PM",
                    href: null,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href ? { href: item.href, target: item.href?.startsWith("http") ? "_blank" : undefined } : {})}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 20,
                        padding: 24,
                        background: "var(--surface-elevated)",
                        borderRadius: 16,
                        border: "1px solid var(--border-subtle)",
                        transition: "border-color 0.3s ease, transform 0.3s ease",
                        cursor: item.href ? "pointer" : "default",
                      }}
                      className="contact-info-card"
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          background: "var(--accent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={22} color="#FFFFFF" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            marginBottom: 6,
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: 17,
                            fontWeight: 600,
                            color: "var(--text-high)",
                            marginBottom: 4,
                          }}
                        >
                          {item.primary}
                        </div>
                        <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
                          {item.secondary}
                        </div>
                      </div>
                    </Wrapper>
                  );
                })}

                {/* Map embed placeholder */}
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    aspectRatio: "16/9",
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-subtle)",
                    position: "relative",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.4!2d-0.548!3d51.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI3JzAwLjAiTiAwwrAzMicwMC4wIlc!5e0!3m2!1sen!2suk!4v1"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      filter: "grayscale(70%) contrast(1.1)",
                    }}
                    loading="lazy"
                    title="HM Elite Interiors Location"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-page-grid { grid-template-columns: 1fr !important; }
        }
        .contact-info-card:hover {
          border-color: var(--border) !important;
          transform: translateY(-2px);
        }
        input:focus, textarea:focus, select:focus {
          border-color: var(--accent) !important;
        }
      `}</style>
    </div>
  );
}
