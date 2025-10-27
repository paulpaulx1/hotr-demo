import styles from "./Neighborhood.module.css";

export default function Neighborhood() {
  return (
    <section
      id="neighborhood"
      className={`bg-slate-50 border-t border-slate-200 py-20 scroll-mt-24 ${styles.neighborhoodSection}`}
    >
      <div className="max-w-5xl mx-auto px-6 leading-relaxed text-slate-700">
        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-10">
          Carnegie Hill Neighborhood
        </h2>

        <div className={`prose prose-slate max-w-none ${styles.textBlock}`}>
          <p>
            Located in the historic <strong>Carnegie Hill District</strong> on
            the Upper East Side of Manhattan, the House is on &quot;Museum
            Mile,&quot; within walking distance of major museums and arts
            institutions, dozens of churches and synagogues, and more. The House
            is near{" "}
            <a
              href="https://www.centralparknyc.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Central Park
            </a>
            , a stone&apos;s throw from Madison Avenue shops and restaurants, and
            close to public transportation.
          </p>

          {/* --- Museums --- */}
          <h3 className={styles.subheading}>Museums</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.elmuseo.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                El Museo del Barrio
              </a>
            </li>
            <li>
              <a
                href="https://www.mcny.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Museum of the City of New York
              </a>
            </li>
            <li>
              <a
                href="https://thejewishmuseum.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                The Jewish Museum
              </a>
            </li>
            <li>
              <a
                href="https://www.cooperhewitt.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Cooper Hewitt, Smithsonian Design Museum
              </a>
            </li>
            <li>
              <a
                href="https://www.guggenheim.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Solomon R. Guggenheim Museum
              </a>
            </li>
            <li>
              <a
                href="https://www.neuegalerie.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Neue Galerie New York
              </a>
            </li>
            <li>
              <a
                href="https://www.metmuseum.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                The Metropolitan Museum of Art
              </a>
            </li>
          </ul>

          {/* --- Churches, Synagogues, etc --- */}
          <h3 className={styles.subheading}>
            Churches, Synagogues, Mosques, and Temples
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://churchoftheheavenlyrest.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Church of the Heavenly Rest (Episcopal)
              </a>
            </li>
            <li>
              <a
                href="https://stjames.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                St. James&apos; Church (Episcopal)
              </a>
            </li>
            <li>
              <a
                href="https://www.stjohndivine.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Cathedral of St. John the Divine (Episcopal)
              </a>
            </li>
            <li>
              <a
                href="https://www.saintignatiusloyola.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                St. Ignatius Loyola (Catholic)
              </a>
            </li>
            <li>
              <a
                href="https://christchurchnyc.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Christ Church Anglican NYC
              </a>
            </li>
            <li>
              <a
                href="https://pasyn.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Park Avenue Synagogue
              </a>
            </li>
            <li>
              <a
                href="https://icc-ny.us"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Islamic Cultural Center of New York
              </a>
            </li>
            <li>
              <a
                href="https://zenstudies.org/zen-center-of-new-york-city/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Zen Buddhist Temple
              </a>
            </li>
          </ul>

          {/* --- Restaurants --- */}
          <h3 className={styles.subheading}>Neighborhood Restaurants</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://bluestonelane.com/cafes/86th-street-upper-east-side/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Bluestone Lane (Caf&eacute;)
              </a>
            </li>
            <li>
              <a
                href="https://dacaponyc.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Da Capo (Italian)
              </a>
            </li>
            <li>
              <a
                href="https://www.dailyprovisionsnyc.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Daily Provisions (Coffee &amp; Sandwiches)
              </a>
            </li>
            <li>
              <a
                href="https://www.islandnyc.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Island (Americana)
              </a>
            </li>
            <li>
              <a
                href="https://www.pascalourestaurant.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Pascalou (French)
              </a>
            </li>
            <li>
              <a
                href="https://paolasnyc.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Paola&apos;s Osteria
              </a>
            </li>
            <li>
              <a
                href="https://www.tabledhote.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Table d&apos;Hote (French Bistro)
              </a>
            </li>
            <li>
              <a
                href="https://www.yuranyc.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Yura (Caf&eacute;)
              </a>
            </li>
          </ul>

          <p className="mt-8">
            Within this serene neighborhood, the House of the Redeemer continues
            to offer its mission of quiet hospitality &mdash; a &quot;place
            apart&quot; where heritage, faith, and the rhythms of city life meet.
          </p>
        </div>
      </div>
    </section>
  );
}
