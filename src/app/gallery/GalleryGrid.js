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
  console.log("images", images);
  // Group images by category
  const grouped = images.reduce((acc, img) => {
    const cat = img.category || "Other";
    (acc[cat] ||= []).push(img);
    return acc;
  }, {});

  // Flatten all slides for the lightbox
  const slides = images.map((img) => ({
    src: img.url.replace("?w=800", "?w=1600"),
    title: img.title,
    description: img.description,
  }));

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-slate-800 mb-3">
            Gallery
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A look inside and around the House — a living landmark of art,
            architecture, and community.
          </p>
        </header>

        {Object.entries(grouped).map(([category, group]) => (
          <section key={category} className="mb-16">
            <h2 className="font-serif text-2xl text-slate-800 mb-6 border-b border-slate-200 pb-2">
              {category}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {group.map((img, i) => {
                // Compute absolute index for the lightbox
                const globalIndex = images.findIndex((x) => x._id === img._id);
                return (
                  <figure
                    key={img._id}
                    className="cursor-pointer group"
                    onClick={() => setIndex(globalIndex)}
                  >
                    <div className="overflow-hidden rounded-md bg-slate-100 aspect-square">
                      <Image
                        src={img.url}
                        alt={img.title || "Gallery image"}
                        width={600}
                        height={600}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {img.title && (
                      <figcaption className="mt-2 text-center text-slate-700 font-serif text-base">
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

      {/* Universal lightbox for all images */}
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
            maxHeight: "80vh", // 👈 shrink slightly again (was larger)
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
