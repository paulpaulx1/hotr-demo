'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function QuickLinksGrid() {
  const cards = [
    {
      title: 'WELCOME',
      image: '/images/welcome-card.jpg',
      link: '/about/history',
      description: 'Learn about our community',
    },
    {
      title: 'MASS TIMES',
      image: '/images/mass-times-card.jpg',
      link: '/worship',
      description: 'Service schedules',
    },
    {
      title: 'GIVING',
      image: '/images/giving-card.jpg',
      link: '/give',
      description: 'Support our mission',
    },
    {
      title: 'CALENDAR',
      image: '/images/volunteer-card.jpg',
      link: '/calendar',
      description: 'Join us in community',
    },
    {
      title: 'GALLERY',
      image: '/images/gallery-card.jpg',
      link: '/gallery',
      description: 'Explore our historic space',
    },
    {
      title: 'TV & FILM',
      image: '/images/tvfilm-card.jpg',
      link: '/filmandtv',
      description: 'Film at House of the Redeemer',
    },
    {
      title: 'CONTACT US',
      image: '/images/contact-card.jpg',
      link: '/contact',
      description: 'Get in touch',
    },
    {
      title: 'HOSTING EVENTS',
      image: '/images/tour-card.jpg',
      link: '/hosting-events',
      description: 'Plan your next gathering',
    },
  ];

  return (
    <section className="w-full bg-[#1e293b] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] block transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300" />
              </div>

              {/* Text Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 text-center">
                <h3 className="font-serif text-xl md:text-2xl text-white font-light tracking-wide mb-2 leading-snug min-h-[2.8rem] flex items-end justify-center">
                  {card.title}
                </h3>
                <p className="text-white/80 text-sm leading-snug min-h-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.description}
                </p>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-lg transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
