"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0716] via-[#0E0716]/95 to-transparent" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <nav
            className={`relative flex items-center justify-between rounded-2xl transition-all duration-500 ${
              scrolled
                ? "px-4 py-2.5 bg-[#0E0716]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "px-2 py-3"
            }`}
          >
            <div className="relative z-10 flex items-center justify-between w-full">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <Image
                    src="/images/PerkOS-icon.png"
                    alt="PerkOS"
                    width={36}
                    height={36}
                    className="rounded-xl relative z-10 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent group-hover:from-perkos-orange group-hover:via-perkos-pink group-hover:to-perkos-pink transition-all duration-500">
                  PerkOS
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`nav-item relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                      activeSection === item.href.replace("#", "")
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-perkos-orange via-perkos-pink to-perkos-pink transition-transform duration-300 origin-left ${
                        activeSection === item.href.replace("#", "")
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                    <span className="absolute inset-0 rounded-lg bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-2">
                <Link
                  href="https://github.com/PerkOS-xyz/PerkOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/[0.05] group"
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="hidden lg:inline">GitHub</span>
                </Link>

                <Link
                  href="#get-started"
                  className="relative group px-4 py-2 text-sm font-semibold overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-perkos-orange via-perkos-pink to-perkos-pink transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 text-white">Get Started</span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden relative p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <span
                      className={`h-0.5 w-full bg-current transform transition-all duration-300 origin-center ${
                        mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                      }`}
                    />
                    <span
                      className={`h-0.5 w-full bg-current transition-all duration-300 ${
                        mobileMenuOpen ? "opacity-0 scale-0" : ""
                      }`}
                    />
                    <span
                      className={`h-0.5 w-full bg-current transform transition-all duration-300 origin-center ${
                        mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0E0716]/95 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-20 left-4 right-4 bg-[#1B1833]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transform transition-all duration-500 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-300"
                style={{
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                  transition: `all 0.3s ease ${index * 0.05}s`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="https://github.com/PerkOS-xyz/PerkOS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 text-white/70 hover:text-white border border-white/10 rounded-xl hover:bg-white/[0.05] transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </Link>
            <Link
              href="#get-started"
              className="flex items-center justify-center px-4 py-3 text-white font-semibold bg-gradient-to-r from-perkos-orange via-perkos-pink to-perkos-pink rounded-xl hover:opacity-90 transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </>
  );
}
