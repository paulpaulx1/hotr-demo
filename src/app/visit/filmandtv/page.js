import styles from "./FilmAndTv.module.css";

export const revalidate = 3600;

export default async function FilmAndTvPage() {
  return (
    <main className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heading}>Film &amp; Television at the House</h1>
        <p className={styles.heroText}>
          The House of the Redeemer is a historic building on the Upper East
          Side of Manhattan available for film, television, and photography
          projects. Located just off Fifth Avenue and within walking distance of
          Central Park, the House offers a quiet, private setting with multiple
          interior spaces and an enclosed courtyard.
        </p>
      </section>

      {/* Featured Library Image */}
      <section className={styles.libraryShowcase}>
        <div className={styles.imageContainer}>
          <img
            src="/images/Library Filming Page.jpeg"
            alt="Library filming location at House of the Redeemer"
            className={styles.showcaseImage}
          />
          <p className={styles.photoCredit}>Photo by Gary Sapolin</p>
        </div>
        <div className={styles.libraryDescription}>
          <p>
            Productions are often drawn to the House for its distinctive
            two-story, wood-paneled Library, a sought-after setting for
            documentary filming and interviews.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Spaces */}
        <section className={styles.section}>
          <h2>Spaces at the House</h2>
          <p className={styles.sectionIntro}>
            Filming and photo shoots may take place in several areas of the
            House, including:
          </p>
          <ul className={styles.spaceList}>
            <li>
              <strong>Library</strong> – A two-story, wood-paneled library with
              a piano and historic European character
            </li>
            <li>
              <strong>Refectory</strong> – A large room suitable for wider shots
              or group scenes
            </li>
            <li>
              <strong>Reception Room</strong> – A formal salon-style interior
              suitable for smaller scenes or gatherings
            </li>
            <li>
              <strong>Courtyard</strong> – A private outdoor space that can
              provide exterior looks or a controlled outdoor environment
            </li>
          </ul>
        </section>

        {/* Two Column Layout */}
        <div className={styles.twoColumn}>
          <section className={styles.section}>
            <h2>Near Central Park</h2>
            <p>
              Given its proximity to Central Park and Museum Mile, the House of the Redeemer may
              also serve as a base for productions filming nearby. Interior
              rooms and the courtyard can be booked in support of off-site
              shoots, including for holding, catering, and other
              production-related needs.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Working with Productions</h2>
            <p>
              The House of the Redeemer has experience working with filmmakers,
              photographers, and location scouts and is familiar with the
              logistical needs of production teams. We strive to be
              collaborative and flexible while maintaining the integrity and
              daily operations of the House.
            </p>
          </section>
        </div>

        {/* Historic Setting */}
        <section className={styles.section}>
          <h2>Historic Setting</h2>
          <p>
            Constructed between 1914 and 1916 as a private residence, the House
            of the Redeemer was commissioned by Edith Shepard Fabbri, a
            great-granddaughter of Commodore Vanderbilt, and her husband Ernesto
            Fabbri. The building was designated a New York City landmark in
            1974.
          </p>
          <p>
            The House has served as a filming location representing a range of
            settings, including private residences, schools, and diplomatic or
            institutional interiors. The main floor reception and refectory
            rooms offer large, adaptable interior spaces, while the enclosed
            courtyard provides a quiet and visually contained outdoor setting.
          </p>
          <p>
            The Library, originally constructed in the 17th century for the
            Ducal Palace in Urbino, Italy, features vaulted ceilings and
            floor-to-ceiling bookshelves that contribute to its distinctive
            historic character.
          </p>
        </section>

        {/* Inquiries CTA */}
        <section className={styles.inquiriesSection}>
          <h2>Inquiries</h2>
          <p>
            For filming or photography inquiries, please contact{" "}
            <a
              href="mailto:info@houseoftheredeemer.org"
              className={styles.emailLink}
            >
              info@houseoftheredeemer.org
            </a>{" "}
            with details about your project, proposed dates, and spaces of
            interest. We are happy to discuss availability, rates, and
            logistics.
          </p>
        </section>
      </div>
    </main>
  );
}
