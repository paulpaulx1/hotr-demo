"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

export default function GalleryGrid({ images }) {
  const [index, setIndex] = useState(-1);

  // --- Group by category ---
  const grouped = images.reduce((acc, img) => {
    const cat = img.category || "Other";
    (acc[cat] ||= []).push(img);
    return acc;
  }, {});

  // --- Flatten for Lightbox ---
  const slides = images.map((img) => ({
    src: img.url.replace("?w=800", "?w=1600"),
    title: img.title,
    description: img.description,
  }));

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-slate-800 mb-3">
            Gallery
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A look inside and around the House — a living landmark of art,
            architecture, and community.
          </p>
        </header>

        {/* Category Sections */}
        {Object.entries(grouped).map(([category, group]) => (
          <section key={category} className="mb-20">
            {/* Centered H2 */}
            <div className="flex justify-center mb-10">
              <h2 className="font-serif text-2xl text-slate-800 border-b border-slate-200 pb-2 inline-block text-center">
                {category}
              </h2>
            </div>

            {/* Fixed-size, centered grid */}
            <div
              className="grid justify-center gap-4"
              style={{
                gridTemplateColumns:
                  group.length === 1
                    ? "repeat(1, 360px)"
                    : "repeat(auto-fit, 360px)",
                gridAutoRows: "360px",
                justifyContent: "center",
              }}
            >
              {group.map((img) => {
                const globalIndex = images.findIndex((x) => x._id === img._id);
                return (
                  <figure
                    key={img._id}
                    className="cursor-pointer group relative overflow-hidden rounded-md bg-slate-100 w-[360px] h-[360px]"
                    onClick={() => setIndex(globalIndex)}
                  >
                    <Image
                      src={img.url}
                      alt={img.title || "Gallery image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {img.title && (
                      <figcaption className="absolute bottom-0 left-0 w-full text-center text-white text-sm bg-black/40 py-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
                        {img.title}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Thumbnails, Captions]}
        captions={{
          showToggle: false,
          descriptionTextAlign: "start",
          descriptionMaxLines: 3,
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.9)" },
          slide: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 0",
          },
          image: {
            maxHeight: "80vh",
            maxWidth: "85vw",
            objectFit: "contain",
          },
          captionsContainer: {
            backgroundColor: "transparent",
            paddingTop: "1rem",
          },
          captionsTitle: {
            fontFamily: "Libre Baskerville, serif",
            fontSize: "1.1rem",
            color: "#fff",
          },
          captionsDescription: {
            fontSize: "0.9rem",
            color: "#ccc",
          },
        }}
      />
    </section>
  );
}
