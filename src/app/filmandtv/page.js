import styles from "./FilmAndTv.module.css";

export const revalidate = 3600;

async function getFilms() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(`
    *[_type == "film"] | order(coalesce(order, 1000), year desc) {
      _id,
      title,
      year,
      type,
      order,
      description,
      filmingLocation,
      notableDetails,
      imdbUrl,
      "thumb": images[0].asset->url + "?w=1200&auto=format"
    }
  `);

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2023-10-10/data/query/${dataset}?query=${query}`,
    { next: { revalidate } }
  );
  const { result } = await res.json();
  return result || [];
}

export default async function FilmAndTvPage() {
  const films = await getFilms();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Film &amp; Television at the House</h1>
      {/* <p className={styles.intro}>
        Many notable productions have filmed here. 
      </p> */}

      <div className={styles.grid}>
        {films.map((f) => {
          const hasImage = Boolean(f.thumb);
          return (
            <article
              key={f._id}
              className={`${styles.card} ${!hasImage ? styles.noImage : ""}`}
            >
              {hasImage && (
                <figure className={styles.image}>
                  <img
                    className={styles.imageEl}
                    src={f.thumb}
                    alt={`Filming location for ${f.title}`}
                    loading="lazy"
                  />
                </figure>
              )}

              <div className={styles.text}>
                <h2>{f.title}</h2>
                {f.year ? <p className={styles.year}>{f.year}</p> : null}

                {f.description ? (
                  <p className={styles.description}>{f.description}</p>
                ) : null}

                {f.filmingLocation ? (
                  <p className={styles.location}>
                    <strong>Filming Location:</strong> {f.filmingLocation}
                  </p>
                ) : null}

                {f.notableDetails ? (
                  <p className={styles.notes}>
                    <strong>Notes:</strong> {f.notableDetails}
                  </p>
                ) : null}
                {f.imdbUrl && (
                  <p className={styles.external}>
                    <a
                      href={f.imdbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      View on IMDb ↗
                    </a>
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
