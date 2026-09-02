"use client";

import { useState, useEffect } from "react";
import { Cookie, ShieldCheck, ChevronDown, Check, X } from "lucide-react";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "hm_cookie_consent_v2";

type GtagArgs = [string, ...unknown[]];

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback default
      }
    }
    return {
      essential: true,
      analytics: false,
      marketing: false,
    };
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        timer = setTimeout(() => setIsVisible(true), 800);
      }
    } catch {
      timer = setTimeout(() => setIsVisible(true), 800);
    }

    const handleReopen = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    window.addEventListener("openCookieSettings", handleReopen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("openCookieSettings", handleReopen);
    };
  }, []);

  const updateGtagConsent = (prefs: CookiePreferences) => {
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (...args: GtagArgs) => void };
      if (typeof win.gtag === "function") {
        win.gtag("consent", "update", {
          analytics_storage: prefs.analytics ? "granted" : "denied",
          ad_storage: prefs.marketing ? "granted" : "denied",
          ad_user_data: prefs.marketing ? "granted" : "denied",
          ad_personalization: prefs.marketing ? "granted" : "denied",
        });
      }
    }
  };

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn("Unable to save cookie preferences", e);
    }
    setPreferences(prefs);
    updateGtagConsent(prefs);
    setIsVisible(false);
    setShowDetails(false);
  };

  const handleAcceptAll = () => {
    const allGranted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allGranted);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(essentialOnly);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 99990,
        maxWidth: 440,
        width: "calc(100vw - 48px)",
        background: "var(--surface-elevated)",
        color: "var(--text-high)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(16px)",
        padding: "22px 24px",
        fontFamily: "var(--font-body)",
        animation: "cookieSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--accent-glow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
            }}
          >
            <Cookie size={18} />
          </div>
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            Cookie Preferences
          </h4>
        </div>
        <button
          onClick={handleRejectNonEssential}
          aria-label="Dismiss cookie notice with essential only"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-dim)",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--text-muted)",
          marginBottom: showDetails ? 16 : 18,
        }}
      >
        We use cookies and similar technologies to ensure site functionality, analyse visitor traffic, and enhance your bespoke interior design experience in compliance with EU/UK GDPR.
      </p>

      {/* Detailed Accordion */}
      {showDetails && (
        <div
          style={{
            background: "var(--surface-card)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 14px",
            marginBottom: 18,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            border: "1px solid var(--border-subtle)",
          }}
        >
          {/* Essential */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-high)", display: "flex", alignItems: "center", gap: 6 }}>
                <ShieldCheck size={14} color="var(--accent)" />
                Essential Cookies
              </div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Necessary for core site operation and security.</div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--accent)",
                padding: "3px 8px",
                background: "var(--accent-glow)",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              Always Active
            </span>
          </div>

          <div style={{ height: 1, background: "var(--border-subtle)" }} />

          {/* Analytics */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-high)" }}>Analytics & Performance</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Helps us measure site traffic and improve page experience.</div>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: 40, height: 22, cursor: "pointer", flexShrink: 0 }}>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: preferences.analytics ? "var(--accent)" : "rgba(255,255,255,0.15)",
                  transition: "0.3s",
                  borderRadius: 22,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: 16,
                    width: 16,
                    left: preferences.analytics ? 21 : 3,
                    bottom: 3,
                    backgroundColor: "#FFFFFF",
                    transition: "0.3s",
                    borderRadius: "50%",
                  }}
                />
              </span>
            </label>
          </div>

          <div style={{ height: 1, background: "var(--border-subtle)" }} />

          {/* Marketing */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-high)" }}>Marketing & Personalisation</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Used to deliver relevant adverts and measure campaign success.</div>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: 40, height: 22, cursor: "pointer", flexShrink: 0 }}>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: preferences.marketing ? "var(--accent)" : "rgba(255,255,255,0.15)",
                  transition: "0.3s",
                  borderRadius: 22,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: 16,
                    width: 16,
                    left: preferences.marketing ? 21 : 3,
                    bottom: 3,
                    backgroundColor: "#FFFFFF",
                    transition: "0.3s",
                    borderRadius: "50%",
                  }}
                />
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleAcceptAll}
            style={{
              flex: 1,
              padding: "10px 16px",
              background: "var(--accent)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Check size={14} />
            Accept All
          </button>
          <button
            onClick={handleRejectNonEssential}
            style={{
              flex: 1,
              padding: "10px 16px",
              background: "transparent",
              color: "var(--text-high)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Essential Only
          </button>
        </div>

        {showDetails ? (
          <button
            onClick={handleSaveCustom}
            style={{
              width: "100%",
              padding: "9px 14px",
              background: "var(--surface-card)",
              color: "var(--accent)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save Custom Preferences
          </button>
        ) : (
          <button
            onClick={() => setShowDetails(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: 12,
              cursor: "pointer",
              padding: "4px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Customize Preferences
            <ChevronDown size={14} />
          </button>
        )}
      </div>

      <style>{`
        @keyframes cookieSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </aside>
  );
}
