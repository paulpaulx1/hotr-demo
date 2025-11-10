'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const defaultCards = [
  { title: 'Welcome', image: '/images/welcome-card.jpg', link: '/about/history', description: 'Learn about our community' },
  { title: 'Prayer Times', image: '/images/mass-times-card.jpg', link: '/worship', description: 'Service schedules' },
  { title: 'Giving', image: '/images/giving-card.jpg', link: '/give', description: 'Support our mission' },
  { title: 'Calendar', image: '/images/volunteer-card.jpg', link: '/calendar', description: 'Join us in community' },
  { title: 'Gallery', image: '/images/gallery-card.jpg', link: '/gallery', description: 'Explore our historic space' },
  { title: 'TV & Film', image: '/images/tvfilm-card.jpg', link: '/filmandtv', description: 'Film at House of the Redeemer' },
  { title: 'Contact Us', image: '/images/contact-card.jpg', link: '/contact', description: 'Get in touch' },
  { title: 'Hosting Events', image: '/images/tour-card.jpg', link: '/hosting-events', description: 'Plan your next gathering' },
];

export default function QuickLinksGrid() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
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
            "imageUrl": image.asset->url
          }
        `);

        const url = `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`;
        const res = await fetch(url, {
          next: { revalidate: 3600, tags: ["sanity"] },
        });

        if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);
        const { result } = await res.json();
        setLinks(result || []);
      } catch (err) {
        console.error("Error loading quick links:", err);
      }
    }
    fetchLinks();
  }, []);

  const mergedCards = defaultCards.map((card) => {
    const override = links.find((l) => l.link === card.link);
    return override
      ? {
          ...card,
          title: override.title || card.title,
          description: override.description || card.description,
          image: override.imageUrl || card.image,
        }
      : card;
  });

  return (
    <section className="w-full bg-[#1e293b] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mergedCards.map((card, i) => (
            <Link
              key={i}
              href={card.link}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] block transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300" />
              </div>

              {/* Text */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 text-center">
                <h3 style={{ fontFamily: 'Georgia, serif' }} className="text-xl md:text-2xl text-white font-light tracking-wide mb-2 leading-snug min-h-[2.8rem] flex items-end justify-center">
                  {card.title}
                </h3>
                <p className="text-white/80 text-sm leading-snug min-h-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.description}
                </p>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-lg transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
