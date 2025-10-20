// src/components/navigation/MainNavigation.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const MainNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { label: "Worship", href: "/about/worship", dropdown: false },
    {
      label: "About",
      href: "/about",
      dropdown: true,
      items: [
        { label: "History", href: "/about/history" },
        { label: "Board of Trustees", href: "/about/board-of-trustees" },
      ],
    },
    {
      label: "Events",
      href: "/events",
      dropdown: true,
      items: [
        { label: "Calendar", href: "/calendar" },
        { label: "Retreats", href: "/events/retreats" },
        { label: "Non-Profits", href: "/events/non-profits" },
        { label: "Weddings", href: "/events/weddings" },
        { label: "Film & Photography", href: "/events/film-photography" },
        { label: "Spaces & Facilities", href: "/events/spaces-facilities" },
      ],
    },
    {
      label: "Gallery",
      href: "/gallery",
      dropdown: true,
      items: [
        { label: "Past Events", href: "/gallery/past-events" },
        { label: "Film & TV", href: "/gallery/film-tv" },
        { label: "Architecture", href: "/gallery/architecture" },
      ],
    },
    { label: "Visit", href: "/visit", dropdown: false },
  ];

  // Lock body scroll when menu is open
  useEffect(() => {
    const cls = ["overflow-hidden", "touch-none"];
    if (isMobileMenuOpen) {
      document.documentElement.classList.add(...cls);
      document.body.classList.add(...cls);
    } else {
      document.documentElement.classList.remove(...cls);
      document.body.classList.remove(...cls);
    }
    return () => {
      document.documentElement.classList.remove(...cls);
      document.body.classList.remove(...cls);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleMobileDropdown = (index) => {
    setActiveDropdown((cur) => (cur === index ? null : index));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-md py-3"
            : "bg-slate-900/20 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="font-serif text-lg">†</span>
              </div>
              <span className="font-serif text-xl font-medium tracking-wide">
                House of the Redeemer
              </span>
            </Link>

            {/* Desktop Menu with Dropdowns */}
            <div className="hidden md:flex items-center space-x-8 text-white/90">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center hover:text-white cursor-pointer transition-colors font-light tracking-wide relative"
                    aria-haspopup={item.dropdown ? "menu" : undefined}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white hidden group-hover:block transition-all duration-200 py-1 z-50 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-slate-900"
                          role="menuitem"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Hamburger — hide while menu is open */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden text-white cursor-pointer ${
                isMobileMenuOpen ? "hidden" : ""
              }`}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-flyout"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop + Slide-in Flyout */}
      <div
        className={[
          "fixed inset-0 z-[60] md:hidden transition-opacity duration-300",
          isMobileMenuOpen
            ? "bg-white/20 backdrop-blur-sm opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      >
        <aside
          id="mobile-flyout"
          className={[
            "absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-800/95 border-l border-white/10 text-white",
            "transition-transform duration-300 will-change-transform z-[61]",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="font-serif text-lg">Menu</span>
            <button
              className="p-1 hover:opacity-80 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile Navigation with Accordion Dropdowns */}
          <nav className="px-5 py-4 overflow-y-auto max-h-[calc(100vh-70px)]">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-white/10 last:border-b-0"
              >
                <div className="flex items-center justify-between py-3">
                  <Link
                    href={item.href}
                    className="text-white/90 hover:text-white"
                    onClick={() => {
                      if (!item.dropdown) setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>

                  {item.dropdown && (
                    <button
                      onClick={() => toggleMobileDropdown(index)}
                      className="p-1 text-white/70 hover:text-white"
                      aria-expanded={activeDropdown === index}
                      aria-controls={`mobile-sub-${index}`}
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        size={18}
                        className={`transform transition-transform ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown Items */}
                {item.dropdown && (
                  <div
                    id={`mobile-sub-${index}`}
                    className={`pl-4 overflow-hidden transition-all duration-300 ${
                      activeDropdown === index ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block py-2 text-sm text-white/80 hover:text-white border-t border-white/5 first:border-t-0"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default MainNavigation;
