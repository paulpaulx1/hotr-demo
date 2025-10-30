"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import styles from "./GalleryPage.module.css";

export default function GalleryGrid({ images }) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((img) => ({
    src: img.url.replace("?w=800", "?w=1600"),
    title: img.title,
    description: img.description,
  }));

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Gallery</h1>
      <p className={styles.intro}>A look inside and around the House.</p>

      <div className={styles.grid}>
        {images.map((img, i) => (
          <figure
            key={img._id}
            className={styles.card}
            onClick={() => setIndex(i)}
          >
            <div className={styles.thumb}>
              <Image
                src={img.url}
                alt={img.title || "House of the Redeemer"}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={styles.image}
              />
            </div>
          </figure>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Captions, Thumbnails]}
        captions={{
          showToggle: false,
          descriptionTextAlign: "start",
          descriptionMaxLines: 3,
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.9)" },
          slide: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4rem 0", // a little more vertical padding
          },
          image: {
            maxHeight: "80vh", // ⬅️ slightly smaller (was 85vh)
            maxWidth: "88vw",
            objectFit: "contain",
          },
          captionsContainer: {
            backgroundColor: "transparent",
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
            maxWidth: "78vw",
            margin: "0 auto",
          },
          captionsTitle: {
            fontFamily: "Libre Baskerville, serif",
            fontSize: "1.1rem",
            color: "#fff",
            marginBottom: "0.35rem",
          },
          captionsDescription: {
            fontSize: "0.9rem",
            color: "#ccc",
            lineHeight: "1.4",
          },
        }}
      />
    </section>
  );
}
