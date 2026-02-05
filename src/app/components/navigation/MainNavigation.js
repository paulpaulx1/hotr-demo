"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const MainNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Get current pathname to determine if we're on the homepage
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  // Updated navItems structure to match the wireframe
  const navItems = [
    {
      label: "About",
      href: "/about",
      dropdown: true,
      items: [
        { label: "Worship", href: "/worship" },
        { label: "Gallery", href: "/gallery" },
        { label: "History and Neighborhood", href: "/about/history" },
        { label: "Space and Facilities", href: "/about/facilities" },
        { label: "Board and Staff", href: "/about/board" },
        { label: "Preferred Vendors", href: "/about/vendors" },
        { label: "Fabbri Chamber Concerts", href: "/fabbri" },
      ],
    },
    {
      label: "Visit",
      href: "/visit",
      dropdown: true,
      items: [
        { label: "Weddings & Special Events", href: "/visit/weddings" },
        { label: "Nonprofit Events", href: "/visit/nonprofit-events" },
        { label: "FAQ", href: "/visit/faq" },
        { label: "TV & Film", href: "/visit/filmandtv" },
        { label: "Stay at the House", href: "/visit/stay-at-the-house" },
      ],
    },
    { label: "Calendar", href: "/calendar", dropdown: false },
    { label: "Give", href: "/give", dropdown: false },
    { label: "Contact", href: "/contact", dropdown: false },
  ];

  // Handle scroll effects - only apply transparent effect on homepage
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);

    // Only add scroll listener if we're on the homepage
    if (isHomepage) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    } else {
      // On other pages, always set isScrolled to true to keep solid background
      setIsScrolled(true);
    }
  }, [isHomepage]);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Toggle mobile dropdown
  const toggleMobileDropdown = (index) => {
    setActiveDropdown((cur) => (cur === index ? null : index));
  };

  // Determine nav background class based on scroll position and current page
  const getNavBackgroundClass = () => {
    if (!isHomepage) {
      // Always solid background on non-homepage
      return "bg-slate-900 py-3";
    } else {
      // On homepage, transparent when at top, solid when scrolled
      return isScrolled
        ? "bg-slate-900/80 backdrop-blur-md py-3"
        : "bg-slate-900/20 py-4";
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavBackgroundClass()}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo with Image - Simple approach */}
            <Link
              href="/"
              className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img
                src="/hotr-slate-logo.png"
                alt="House of the Redeemer Logo"
                width="50"
                height="50"
                className="rounded-md"
              />
              <span className="font-serif text-xl font-medium tracking-wide">
                House of the Redeemer
              </span>
            </Link>

            {/* Desktop Navigation Bar */}
            <div className="hidden md:flex items-center space-x-8 text-white/90">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Nav Item */}
                  <Link
                    href={item.href}
                    className="flex items-center hover:text-white cursor-pointer transition-colors font-light tracking-wide relative py-2"
                    aria-haspopup={item.dropdown ? "menu" : undefined}
                    onClick={(e) => {
                      if (item.dropdown) {
                        // Prevent navigation for items with dropdowns on desktop
                        // This allows the dropdown to appear on hover without navigating
                        if (window.innerWidth >= 768) {
                          e.preventDefault();
                        }
                      }
                    }}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>

                  {/* Fix for dropdown gap - add an invisible bridge and position dropdown directly */}
                  {item.dropdown && (
                    <>
                      {/* Invisible bridge element to connect the nav item and dropdown */}
                      <div
                        className="absolute h-6 w-full left-0 -bottom-6 opacity-0"
                        aria-hidden="true"
                      />

                      {/* Dropdown Menu - now positioned to connect with the bridge */}
                      <div
                        className="absolute left-0 top-full mt-3 min-w-[11rem] rounded-xl border border-slate-200/70 
             bg-white/95 backdrop-blur-sm shadow-lg
             opacity-0 translate-y-1 invisible group-hover:visible group-hover:opacity-100 
             group-hover:translate-y-0 transition-all duration-300 ease-out z-50"
                        role="menu"
                      >
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-[0.9rem] text-slate-700 hover:text-slate-900
             hover:bg-slate-50/90 rounded-lg mx-1 transition-colors font-light tracking-wide"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
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

      {/* Mobile Menu Overlay - Conditionally rendered based on state */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-white/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        >
          {/* Mobile Menu Slide-in Panel */}
          <aside
            id="mobile-flyout"
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-800/95 border-l border-white/10 text-white overflow-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            style={{
              maxHeight: "100vh",
            }}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                {/* Mobile menu logo - simple img tag */}
                <img
                  src="/hotr-slate-logo.png"
                  alt="House of the Redeemer Logo"
                  width="24"
                  height="24"
                  className="rounded-sm"
                />
                <span className="font-serif text-lg">Menu</span>
              </div>
              <button
                className="p-1 hover:opacity-80 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="px-5 py-4">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-white/10 last:border-b-0"
                >
                  {/* Make entire row clickable */}
                  <button
                    onClick={() => {
                      if (item.dropdown) {
                        toggleMobileDropdown(index);
                      } else {
                        // Navigate to href for non-dropdown items
                        window.location.href = item.href;
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center justify-between py-3 w-full text-left text-white/90 hover:text-white transition-colors"
                    aria-expanded={
                      item.dropdown ? activeDropdown === index : undefined
                    }
                    aria-controls={
                      item.dropdown ? `mobile-sub-${index}` : undefined
                    }
                  >
                    <span>{item.label}</span>

                    {item.dropdown && (
                      <ChevronDown
                        size={18}
                        className={`transform transition-transform text-white/70 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {/* Mobile Dropdown Items */}
                  {item.dropdown && (
                    <div
                      id={`mobile-sub-${index}`}
                      style={{
                        maxHeight: activeDropdown === index ? "500px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.3s ease-in-out",
                      }}
                    >
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block py-2 text-sm text-white/80 hover:text-white border-t border-white/5 first:border-t-0 pl-4"
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
      )}
    </>
  );
};

export default MainNavigation;
