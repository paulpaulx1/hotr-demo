import styles from "./FilmAndTv.module.css";

export const revalidate = 3600;

async function getFilms() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(`
    *[_type == "film"] | order(year desc) {
      _id,
      title,
      year,
      type,
      description,
      filmingLocation,
      "thumb": images[0].asset->url + "?w=600&auto=format"
    }
  `);

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`,
    { next: { revalidate } }
  );
  const { result } = await res.json();
  return result;
}

export default async function FilmAndTvPage() {
  const films = await getFilms();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Film & Television at the House</h1>
      <p className={styles.intro}>
        Many notable productions have filmed here. The images below depict the
        House itself — not copyrighted promotional materials.
      </p>

      <div className={styles.grid}>
        {films.map((f) => (
          <article key={f._id} className={styles.card}>
            {f.thumb && <img src={f.thumb} alt={f.title} />}
            <div className={styles.text}>
              <h2>{f.title}</h2>
              {f.year && <p className={styles.year}>{f.year}</p>}
              {f.description && <p>{f.description}</p>}
              {f.filmingLocation && (
                <p className={styles.location}>
                  <strong>Filming Location:</strong> {f.filmingLocation}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
