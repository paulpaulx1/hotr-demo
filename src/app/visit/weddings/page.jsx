// src/app/visit/weddings/page.jsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Weddings & Special Events | House of the Redeemer",
};

export default function WeddingsPage() {
  return (
    <main className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[750px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 animate-[fadeInBg_1.2s_ease-out_forwards]"
          style={{ backgroundImage: "url('/hosting-events.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/70" />
        <div className="relative z-10 max-w-3xl px-6 text-center opacity-0 translate-y-4 animate-[fadeInUp_1.8s_ease-out_forwards]">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">
            Weddings &amp; Special Events
          </h1>
          <p className="text-lg md:text-xl font-light text-white/90">
            An elegant Italian Renaissance setting for weddings, private
            parties, and celebrations in the heart of New York.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-6 py-16 leading-relaxed text-slate-700">
        <p className="mb-4">
          The House lends itself beautifully to weddings, private parties,
          concerts, and corporate events. Its Italian Renaissance interior is a
          unique setting of elegance and charm, offering an intimate alternative
          to traditional New York venues.
        </p>
        <p className="mb-4">
          The <strong>Library</strong> is noted for its aesthetic appeal and
          fine acoustics, having originally been in a 15th Century Ducal castle
          that was brought to America and installed in the House during the
          First World War. It provides an elegant backdrop for wedding
          ceremonies and receptions. The <strong>Refectory</strong> is perfect
          for formal dinners and distinguished events, while the{" "}
          <strong>Reception Room</strong> offers an intimate setting for smaller
          gatherings in its fine Italian Baroque surroundings.
        </p>
        <p className="mb-6">
          Please see{" "}
          <Link
            href="/facilities"
            className="text-[#6b2f2a] hover:underline font-semibold"
          >
            Spaces &amp; Facilities
          </Link>{" "}
          for more information, and{" "}
          <Link
            href="/contact"
            className="text-[#6b2f2a] hover:underline font-semibold"
          >
            contact us
          </Link>{" "}
          for availability and rates.
        </p>
      </section>

      {/* Sections */}
      <Section
        id="weddings"
        title="Wedding Ceremonies &amp; Receptions"
        text="The House is a perfect setting for weddings with a guest list of 100 or fewer. The chapel on the second floor accommodates up to 30 guests for intimate ceremonies, while the Library provides an elegant backdrop for larger gatherings. The Refectory seats up to 80 for formal dinners, and the courtyard is available for cocktails during warmer months."
        image="/images/library5.jpg"
        reverse={false}
      />
      <Section
        id="private-parties"
        title="Private Parties &amp; Celebrations"
        text="From milestone birthdays to anniversary celebrations, the House offers a distinguished setting for your special occasion. Our historic rooms provide an atmosphere of timeless elegance, while our flexible spaces can accommodate both intimate gatherings and larger celebrations."
        image="/images/courtyard.jpg"
        reverse={true}
      />
      <Section
        id="concerts"
        title="Concerts &amp; Cultural Events"
        text="The Library's exceptional acoustics and historic ambiance make it an ideal venue for musical performances, lectures, and cultural gatherings. The room's Renaissance architecture and intimate scale create an unforgettable experience for both performers and audiences."
        image="/hosting-events.jpg"
        reverse={false}
      />
    </main>
  );
}

// ---- Reusable Section component ----
function Section({ id, title, text, image, reverse }) {
  return (
    <section
      id={id}
      className={`py-20 ${
        reverse ? "bg-slate-50" : "bg-white"
      } scroll-mt-24 border-t border-slate-200`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="md:w-1/2 space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800">
            {title}
          </h2>
          <p className="text-slate-700 leading-relaxed">{text}</p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-[#6b2f2a] text-white rounded-md hover:bg-[#4e1f1a] transition"
            >
              Inquire Now
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="overflow-hidden rounded-xl shadow-md">
            <Image
              src={image}
              alt={title}
              width={800}
              height={600}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
