"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025); // fallback year

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo and About */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              {/* Simple img tag for logo */}
              <img
                src="/hotr-slate-logo.png"
                alt="House of the Redeemer Logo"
                width="56"
                height="56"
                className="rounded-md"
              />
              <div>
                <h3 className="font-serif text-xl font-medium tracking-wide">
                  House of the Redeemer
                </h3>
              </div>
            </div>

            <p className="text-white/70 mb-6">
              The House of the Redeemer, a place apart, based on the Episcopal
              tradition is open to all. Housed in a landmarked building, we
              provide hospitality through worship, spiritual renewal, and
              cultural and community events.
            </p>

            <div className="flex space-x-4 mt-auto">
              <a
                href="https://www.facebook.com/houseoftheredeemer"
                aria-label="Facebook"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/houseofredeemer/"
                aria-label="Instagram"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-5 pb-1 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about/history"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/visit/faq"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Visit
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/worship"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Worship
                </Link>
              </li>
              <li>
                <Link
                  href="/about/facilities"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Spaces & Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/give"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-5 pb-1 border-b border-white/10">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={20}
                  className="text-white/70 mt-1 flex-shrink-0"
                />
                <span className="text-white/70">
                  7 East 95th Street, New York, NY 10128
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-white/70 flex-shrink-0" />
                <a
                  href="tel:+12122890399"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  (212) 289-0399
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-white/70 flex-shrink-0" />
                <a
                  href="mailto:info@houseoftheredeemer.org"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  info@houseoftheredeemer.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} House of the Redeemer. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            {/* <Link
              href="/terms"
              className="text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              className="text-white/60 hover:text-white transition-colors"
            >
              Accessibility
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
