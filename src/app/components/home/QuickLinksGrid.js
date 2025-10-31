// src/app/components/home/QuickLinksGrid.js
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function QuickLinksGrid() {
  const cards = [
    {
      title: 'WELCOME',
      image: '/images/welcome-card.jpg',
      link: 'about/history',
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
      link: 'gallery',
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
      description: '',
    },
  ];

  return (
    <section className='w-full bg-[#1e293b] py-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Grid of cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className='group relative overflow-hidden rounded-lg aspect-[2/3] block transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
            >
              {/* Background Image */}
              <div className='absolute inset-0'>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
                {/* Dark overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 group-hover:from-black/80 group-hover:via-black/50 transition-all duration-300' />
              </div>

              {/* Text Content */}
              <div className='relative z-10 h-full flex flex-col justify-end p-6'>
                <h3 className='font-serif text-2xl md:text-3xl text-white font-light tracking-wide mb-2 transition-all duration-300 group-hover:translate-y-[-4px]'>
                  {card.title}
                </h3>
                <p className='text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  {card.description}
                </p>
              </div>

              {/* Hover border effect */}
              <div className='absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-lg transition-all duration-300' />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
