// QuickLinksGrid.js
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./QuickLinksGrid.module.css";

const defaultCards = [
  {
    title: "Welcome",
    image: "/images/welcome-card.jpg",
    link: "/about/history",
    description: "Learn about our community",
  },
  {
    title: "Prayer Times",
    image: "/images/mass-times-card.jpg",
    link: "/worship",
    description: "Service schedules",
  },
  {
    title: "Giving",
    image: "/images/giving-card.jpg",
    link: "/give",
    description: "Support our mission",
  },
  {
    title: "Calendar",
    image: "/images/volunteer-card.jpg",
    link: "/calendar",
    description: "Join us in community",
  },
  {
    title: "Gallery",
    image: "/images/gallery-card.jpg",
    link: "/gallery",
    description: "Explore our historic space",
  },
  {
    title: "TV & Film",
    image: "/images/tvfilm-card.jpg",
    link: "/filmandtv",
    description: "Film at House of the Redeemer",
  },
  {
    title: "Contact Us",
    image: "/images/contact-card.jpg",
    link: "/contact",
    description: "Get in touch",
  },
  {
    title: "Hosting Events",
    image: "/images/tour-card.jpg",
    link: "/hosting-events",
    description: "Plan your next gathering",
  },
];

// Small helper: ask Sanity CDN for a correctly sized/cropped image.
// (Works even if you don't use @sanity/image-url.)
function sanityThumb(url) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("cdn.sanity.io")) return url;

  // 4/5 card ratio: choose a “good enough” baseline size
  // Next.js will still optimize, but this prevents garbage inputs.
  const params = new URLSearchParams({
    w: "900",
    h: "1125",
    fit: "crop",
    crop: "focalpoint",
    auto: "format",
    q: "80",
  });

  // Preserve any existing querystring sanely
  const [base] = url.split("?");
  return `${base}?${params.toString()}`;
}

export default function QuickLinksGrid() {
  const [overrides, setOverrides] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchLinks() {
      try {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
        if (!projectId || !dataset) return;

        const query = encodeURIComponent(`
  *[_type == "quickLink"]{
    link,
    title,
    description,
    "imageUrl": image.asset->url + "?w=800&auto=format"
  }
`);

        const url = `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);
        const { result } = await res.json();

        if (!cancelled) setOverrides(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Error loading quick links:", err);
      }
    }

    fetchLinks();
    return () => {
      cancelled = true;
    };
  }, []);

  const mergedCards = useMemo(() => {
    return defaultCards.map((card) => {
      const override = overrides.find((l) => l.link === card.link);
      if (!override) return card;

      return {
        ...card,
        title: override.title || card.title,
        description: override.description || card.description,
        image: sanityThumb(override.imageUrl) || card.image,
      };
    });
  }, [overrides]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {mergedCards.map((card) => (
            <Link key={card.link} href={card.link} className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  quality={99}
                />
                <div className={styles.overlay} />
                <div className={styles.content}>
                  <h3 className={styles.title}>{card.title}</h3>
                  <p className={styles.description}>{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
