import styles from "./GalleryPage.module.css";

export const revalidate = 3600; // Rebuild every hour

async function getGalleryImages() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(`
    *[_type == "galleryImage"] | order(_createdAt desc) {
      _id,
      title,
      description,
      "url": image.asset->url
    }
  `);

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`,
    { next: { revalidate } }
  );

  if (!res.ok) throw new Error("Failed to fetch gallery images");
  const { result } = await res.json();
  console.log('result',result);
  return result;
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.heading}>Gallery</h1>
        <p className={styles.intro}>
          A look inside and around the House of the Redeemer.
        </p>

        <div className={styles.grid}>
          {images.map((img) => (
            <figure key={img._id} className={styles.card}>
              <img src={img.url} alt={img.title || "House of the Redeemer"} />
              {img.title && (
                <figcaption className={styles.caption}>
                  <strong>{img.title}</strong>
                  {img.description && <span>{img.description}</span>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
