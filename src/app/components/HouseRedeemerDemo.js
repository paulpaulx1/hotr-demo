'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

/* -------------------- SEO & Meta Component -------------------- */
const SEOHead = () => {
  useEffect(() => {
    // Update document title
    document.title = "House of the Redeemer | Episcopal Church in Historic Vanderbilt Mansion | Carnegie Hill NYC";

    // Create or update meta tags
    const metaTags = [
      { name: "description", content: "Join our welcoming Episcopal community in a stunning historic Vanderbilt mansion on Carnegie Hill. Sunday services, weddings, cultural events & spiritual guidance in Manhattan." },
      { name: "keywords", content: "Episcopal church NYC, Carnegie Hill church, Vanderbilt mansion, Manhattan church, Sunday service, wedding venue NYC, historic church, Episcopal community, spiritual guidance, Upper East Side church" },
      { name: "author", content: "House of the Redeemer" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#1e293b" },
      { name: "geo.region", content: "US-NY" },
      { name: "geo.placename", content: "New York" },
      { name: "geo.position", content: "40.7851;-73.9608" },
      { name: "ICBM", content: "40.7851, -73.9608" },
      
      // Open Graph tags
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "House of the Redeemer" },
      { property: "og:title", content: "House of the Redeemer | Episcopal Church in Historic Vanderbilt Mansion" },
      { property: "og:description", content: "Experience worship in one of Manhattan's most beautiful historic spaces. Join our welcoming Episcopal community on Carnegie Hill for Sunday services, weddings, and cultural events." },
      { property: "og:image", content: "https://www.houseoftheredeemer.org/wp-content/uploads/house-of-the-redeemer_entry1-768x512.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Historic entrance of House of the Redeemer Episcopal Church in Carnegie Hill Manhattan" },
      { property: "og:url", content: "https://www.houseoftheredeemer.org" },
      { property: "og:locale", content: "en_US" },
      
      // Twitter tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@houseredeemer" },
      { name: "twitter:creator", content: "@houseredeemer" },
      { name: "twitter:title", content: "House of the Redeemer | Episcopal Church in Historic Vanderbilt Mansion" },
      { name: "twitter:description", content: "Experience worship in one of Manhattan's most beautiful historic spaces. Join our welcoming Episcopal community on Carnegie Hill." },
      { name: "twitter:image", content: "https://www.houseoftheredeemer.org/wp-content/uploads/house-of-the-redeemer_entry1-768x512.jpg" },
      { name: "twitter:image:alt", content: "Historic entrance of House of the Redeemer Episcopal Church" }
    ];

    // Add all meta tags
    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.houseoftheredeemer.org');

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Church",
      "name": "House of the Redeemer",
      "description": "A welcoming Episcopal community in a historic Vanderbilt mansion on Carnegie Hill, offering worship services, cultural events, and spiritual guidance in Manhattan.",
      "url": "https://www.houseoftheredeemer.org",
      "image": "https://www.houseoftheredeemer.org/wp-content/uploads/house-of-the-redeemer_entry1-768x512.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7 East 95th Street",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10128",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.7851",
        "longitude": "-73.9608"
      },
      "telephone": "+1-212-289-4400",
      "denomination": "Episcopal",
      "religiousOrganization": "Episcopal Church",
      "foundingDate": "1949",
      "sameAs": [
        "https://www.facebook.com/houseoftheredeemer",
        "https://www.instagram.com/houseoftheredeemer"
      ],
      "containsPlace": {
        "@type": "HistoricBuilding",
        "name": "Vanderbilt Mansion",
        "description": "Historic mansion converted to Episcopal church and cultural center",
        "architect": "Warren and Wetmore"
      },
      "event": [
        {
          "@type": "ReligiousEvent",
          "name": "Sunday Service",
          "description": "Weekly Episcopal worship service",
          "startTime": "11:00",
          "dayOfWeek": "Sunday"
        }
      ],
      "openingHours": "Su 11:00-12:00",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Church Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sunday Worship Service",
              "description": "Traditional Episcopal liturgy in historic setting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Wedding Ceremonies",
              "description": "Sacred wedding ceremonies in historic Vanderbilt mansion"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cultural Events",
              "description": "Concerts, art exhibitions, and lectures"
            }
          }
        ]
      }
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, []);

  return null; // This component doesn't render anything
};

