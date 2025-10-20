// src/app/page.js
import HeroCarousel from './components/home/HeroCarousel';
// import AboutSection from '/components/home/AboutSection';
// import SEOInfoSection from '/components/home/SEOInfoSection'; // Or remove for production

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      {/* <AboutSection /> */}
      {/* Remove the SEO info section for production if desired */}
      {/* <SEOInfoSection /> */}
    </main>
  );
}