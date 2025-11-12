import Link from "next/link";
import Image from "next/image";
import styles from "./fabbri.module.css";

export const metadata = {
  title: "Fabbri Chamber Concerts | House of the Redeemer",
  description:
    "Learn about the Fabbri Chamber Concerts &mdash; an intimate annual series of chamber music performances held in the House of the Redeemer&apos;s historic library since 1999.",
};

export default function FabbriPage() {
  return (
    <main className="container mx-auto px-4 py-12 mt-24 max-w-4xl">
      {/* Hero */}
      <div className="mb-12 relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/fabri-concerts.jpg"
          alt="Fabbri Chamber Concerts at the House of the Redeemer"
          width={1600}
          height={900}
          className="w-full h-[28rem] object-cover object-[60%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent flex items-center">
          <div className="px-8 py-6 text-white max-w-xl">
            <h1 className={`${styles.header} text-3xl mb-3`}>
              Fabbri Chamber Concerts
            </h1>
            <p className="text-white/90 italic leading-relaxed">
              An annual series of intimate performances held in the historic
              library of the House of the Redeemer since 1999.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className={`${styles.body}`}>
        <h2 className={styles.subhead}>Programs &amp; Events</h2>
        <p>
          Often a place of silence and meditation, the House of the Redeemer is
          also a place of music and theatrical performances. Please see the{" "}
          <Link href="/calendar" className="text-slate-800 underline">
            Calendar
          </Link>{" "}
          for information about upcoming programs and events at the House. You
          can buy tickets for our upcoming concerts and performances on{" "}
          <Link
            href="https://www.eventbrite.com/o/house-of-the-redeemer-16945185970"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-800 underline"
          >
            Eventbrite
          </Link>
          .
        </p>

        <h2 className={styles.subhead}>Fabbri Chamber Concerts</h2>
        <p>
          Launched in October 1999, <strong>Fabbri Chamber Concerts</strong>{" "}
          presents an annual series of three concerts at the House of the
          Redeemer, offering exciting and creative programs played by the finest
          artists. Past performances have included the world-renowned artists
          Stanley Drucker, clarinetist; Andre Emelianoff, cellist; and Carol
          Wincenc, flutist.
        </p>

        <p>
          Presented in an ideal chamber music setting, the concerts take place
          in the elegant wood-paneled Italian Renaissance library of the House
          of the Redeemer. This beautiful space with its warm acoustics, the
          brief introductory remarks offered for each piece, and the opportunity
          to meet the artists at a reception following the concert allow
          audiences to share a unique and intimate musical salon experience.
        </p>

        <p>
          The House has been noted by the <em>New York Times</em> as embodying
          &ldquo;the artisanship of a bygone era.&rdquo; The House and its
          library were first opened with a private recital by violinist Fritz
          Kreisler in 1917. Concerts were often performed in the library while
          Mrs. Fabbri was in residence. The Fabbri Chamber Concerts continues
          the musical tradition begun by the Fabbri family.
        </p>
      </section>

      {/* CTA */}
    </main>
  );
}
