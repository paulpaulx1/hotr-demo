'use client';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Link from 'next/link';

export default function HeroCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(slides.length > 0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);

  // Fade-in once slides are ready
  useEffect(() => {
    if (!slides.length || ready) return;
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, [slides, ready]);

  // Auto-advance (now conditional)
  useEffect(() => {
    if (!slides.length || !isAutoAdvancing) return;
    const id = setInterval(
      () => setCurrent((i) => (i + 1) % slides.length),
      10000,
    );
    return () => clearInterval(id);
  }, [slides, isAutoAdvancing]);

  if (!slides.length) return null;

  const next = () => setCurrent((i) => (i + 1) % slides.length);
  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);
  const toggleAutoAdvance = () => setIsAutoAdvancing(!isAutoAdvancing);

  return (
    <div
      className={`relative h-screen overflow-hidden transition-opacity duration-700 ${
        ready ? 'opacity-100' : 'opacity-0'
      } bg-slate-900`}
    >
      {slides.map((s, i) => {
        const active = i === current;
        const isVideo = s.mediaType === 'video';

        return (
          <div
            key={s._id}
            className={`absolute inset-0 transition-all duration-[1600ms] ease-in-out ${
              active
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            {/* --- background layer --- */}
            {isVideo ? (
              <div className='absolute inset-0 z-0 overflow-hidden'>
                <video
                  key={s.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload='auto'
                  poster={s.posterImageUrl}
                  className='absolute inset-0 h-full w-full object-cover z-0'
                  style={{
                    opacity: active ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                  }}
                >
                  <source src={s.videoUrl} type='video/mp4' />
                </video>
              </div>
            ) : (
              <div
                className={`absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[16000ms] ${
                  active ? 'scale-110' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${s.imageUrl})` }}
              />
            )}

            {/* --- gradient overlay --- */}
            <div
              className={`absolute inset-0 z-10 ${
                isVideo
                  ? 'bg-gradient-to-b from-slate-900/70 via-slate-900/75 to-slate-900/85'
                  : 'bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/70'
              }`}
            />

            {/* --- text content --- */}
            <div className='relative z-20 flex items-center justify-center h-full text-center text-white px-6'>
              <div className='max-w-6xl mx-auto mt-24'>
                <h1
                  className={`font-serif text-5xl md:text-7xl mb-8 transition-all duration-700 ${
                    active
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {s.title}
                </h1>

                {/* services row (if any) */}
                {s.services?.length > 0 && (
                  <div
                    className={`flex flex-wrap justify-center gap-3 md:gap-6 text-base md:text-lg font-light tracking-wide mb-8 transition-all duration-700 ${
                      active
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {s.services.map((service, idx) => (
                      <React.Fragment key={service}>
                        <span className='text-white/95 font-semibold'>
                          {service}
                        </span>
                        {idx < s.services.length - 1 && (
                          <span className='text-white/60 hidden md:inline font-semibold'>
                            |
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* description */}
                {s.description && (
                  <p
                    className={`text-l md:text-xl font-light max-w-3xl mx-auto mb-12 text-white/90 leading-relaxed transition-all duration-700 ${
                      active
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {s.description}
                  </p>
                )}

                {/* dual CTAs */}
                <div
                  className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-700 ${
                    active
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <Link
                    href='/visit/faq'
                    className='px-8 py-4 bg-slate-700 hover:bg-transparent border-2 border-slate-700 hover:border-white text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg text-center'
                  >
                    Plan Your Visit
                  </Link>
                  <Link
                    href='/gallery'
                    className='px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white hover:text-slate-900 text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg text-center'
                  >
                    Visit our Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* --- carousel controls --- */}
      <button
        onClick={prev}
        className='hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-800/20 text-white hover:bg-slate-800/40 transition'
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className='hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-800/20 text-white hover:bg-slate-800/40 transition'
      >
        <ChevronRight size={24} />
      </button>

      {/* --- static bottom-left tag --- */}
      <div className='absolute bottom-8 left-8 z-30 text-white max-w-xs hidden lg:block'>
        <h3 className='font-serif text-xl font-medium mb-2'>
          Historic Sanctuary
        </h3>
        <p className='text-white/80 text-sm mb-4 font-light'>Fabbri Home</p>
        <Link
          href='/contact'
          className='text-white/90 hover:text-white text-sm font-light border-b border-white/30 hover:border-white transition-all duration-300 hover:-translate-y-0.5 inline-block'
        >
          Get in Touch →
        </Link>
      </div>

      {/* --- play/pause button (bottom-right) --- */}
      <button
        onClick={toggleAutoAdvance}
        className='absolute bottom-8 right-8 z-30 p-4 rounded-full bg-slate-800/30 hover:bg-slate-800/50 text-white transition-all duration-300 hover:scale-110 hidden lg:flex items-center justify-center'
        aria-label={isAutoAdvancing ? 'Pause carousel' : 'Play carousel'}
      >
        {isAutoAdvancing ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
}
