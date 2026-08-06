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
        zIndex: 9990,
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
            width={44}
            height={44}
            style={{ objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-high)",
            }}
          >
            HM <span style={{ color: "var(--accent)" }}>ELITE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
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
                    paddingTop: 8,
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

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Quick contact */}
          <a
            href="tel:+447490180898"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-high)",
              fontSize: 13,
              fontWeight: 600,
              transition: "color 0.3s ease",
            }}
            className="desktop-only"
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

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          className="glass"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            padding: "100px 40px 40px",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "var(--text-high)",
              cursor: "pointer",
            }}
          >
            <X size={28} />
          </button>

          {navLinks.map((link) => (
            <div key={link.name} style={{ marginBottom: 8 }}>
              <Link
                href={link.href}
                onClick={() => !link.dropdown && setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 600,
                  color: "var(--text-high)",
                  display: "block",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div style={{ paddingLeft: 20, paddingTop: 8 }}>
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "var(--text-muted)",
                        padding: "8px 0",
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
            <a
              href="tel:+447490180898"
              style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 16 }}
            >
              <Phone size={18} />
              +44 7490 180898
            </a>
            <a
              href="mailto:info@hmeliteinteriors.co.uk"
              style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: 14 }}
            >
              <Mail size={18} />
              info@hmeliteinteriors.co.uk
            </a>
          </div>
        </div>
      )}

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