/* -------------------- Navigation (flyout + backdrop) -------------------- */
const Navigation = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    const cls = ['overflow-hidden', 'touch-none'];
    if (isMobileMenuOpen) {
      document.documentElement.classList.add(...cls);
      document.body.classList.add(...cls);
    } else {
      document.documentElement.classList.remove(...cls);
      document.body.classList.remove(...cls);
    }
    return () => {
      document.documentElement.classList.remove(...cls);
      document.body.classList.remove(...cls);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setIsMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-md py-3' : 'bg-slate-900/20 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="font-serif text-lg">†</span>
              </div>
              <span className="font-serif text-xl font-medium tracking-wide">House of the Redeemer</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 text-white/90">
              {[
                ['#worship', 'Worship'],
                ['#about', 'About'],
                ['#events', 'Events'],
                ['#restoration', 'Restoration'],
                ['#contact', 'Visit'],
              ].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-white cursor-pointer transition-colors font-light tracking-wide relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Hamburger — hide while menu is open */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden text-white cursor-pointer ${isMobileMenuOpen ? 'hidden' : ''}`}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-flyout"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop + Slide-in Flyout (z-60 so it's above nav content) */}
      <div
        className={[
          'fixed inset-0 z-[60] md:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'bg-white/20 backdrop-blur-sm opacity-100' : 'pointer-events-none opacity-0'
        ].join(' ')}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      >
        <aside
          id="mobile-flyout"
          className={[
            'absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-800/95 border-l border-white/10 text-white',
            'transition-transform duration-300 will-change-transform z-[61]',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          ].join(' ')}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="font-serif text-lg">Menu</span>
            <button
              className="p-1 hover:opacity-80 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="px-5 py-4">
            {['Worship', 'About', 'Events', 'Restoration', 'Visit'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-3 text-white/90 hover:text-white border-b border-white/10 last:border-b-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

/* -------------------- Hero Carousel (arrows hidden on mobile) -------------------- */
const HeroCarousel = () => {
  const slides = useMemo(() => ([
    {
      image: "https://www.houseoftheredeemer.org/wp-content/uploads/house-of-the-redeemer_entry1-768x512.jpg",
      title: "Worship • Community • Renewal",
      services: ["Sunday Services", "Cultural Events", "Spiritual Guidance"],
      description: "A welcoming Episcopal community in a historic Vanderbilt mansion on Carnegie Hill"
    },
    {
      image: "https://www.houseoftheredeemer.org/wp-content/uploads/house-of-the-redeemer_library5-1024x683.jpg",
      title: "Historic Sanctuary",
      services: ["Architectural Tours", "Wedding Ceremonies", "Private Events"],
      description: "Experience worship in one of Manhattan's most beautiful historic spaces"
    },
    {
      image: "https://www.houseoftheredeemer.org/wp-content/uploads/house-of-the-redeemer_dining3-1024x683.jpg",
      title: "Cultural Heritage",
      services: ["Concerts", "Art Exhibitions", "Lectures"],
      description: "Where faith meets culture in the heart of Carnegie Hill"
    }
  ]), []);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            aria-hidden={!isActive}
            className={[
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              isActive
                ? "opacity-100 scale-100 z-10 pointer-events-auto"
                : "opacity-0 scale-105 z-0 pointer-events-none"
            ].join(" ")}
          >
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/70 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="max-w-6xl mx-auto px-6 text-center text-white">
                <h1
                  className={[
                    "font-serif text-4xl md:text-6xl lg:text-7xl font-normal mb-8 tracking-wide transform transition-all duration-1000 delay-300",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  ].join(" ")}
                >
                  {slide.title}
                </h1>

                <div
                  className={[
                    "flex flex-wrap justify-center gap-6 md:gap-12 text-lg md:text-xl font-light tracking-wide mb-8 transform transition-all duration-1000 delay-500",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  ].join(" ")}
                >
                  {slide.services.map((service, i) => (
                    <React.Fragment key={service}>
                      <span className="text-white/95">{service}</span>
                      {i < slide.services.length - 1 && <span className="text-white/60">|</span>}
                    </React.Fragment>
                  ))}
                </div>

                <p
                  className={[
                    "text-xl md:text-2xl font-light max-w-3xl mx-auto mb-12 text-white/90 leading-relaxed transform transition-all duration-1000 delay-700",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  ].join(" ")}
                >
                  {slide.description}
                </p>

                <div
                  className={[
                    "flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1000 delay-900",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  ].join(" ")}
                >
                  <button className="px-8 py-4 bg-slate-700 hover:bg-transparent border-2 border-slate-700 hover:border-white text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    Plan Your Visit
                  </button>
                  <button className="px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white hover:text-slate-900 text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Carousel Controls — hidden on mobile */}
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

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={[
              "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125",
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            ].join(" ")}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Historic Project Info (desktop only) */}
      <div className="absolute bottom-8 left-8 z-20 text-white max-w-xs hidden lg:block">
        <h3 className="font-serif text-xl font-medium mb-2">Historic Sanctuary</h3>
        <p className="text-white/80 text-sm mb-4 font-light">Vanderbilt Mansion</p>
        <a
          href="#about"
          className="text-white/90 hover:text-white cursor-pointer text-sm font-light border-b border-white/30 hover:border-white transition-all duration-300 hover:-translate-y-0.5"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

/* -------------------- About Section -------------------- */
const AboutSection = () => {
  const features = [
    {
      title: "Historic Setting",
      description:
        "Our sacred space occupies a beautifully preserved Vanderbilt mansion, offering a unique blend of architectural grandeur and intimate worship experience in the heart of Manhattan."
    },
    {
      title: "Episcopal Tradition",
      description:
        "Rooted in Anglican heritage, we embrace traditional liturgy while welcoming diverse perspectives and modern approaches to faith and community life."
    },
    {
      title: "Open Doors",
      description:
        "Whether you're exploring faith for the first time or deepening your spiritual journey, our community welcomes you exactly as you are."
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-slate-700 mb-6">
            Welcome to Our Community
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-serif text-2xl text-slate-700 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Main Component -------------------- */
const HouseRedeemerDemo = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <Navigation
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div
          className={[
            'transition filter duration-200',
            isMobileMenuOpen ? 'blur-sm md:blur-0' : 'blur-0'
          ].join(' ')}
          aria-hidden={isMobileMenuOpen ? true : undefined}
        >
          <HeroCarousel />
        </div>

        <AboutSection />

        <div className="bg-slate-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="font-serif text-2xl mb-4">NextJS + Sanity CMS Architecture Demo</h3>
            <p className="text-slate-300 font-light mb-6">
              This component-based structure enables easy content management, better SEO,
              and eliminates the maintenance issues of monolithic WordPress installations.
            </p>
            
            <div className="bg-slate-700/50 rounded-lg p-6 text-left max-w-4xl mx-auto">
              <h4 className="font-serif text-lg mb-3 text-center text-slate-200">✨ SEO & Social Media Improvements Added</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-medium text-slate-300 mb-2">🔍 Structured Data (Schema.org)</h5>
                  <ul className="text-slate-400 space-y-1 text-xs">
                    <li>• Church organization markup</li>
                    <li>• Address & contact info</li>
                    <li>• Service times & events</li>
                    <li>• Historic building details</li>
                    <li>• Geographic coordinates</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-slate-300 mb-2">📱 Open Graph & Twitter Cards</h5>
                  <ul className="text-slate-400 space-y-1 text-xs">
                    <li>• Rich social media previews</li>
                    <li>• Optimized title & descriptions</li>
                    <li>• High-quality preview images</li>
                    <li>• Facebook & Twitter optimization</li>
                    <li>• Proper image dimensions</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-600">
                <p className="text-xs text-slate-400 text-center">
                  <strong className="text-slate-300">Result:</strong> Better Google search rankings, rich social media sharing, 
                  improved click-through rates, and enhanced local SEO for &ldquo;Episcopal church Carnegie Hill&rdquo; searches.
                </p>
              </div>
            </div>

            {/* Technical Resources */}
            <div className="mt-8 pt-6 border-t border-slate-600">
              <h4 className="text-slate-300 font-medium mb-4">📚 Learn More About These SEO Improvements</h4>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a 
                  href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white underline hover:no-underline transition-colors"
                >
                  Google: Structured Data Guide
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href="https://developers.google.com/search/docs/appearance/structured-data/organization" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white underline hover:no-underline transition-colors"
                >
                  Organization Schema
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href="https://ogp.me/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white underline hover:no-underline transition-colors"
                >
                  Open Graph Protocol
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white underline hover:no-underline transition-colors"
                >
                  Twitter Cards Guide
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href="https://developers.google.com/search/docs/appearance/good-titles-snippets" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white underline hover:no-underline transition-colors"
                >
                  Meta Tags Best Practices
                </a>
              </div>
              <p className="text-slate-500 text-xs mt-3">
                These Google and platform documentation links explain exactly how structured data and meta tags improve search rankings and social media sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseRedeemerDemo;