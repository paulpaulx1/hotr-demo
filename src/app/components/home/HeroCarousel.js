"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HeroCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(slides.length > 0); // 👈 start ready if slides preloaded

  // only run fade-in if slides were fetched async
  useEffect(() => {
    if (!slides.length) return;
    if (ready) return; // already ready (SSR cached)
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, [slides, ready]);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % slides.length), 12000);
    return () => clearInterval(id);
  }, [slides]);

  if (!slides.length) return null;

  const next = () => setCurrent((i) => (i + 1) % slides.length);
  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div
      className={`relative h-screen overflow-hidden transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      } bg-slate-900`}   // 👈 gives slate background under fade
    >
      {slides.map((s, i) => {
        const active = i === current;
        return (
          <div
            key={s._id}
            className={`absolute inset-0 transition-all duration-[1600ms] ${
              active
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            {s.mediaType === "image" && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${s.imageUrl})` }}
              />
            )}
            {s.mediaType === "video" && (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={s.posterImageUrl}
                className="object-cover h-full w-full"
              >
                <source src={s.videoUrl} type="video/mp4" />
              </video>
            )}

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/70" />

            <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
              <div className="max-w-6xl mx-auto">
                <h1
                  className={`font-serif text-5xl md:text-7xl mb-8 transition-all duration-700 ${
                    active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {s.title}
                </h1>
                {s.description && (
                  <p
                    className={`text-xl md:text-2xl mb-10 transition-all duration-700 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    {s.description}
                  </p>
                )}
                <Link
                  href="/visit/FAQ"
                  className="inline-block px-8 py-4 bg-slate-700 hover:bg-transparent border-2 border-slate-700 hover:border-white text-white font-light tracking-wide transition-all duration-300"
                >
                  Plan Your Visit
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prev}
        className="hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-800/20 text-white hover:bg-slate-800/40 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-800/20 text-white hover:bg-slate-800/40 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
