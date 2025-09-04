'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, ChevronDown } from 'lucide-react';

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-black/20 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="font-serif text-lg">†</span>
            </div>
            <span className="font-serif text-xl font-medium tracking-wide">House of the Redeemer</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-white/90">
            <a href="#worship" className="hover:text-white transition-colors font-light tracking-wide">Worship</a>
            <a href="#about" className="hover:text-white transition-colors font-light tracking-wide">About</a>
            <a href="#events" className="hover:text-white transition-colors font-light tracking-wide">Events</a>
            <a href="#restoration" className="hover:text-white transition-colors font-light tracking-wide">Restoration</a>
            <a href="#contact" className="hover:text-white transition-colors font-light tracking-wide">Visit</a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              {['Worship', 'About', 'Events', 'Restoration', 'Visit'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-white/90 hover:text-white transition-colors font-light tracking-wide py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Carousel Component
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
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
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />
          
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="max-w-6xl mx-auto px-6 text-center text-white">
              <h1 className={`font-serif text-4xl md:text-6xl lg:text-7xl font-normal mb-8 tracking-wide transform transition-all duration-1000 delay-300 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                {slide.title}
              </h1>
              
              <div className={`flex flex-wrap justify-center gap-6 md:gap-12 text-lg md:text-xl font-light tracking-wide mb-8 transform transition-all duration-1000 delay-500 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                {slide.services.map((service, i) => (
                  <React.Fragment key={service}>
                    <span className="text-white/95">{service}</span>
                    {i < slide.services.length - 1 && <span className="text-white/60">|</span>}
                  </React.Fragment>
                ))}
              </div>

              <p className={`text-xl md:text-2xl font-light max-w-3xl mx-auto mb-12 text-white/90 leading-relaxed transform transition-all duration-1000 delay-700 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                {slide.description}
              </p>

              <div className={`flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1000 delay-900 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <button className="px-8 py-4 bg-slate-700 hover:bg-transparent border-2 border-slate-700 hover:border-white text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:cursor-pointer">
                  Plan Your Visit
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white hover:text-slate-900 text-white font-light tracking-wide transition-all duration-300 transform hover:scale-105 hover:cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm p-3 rounded-full text-white/80 hover:text-white hover:bg-black/40 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm p-3 rounded-full text-white/80 hover:text-white hover:bg-black/40 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Historic Project Info */}
      <div className="absolute bottom-8 left-8 z-20 text-white max-w-xs hidden lg:block">
        <h3 className="font-serif text-xl font-medium mb-2">Historic Sanctuary</h3>
        <p className="text-white/80 text-sm mb-4 font-light">Vanderbilt Mansion</p>
        <a href="#about" className="text-white/90 hover:text-white text-sm font-light border-b border-white/30 hover:border-white transition-colors">
          Learn More →
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-white/70 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </div>
  );
};

// About Section Component
const AboutSection = () => {
  const features = [
    {
      title: "Historic Setting",
      description: "Our sacred space occupies a beautifully preserved Vanderbilt mansion, offering a unique blend of architectural grandeur and intimate worship experience in the heart of Manhattan."
    },
    {
      title: "Episcopal Tradition",
      description: "Rooted in Anglican heritage, we embrace traditional liturgy while welcoming diverse perspectives and modern approaches to faith and community life."
    },
    {
      title: "Open Doors",
      description: "Whether you're exploring faith for the first time or deepening your spiritual journey, our community welcomes you exactly as you are."
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

// Main Component
const HouseRedeemerDemo = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroCarousel />
      <AboutSection />
      
      {/* Demo Notice */}
      <div className="bg-slate-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl mb-4">NextJS + Sanity CMS Architecture Demo</h3>
          <p className="text-slate-300 font-light">
            This component-based structure enables easy content management, better SEO, 
            and eliminates the maintenance issues of monolithic WordPress installations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HouseRedeemerDemo;