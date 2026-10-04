"use client";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function Sheet({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    document.dispatchEvent(new Event("stp:video-refresh"));
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
      requestAnimationFrame(() => document.dispatchEvent(new Event("stp:video-refresh")));
    };
  }, [mounted]);
  return mounted
    ? createPortal(
        <dialog
          ref={ref}
          className={`app-sheet ${className}`}
          aria-label={title}
          onCancel={(e) => {
            e.preventDefault();
            onClose();
          }}
          onClick={(e) => {
            if (e.target === ref.current) onClose();
          }}
        >
          <div className="sheet-content">
            <div className="sheet-handle" />
            <button
              className="sheet-close round-button"
              aria-label={`Close ${title}`}
              onClick={onClose}
            >
              <X size={20} />
            </button>
            {children}
          </div>
        </dialog>,
        document.body,
      )
    : null;
}
