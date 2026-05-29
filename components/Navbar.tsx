"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-link {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: #f1f5f9;
          background: rgba(30, 45, 69, 0.5);
        }
        .mobile-nav-link {
          display: block;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          background: rgba(30, 45, 69, 0.3);
          transition: color 0.2s ease;
        }
        .mobile-nav-link:hover { color: #f1f5f9; }
      `}</style>
      <header
        style={{
          backgroundColor: "rgba(11, 15, 26, 0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(30, 45, 69, 0.6)",
        }}
        className="sticky top-0 z-50"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" style={{ textDecoration: "none" }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                color: "#0b0f1a",
                boxShadow: "0 0 16px rgba(245,158,11,0.3)",
              }}
            >
              H
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: "#f1f5f9" }}>
              House<span style={{ color: "#f59e0b" }}>MD</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/browse" className="nav-link">Browse</Link>
            <Link href="/costs" className="nav-link">Cost Database</Link>
            <Link href="/community" className="nav-link">Community</Link>
            <Link href="/contractors" className="nav-link">Contractors</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Link
              href="/search"
              id="navbar-search-btn"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
              style={{
                background: "rgba(17, 24, 39, 0.8)",
                border: "1px solid rgba(30, 45, 69, 0.8)",
                color: "#4b6080",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Search repairs...
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(75,96,128,0.3)", color: "#4b6080" }}>⌘K</span>
            </Link>

            <Link href="/profile" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm btn-ghost" style={{ textDecoration: "none" }}>
              My Home
            </Link>
            <Link href="/search" className="px-4 py-1.5 rounded-lg text-sm font-bold btn-primary" style={{ textDecoration: "none" }}>
              Get Started
            </Link>

            {/* Mobile menu toggle */}
            <button
              id="navbar-mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg cursor-pointer"
              style={{ color: "#94a3b8", background: "transparent", border: "none" }}
            >
              {menuOpen ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden px-4 py-4 flex flex-col gap-2"
            style={{ borderTop: "1px solid rgba(30, 45, 69, 0.6)", background: "rgba(11, 15, 26, 0.98)" }}
          >
            <Link href="/browse" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Browse Guides</Link>
            <Link href="/costs" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Cost Database</Link>
            <Link href="/community" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Community Q&A</Link>
            <Link href="/contractors" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Find Contractors</Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="mobile-nav-link">My Home Profile</Link>
            <div className="pt-2">
              <Link href="/search" onClick={() => setMenuOpen(false)} className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-bold btn-primary" style={{ textDecoration: "none" }}>
                Search Any Problem
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
