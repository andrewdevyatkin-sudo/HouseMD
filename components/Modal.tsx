"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: number;
}

export default function Modal({ open, onClose, title, children, maxWidth = 480 }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <div
        style={{
          width: "100%", maxWidth,
          background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)",
          border: "1px solid rgba(30, 45, 69, 0.9)",
          borderRadius: "20px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          animation: "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 24px 0",
          }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(30,45,69,0.4)", border: "1px solid rgba(30,45,69,0.8)",
              borderRadius: 8, color: "#4b6080", cursor: "pointer",
              width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: "20px 24px 24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
