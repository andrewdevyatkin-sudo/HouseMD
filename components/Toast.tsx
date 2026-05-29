"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
};

const colors: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.25)", icon: "#34d399" },
  error:   { bg: "rgba(239, 68, 68, 0.08)",  border: "rgba(239, 68, 68, 0.25)",  icon: "#f87171" },
  info:    { bg: "rgba(59, 130, 246, 0.08)",  border: "rgba(59, 130, 246, 0.25)", icon: "#60a5fa" },
  warning: { bg: "rgba(245, 158, 11, 0.08)",  border: "rgba(245, 158, 11, 0.25)", icon: "#fbbf24" },
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const c = colors[toast.type];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3800);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        borderRadius: "14px",
        background: "rgba(17, 24, 39, 0.97)",
        border: `1px solid ${c.border}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        minWidth: "260px",
        maxWidth: "380px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
        transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer",
      }}
      onClick={() => { setVisible(false); setTimeout(onDismiss, 300); }}
    >
      <div
        style={{
          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
          background: c.bg, border: `1px solid ${c.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: c.icon,
        }}
      >
        {icons[toast.type]}
      </div>
      <span style={{ fontSize: 14, color: "#f1f5f9", lineHeight: 1.4, flex: 1 }}>
        {toast.message}
      </span>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-4), { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: "all" }}>
            <ToastItem toast={t} onDismiss={() => dismiss(t.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
