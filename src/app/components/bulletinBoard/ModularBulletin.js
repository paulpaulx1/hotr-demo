"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./bulletin.module.css";

export default function ModularBulletinBoard() {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const BULLETINS_PER_PAGE = 3;

  useEffect(() => {
    async function fetchBulletins() {
      try {
        const res = await fetch("/api/bulletins", { cache: "no-store" });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setBulletins(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bulletins:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBulletins();
  }, []);

  const totalPages = Math.ceil(bulletins.length / BULLETINS_PER_PAGE);
  const visibleBulletins = bulletins.slice(
    currentIndex,
    currentIndex + BULLETINS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev - BULLETINS_PER_PAGE < 0 ? 0 : prev - BULLETINS_PER_PAGE
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + BULLETINS_PER_PAGE;
      return next >= bulletins.length ? prev : next;
    });
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + BULLETINS_PER_PAGE < bulletins.length;

  if (loading) return null;
  if (error)
    return <p className="text-center text-red-600">Error loading bulletins.</p>;
  if (!bulletins?.length) return null;

  return (
    <section className="w-full my-16 max-w-5xl mx-auto px-4">
      {/* ---------- Static Header Block ---------- */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-serif italic mb-3 text-[#6b2f2a]">
          The House of the Redeemer,{" "}
          <span className="italic text-[#4e1f1a]">a place apart</span>
        </h1>
        <div className="h-[1px] w-24 bg-[#6b2f2a] mx-auto mb-4 opacity-30" />
        <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
          Based in the Episcopal tradition, open to all — housed in a
          land-marked building offering hospitality through worship, spiritual
          renewal, and cultural and community events.
        </p>
      </div>

      {/* ---------- Dynamic Bulletins with Carousel ---------- */}
      <div className="relative">
        <div className="space-y-10">
          {visibleBulletins.map((b, i) => (
            <article
              key={b._id || i}
              className="rounded-md overflow-hidden border border-[#e9e7e3] shadow-sm bg-[#fbf9f7]"
            >
              <div className="flex flex-col md:flex-row">
                {b.imageUrl && (
                  <div className="w-full md:w-2/5 flex-shrink-0">
                    <div className={styles.imageContainer}>
                      <Image
                        src={b.imageUrl}
                        alt={b.title || "Bulletin image"}
                        width={800}
                        height={600}
                        className="object-cover h-full w-full"
                        style={{ minHeight: "200px" }}
                      />
                      <div className={styles.overlay} />
                    </div>
                  </div>
                )}

                <div
                  className={`flex-1 p-6 md:p-8 ${b.imageUrl ? "" : "text-center"}`}
                >
                  {b.title && (
                    <h3 className="font-serif text-xl text-[#6b2f2a] mb-3">
                      {b.title}
                    </h3>
                  )}

                  {b.content && (
                    <div className="text-gray-700 leading-relaxed mb-4">
                      <p>{b.content}</p>
                    </div>
                  )}

                  {b.ctaText && (b.ctaFileUrl || b.ctaLink) && (
                    <div className="mt-4 text-center">
                      {b.ctaFileUrl ? (
                        <a
                          href={b.ctaFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#6b2f2a] text-white px-5 py-2 rounded text-sm uppercase tracking-wide hover:bg-[#4e1f1a] transition"
                        >
                          {b.ctaText || "View PDF"}
                        </a>
                      ) : (
                        <Link
                          href={b.ctaLink}
                          className="inline-block bg-[#6b2f2a] text-white px-5 py-2 rounded text-sm uppercase tracking-wide hover:bg-[#4e1f1a] transition"
                        >
                          {b.ctaText}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Navigation */}
        {bulletins.length > BULLETINS_PER_PAGE && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`p-2 rounded-full border-2 transition ${
                canGoPrev
                  ? "border-[#6b2f2a] text-[#6b2f2a] hover:bg-[#6b2f2a] hover:text-white"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Previous bulletins"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span className="text-gray-600 font-medium">
              {Math.floor(currentIndex / BULLETINS_PER_PAGE) + 1} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`p-2 rounded-full border-2 transition ${
                canGoNext
                  ? "border-[#6b2f2a] text-[#6b2f2a] hover:bg-[#6b2f2a] hover:text-white"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Next bulletins"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ---------- Static Join Email List ---------- */}
      <div className="mt-20 text-center">
        <div className="h-[1px] w-24 bg-[#6b2f2a] mx-auto mb-8 opacity-25" />
        <h4 className="text-xl font-serif text-[#6b2f2a] mb-3">
          Stay in Touch
        </h4>
        <p className="text-gray-700 mb-6">
          Receive updates on upcoming events, retreats, and programs.
        </p>
        <a
          href="https://lp.constantcontactpages.com/sl/bJOiwwW/houseoftheredeemer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#6b2f2a] text-white px-8 py-3 rounded-md text-sm uppercase tracking-wide hover:bg-[#4e1f1a] transition"
        >
          Join Our Email List
        </a>
      </div>
    </section>
  );
}
