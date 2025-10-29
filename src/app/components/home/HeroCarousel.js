"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // --- Fetch carousel items ---
  useEffect(() => {
    const controller = new AbortController();

    async function fetchCarouselItems() {
      try {
        const res = await fetch("/api/hero-carousel", { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setSlides(Array.isArray(json.result) ? json.result : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch carousel data:", err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCarouselItems();
    return () => controller.abort();
  }, []);

  // --- Fade in once data is loaded ---
  useEffect(() => {
    if (!loading && slides.length > 0 && !error) {
      const t = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(t);
    }
  }, [loading, slides, error]);

  // --- Auto-advance slides ---
  useEffect(() => {
    if (slides.length === 0) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(id);
  }, [slides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // --- Loading skeleton ---
  if (loading) {
    return (
      <div className="relative h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900" />
        <div className="animate-pulse text-white/70 text-center z-10">
          <div className="h-6 w-48 bg-slate-700/50 mx-auto mb-4 rounded" />
          <div className="h-4 w-64 bg-slate-700/40 mx-auto rounded" />
        </div>
      </div>
    );
  }

  // --- Error or empty states ---
  if (error || slides.length === 0) {
    return (
      <div className="relative h-screen overflow-hidden bg-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="font-serif text-4xl mb-6">House of the Redeemer</h1>
          <p className="text-xl mb-8">
            A welcoming Episcopal community in a historic Vanderbilt mansion on
            Carnegie Hill
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/visit/FAQ"
              className="px-8 py-4 bg-slate-700 hover:bg-transparent border-2 border-slate-700 hover:border-white text-white font-light tracking-wide transition-all duration-300"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/visit/FAQ"
              className="px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white hover:text-slate-900 text-white font-light tracking-wide transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Main carousel ---
  return (
    <div
      className={`relative h-screen overflow-hidden transition-opacity duration-1000 ease-in-out ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide._id}
            aria-hidden={!isActive}
            className={[
              "absolute inset-0 transition-all duration-[1600ms] ease-in-out",
              isActive
                ? "opacity-100 scale-100 z-10 pointer-events-auto"
                : "opacity-0 scale-105 z-0 pointer-events-none",
            ].join(" ")}
          >
            {/* --- Background media --- */}
            {slide.mediaType === "image" && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ${
                    isActive ? "scale-100" : "scale-110"
                  }`}
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                />
              </div>
            )}
            {slide.mediaType === "video" && (
              <div className="absolute inset-0 pointer-events-none">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover h-full w-full"
                  poster={slide.posterImageUrl}
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              </div>
            )}

            {/* --- Gradient overlay --- */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/70 pointer-events-none" />

            {/* --- Slide content --- */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="max-w-6xl mx-auto px-6 text-center text-white">
                <h1
                  className={[
                    "font-serif text-4xl md:text-6xl lg:text-7xl font-normal mb-8 tracking-wide transform transition-all duration-1000 delay-300",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0",
                  ].join(" ")}
                >
                  {slide.title}
                </h1>

                <div
                  className={[
                    "flex flex-wrap justify-center gap-6 md:gap-12 text-lg md:text-xl font-light tracking-wide mb-8 transform transition-all duration-1000 delay-500",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0",
                  ].join(" ")}
                >
                  {slide.services &&
                    slide.services.map((service, i) => (
                      <React.Fragment key={service}>
                        <span className="text-white/95">{service}</span>
                        {i < slide.services.length - 1 && (
                          <span className="text-white/60 ml-6 md:ml-12">|</span>
                        )}
                      </React.Fragment>
                    ))}
                </div>

                <p
                  className={[
                    "text-xl md:text-2xl font-light max-w-3xl mx-auto mb-12 text-white/90 leading-relaxed transform transition-all duration-1000 delay-700",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0",
                  ].join(" ")}
                >
                  {slide.description}
                </p>

                <div
                  className={[
                    "flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1000 delay-900",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0",
                  ].join(" ")}
                >
                  <Link
                    href="/visit/FAQ"
                    className="px-8 py-4 bg-slate-700 hover:bg-transparent border-2 border-slate-700 hover:border-white text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer text-center"
                  >
                    Plan Your Visit
                  </Link>
                  <Link
                    href="/visit/FAQ"
                    className="px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white hover:text-slate-900 text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* --- Carousel controls --- */}
      <button
        onClick={prevSlide}
        className="hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-slate-800/20 backdrop-blur-sm p-3 rounded-full text-white/80 hover:text-white hover:bg-slate-800/40 hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-slate-800/20 backdrop-blur-sm p-3 rounded-full text-white/80 hover:text-white hover:bg-slate-800/40 hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>

      {/* --- Indicators --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={[
              "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125",
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70",
            ].join(" ")}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* --- Static bottom-left tag --- */}
      <div className="absolute bottom-8 left-8 z-20 text-white max-w-xs hidden lg:block">
        <h3 className="font-serif text-xl font-medium mb-2">
          Historic Sanctuary
        </h3>
        <p className="text-white/80 text-sm mb-4 font-light">
          Vanderbilt Mansion
        </p>
        <Link
          href="/visit/FAQ"
          className="text-white/90 hover:text-white cursor-pointer text-sm font-light border-b border-white/30 hover:border-white transition-all duration-300 hover:-translate-y-0.5"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
};

export default HeroCarousel;
