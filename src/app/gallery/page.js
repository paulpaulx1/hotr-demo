import styles from "./GalleryPage.module.css";
import GalleryGrid from "./GalleryGrid";

export const revalidate = 3600;

async function getGalleryImages() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(`
    *[_type == "galleryImage"] | order(_createdAt desc) {
      _id,
      title,
      description,
      category,
      "url": image.asset->url + "?w=800&auto=format"
    }
  `);

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`,
    { next: { revalidate } }
  );
  const { result } = await res.json();
  return result;
}

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return (
    <main className={styles.wrapper}>
      <GalleryGrid images={images} />
    </main>
  );
}
