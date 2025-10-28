"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./GalleryPage.module.css";

export default function GalleryGrid({ images }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.heading}>Gallery</h1>
        <p className={styles.intro}>A look inside and around the House.</p>

        <div className={styles.grid}>
          {images.map((img) => (
            <figure
              key={img._id}
              className={styles.card}
              onClick={() => setActive(img)}
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

      {active && (
        <div className={styles.lightbox} onClick={() => setActive(null)}>
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.url.replace("?w=800", "?w=1600")}
              alt={active.title}
            />
            {active.title && (
              <div className={styles.caption}>
                <h2>{active.title}</h2>
                {active.description && <p>{active.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
