"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { X, Send, MessageSquare } from "lucide-react";

export function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = message.trim() || "Hi HM Elite Interiors, I would like to inquire about your services.";
    const whatsappUrl = `https://wa.me/447466976460?text=${encodeURIComponent(textToSend)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Popout Tooltip / Preview Bubble when chat is closed */}
      {!isOpen && showTooltip && (
        <div
          style={{
            position: "relative",
            background: "var(--surface-elevated)",
            color: "var(--text-high)",
            padding: "12px 16px 12px 16px",
            borderRadius: "16px 16px 4px 16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
            border: "1px solid var(--border)",
            maxWidth: 280,
            fontSize: 13,
            lineHeight: 1.5,
            animation: "bubbleSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="chat-tooltip-bubble"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            style={{
              position: "absolute",
              top: 6,
              right: 8,
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
            aria-label="Close message"
          >
            <X size={12} />
          </button>
          <div
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer", paddingRight: 8 }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 11,
                color: "var(--accent)",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              HM Elite Concierge
            </div>
            &quot;Let&apos;s cut the clutter and let me point you to straight into what you need&quot;
          </div>
        </div>
      )}

      {/* Main Chat Modal Window */}
      {isOpen && (
        <div
          style={{
            width: "clamp(300px, 90vw, 360px)",
            background: "var(--surface-elevated)",
            borderRadius: 20,
            border: "1px solid var(--border)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "chatWindowOpen 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #128C7E 0%, #075E54 100%)",
              padding: "16px 20px",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  position: "relative",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#FFFFFF",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="HM Elite Interiors"
                  fill
                  style={{ objectFit: "contain", padding: 4 }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  HM Elite Interiors
                </div>
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.9,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#25D366",
                      display: "inline-block",
                      boxShadow: "0 0 8px #25D366",
                    }}
                  />
                  Online • Replies instantly
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "#FFFFFF",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Body / Message Preview */}
          <div
            style={{
              padding: 20,
              background: "var(--surface)",
              minHeight: 140,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                alignSelf: "flex-start",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-subtle)",
                padding: "14px 16px",
                borderRadius: "16px 16px 16px 4px",
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--text-high)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                maxWidth: "90%",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginBottom: 4,
                  textTransform: "uppercase",
                }}
              >
                HM Elite Concierge
              </div>
              Let&apos;s cut the clutter and let me point you to straight into what you need
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: "12px 16px",
              background: "var(--surface-elevated)",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flexGrow: 1,
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 24,
                padding: "10px 16px",
                fontSize: 14,
                color: "var(--text-high)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
            <button
              type="submit"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#25D366",
                border: "none",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
                transition: "transform 0.2s ease, background 0.2s ease",
                flexShrink: 0,
              }}
              title="Send to WhatsApp"
            >
              <Send size={16} style={{ marginLeft: 2 }} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Green WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          border: "none",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          animation: isOpen ? "none" : "floatingPulse 2.5s ease-in-out infinite",
        }}
        className="floating-whatsapp-btn"
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <WhatsAppIcon size={26} color="#FFFFFF" />
        )}
      </button>

      <style>{`
        @keyframes bubbleSlideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatWindowOpen {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatingPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45); }
          50% { transform: scale(1.06); box-shadow: 0 12px 32px rgba(37, 211, 102, 0.65); }
        }
        .floating-whatsapp-btn:hover {
          transform: scale(1.1) !important;
        }
      `}</style>
    </div>
  );
}
