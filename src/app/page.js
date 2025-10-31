// src/app/page.js
import HeroCarousel from "./components/home/HeroCarousel";
import ModularBulletinBoard from "./components/bulletinBoard/ModularBulletin";
import QuickLinksGrid from './components/home/QuickLinksGrid';
import { cache } from "react";

// server fetch helper (ISR)
export async function getHeroSlides() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pionkkje";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  const query = `
    *[_type == "carouselItem" && active == true] | order(order asc) {
      _id,
      title,
      description,
      services,
      "imageUrl": coalesce(
        image.asset->url,
        imageUrl
      ) + "?w=1920&fit=crop&auto=format",
      "videoUrl": coalesce(
        video.asset->url,
        videoUrl
      ),
      "posterImageUrl": coalesce(
        posterImage.asset->url,
        posterImageUrl
      ) + "?w=1920&fit=crop&auto=format",
      mediaType
    }
  `;

  const url = `https://${projectId}.apicdn.sanity.io/v2023-10-10/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    next: { revalidate: 86400, tags: ["sanity"] },
  });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = await res.json();

  return Array.isArray(result) ? result : [];
}

export default async function Home() {
  const slides = await getHeroSlides();

  return (
    <main>
      <HeroCarousel slides={slides} /> {/* pass as prop */}
      <QuickLinksGrid />
      <ModularBulletinBoard />
      {/* <CalendarSection /> */}
    </main>
  );
}
