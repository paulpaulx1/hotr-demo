// src/app/page.js
import HeroCarousel from './components/home/HeroCarousel';
import EventsCalendar from './components/events/Calendar'
import CalendarSection from './components/events/CalendarSection';

// import AboutSection from '/components/home/AboutSection';
// import SEOInfoSection from '/components/home/SEOInfoSection'; // Or remove for production

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <CalendarSection />
      {/* <AboutSection /> */}
      {/* Remove the SEO info section for production if desired */}
      {/* <SEOInfoSection /> */}
    </main>
  );
}