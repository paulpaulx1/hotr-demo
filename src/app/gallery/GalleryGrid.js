"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./GalleryPage.module.css";

export default function GalleryGrid({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [fading, setFading] = useState(false);

  const showNext = useCallback(() => {
    if (activeIndex === null) return;
    setFading(true);
    setTimeout(() => {
      setActiveIndex((i) => (i + 1) % images.length);
      setFading(false);
    }, 150);
  }, [activeIndex, images.length]);

  const showPrev = useCallback(() => {
    if (activeIndex === null) return;
    setFading(true);
    setTimeout(() => {
      setActiveIndex((i) => (i - 1 + images.length) % images.length);
      setFading(false);
    }, 150);
  }, [activeIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showNext, showPrev]);

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.heading}>Gallery</h1>
        <p className={styles.intro}>A look inside and around the House.</p>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <figure
              key={img._id}
              className={styles.card}
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={img.url}
                alt={img.title || "House of the Redeemer"}
                width={400}
                height={400}
                placeholder="blur"
                blurDataURL={`${img.url}&blur=50&w=20`}
                className={styles.image}
              />
            </figure>
          ))}
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Viewport-fixed chevrons (don’t close on click) */}
          <button
            className={`${styles.navBtn} ${styles.prev}`}
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next image"
          >
            <ChevronRight size={30} />
          </button>

          {/* Centered content; clicks inside shouldn’t bubble to overlay */}
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div
              className={`${styles.imageFrame} ${
                fading ? styles.fadeOut : styles.fadeIn
              }`}
            >
              <img
                src={images[activeIndex].url.replace("?w=800", "?w=1600")}
                alt={images[activeIndex].title || "Gallery image"}
              />
            </div>

            {images[activeIndex].title && (
              <div className={styles.caption}>
                <h2>{images[activeIndex].title}</h2>
                {images[activeIndex].description && (
                  <p>{images[activeIndex].description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
