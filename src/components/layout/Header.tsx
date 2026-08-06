"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { LampToggle } from "@/components/ui/LampToggle";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Kitchen", slug: "kitchen" },
  { name: "Bedroom", slug: "bedroom" },
  { name: "Media Wall", slug: "media-wall" },
  { name: "Decor Wall", slug: "decor-wall" },
  { name: "Walk In Wardrobe", slug: "walk-in-wardrobe" },
  { name: "Study / Offices", slug: "study-offices" },
  { name: "Loft Wardrobe", slug: "loft-wardrobe" },
  { name: "Shoe Rack", slug: "shoe-rack" },
];

const navLinks = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#categories", dropdown: true },
  { name: "Why Choose Us", href: "/#why-choose-us" },
  { name: "Contact", href: "/#contact-cta" },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Lock background body scroll when mobile menu is open
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      id="site-header"
      className={scrolled ? "glass" : ""}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: mobileOpen ? 999999 : 99990,
        padding: scrolled ? "14px 0" : "24px 0",
        background: scrolled ? undefined : "transparent",
        backdropFilter: scrolled ? undefined : "none",
        WebkitBackdropFilter: scrolled ? undefined : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.12)" : "none",
        transition: "padding 0.3s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        opacity: 0,
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src="/logo.png"
            alt="HM Elite Interiors"
            width={40}
            height={40}
            style={{ objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-high)",
            }}
          >
            HM <span style={{ color: "var(--accent)" }}>ELITE</span>
          </span>
        </Link>

        {/* Desktop Nav: Sleek Floating Glass Capsule Pill */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            background: "var(--surface-card)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "10px 32px",
            borderRadius: 30,
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <div
              key={link.name}
              style={{ position: "relative" }}
              onMouseEnter={() => link.dropdown && setServicesOpen(true)}
              onMouseLeave={() => link.dropdown && setServicesOpen(false)}
            >
              <Link
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-high)",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s ease, opacity 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
                className="nav-link"
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    size={14}
                    style={{
                      transform: servicesOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}
              </Link>

              {/* Services Dropdown */}
              {link.dropdown && servicesOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: -20,
                    paddingTop: 12,
                  }}
                >
                  <div
                    className="glass"
                    style={{
                      padding: "12px 0",
                      minWidth: 230,
                      borderRadius: "var(--radius)",
                      overflow: "hidden",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setServicesOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 24px",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--text-high)",
                          transition: "all 0.2s ease",
                        }}
                        className="dropdown-link"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Phone Badge CTA */}
          <a
            href="tel:+447490180898"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-high)",
              fontSize: 13,
              fontWeight: 600,
              padding: "9px 18px",
              borderRadius: 24,
              background: "var(--surface-card)",
              border: "1px solid var(--border-subtle)",
              transition: "all 0.3s ease",
            }}
            className="desktop-only phone-badge-btn"
          >
            <Phone size={14} style={{ color: "var(--accent)" }} />
            +44 7490 180898
          </a>

          <LampToggle />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-only"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-high)",
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphism Overlay Portal */}
      <div
        className="mobile-nav-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          zIndex: 999999,
          background: "var(--overlay)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 24px 32px",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transform: mobileOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Bar inside Overlay */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 24,
            borderBottom: "1px solid var(--border-subtle)",
            marginBottom: 24,
          }}
        >
          <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              src="/logo.png"
              alt="HM Elite Interiors"
              width={38}
              height={38}
              style={{ objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text-high)",
              }}
            >
              HM <span style={{ color: "var(--accent)" }}>ELITE</span>
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LampToggle />
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-high)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links with Staggered Slide Animation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {navLinks.map((link, idx) => (
            <div
              key={link.name}
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.06 + idx * 0.04}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.06 + idx * 0.04}s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => !link.dropdown && setMobileOpen(false)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--text-high)",
                    flex: 1,
                  }}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--accent)",
                      cursor: "pointer",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                    aria-label="Toggle services submenu"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: servicesOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </button>
                )}
              </div>

              {/* Mobile Submenu Dropdown */}
              {link.dropdown && servicesOpen && (
                <div
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        padding: "10px 12px",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-high)",
                        background: "var(--surface-elevated)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-subtle)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Info Footer */}
        <div
          style={{
            paddingTop: 24,
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s`,
          }}
        >
          <a
            href="tel:+447490180898"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 600,
              padding: "14px 20px",
              background: "var(--accent)",
              borderRadius: "var(--radius)",
              boxShadow: "0 6px 20px var(--accent-glow)",
            }}
          >
            <Phone size={18} />
            +44 7490 180898
          </a>
          <a
            href="mailto:info@hmeliteinteriors.co.uk"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              color: "var(--text-muted)",
              fontSize: 13,
              padding: "8px 0",
            }}
          >
            <Mail size={16} style={{ color: "var(--accent)" }} />
            info@hmeliteinteriors.co.uk
          </a>
        </div>
      </div>

      <style>{`
        .nav-link:hover { color: var(--accent) !important; }
        .dropdown-link:hover { color: var(--accent) !important; background: var(--border-subtle); }
        .desktop-nav { display: flex; }
        .mobile-only { display: none; }
        .desktop-only { display: flex; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: block !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
