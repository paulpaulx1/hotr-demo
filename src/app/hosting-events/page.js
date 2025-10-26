import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Your Retreat or Event at the House | House of the Redeemer",
  description:
    "Host retreats, meetings, weddings, and special events in the serene setting of the House of the Redeemer — a place apart.",
};

export default function HostingEventsPage() {
  const sections = [
    {
      id: "retreats",
      title: "Retreats",
      text: (
        <>
          <p>
            House of the Redeemer is dedicated to providing peace and serenity for those who seek
            “a place apart” — the designation given to it by its donor, Edith Fabbri. The House
            offers unique spaces for all faiths, for prayer, meditation, and spiritual renewal.
            We welcome all to experience the unique tranquility here.
          </p>
        </>
      ),
      image: "/images/dining3.jpg",
      flip: false,
    },
    {
      id: "nonprofits",
      title: "Non-profits",
      text: (
        <>
          <p>
            The House is ideal as a venue for organizations’ special events or meetings. As part
            of the mission of The House of the Redeemer, we offer reduced rates to church groups
            and non-profits.
          </p>
          <p>
            Please see{" "}
            <Link href="/about/facilities">
              <span className="underline decoration-[#6b2f2a]/40 hover:decoration-[#6b2f2a]">
                Spaces & Facilities
              </span>
            </Link>{" "}
            for more information, and contact us via our{" "}
            <Link href="/contact">
              <span className="underline decoration-[#6b2f2a]/40 hover:decoration-[#6b2f2a]">
                Contact & Inquiries
              </span>
            </Link>{" "}
            form.
          </p>
        </>
      ),
      image: "/images/library5.jpg",
      flip: true,
    },
    {
      id: "weddings",
      title: "Weddings & Special Events",
      text: (
        <>
          <p>
            The House is a perfect location for weddings with a guest list of 100 or less. Our
            chapel on the second floor can hold up to 30 people for intimate ceremonies. For
            larger weddings, the Library provides a stunning backdrop and can seat up to 100.
            The outside courtyard is available for cocktails during warmer months, and the
            Refectory accommodates 80 for a seated formal dinner.
          </p>
          <p>
            Take a look at our{" "}
            <Link href="/about/facilities">
              <span className="underline decoration-[#6b2f2a]/40 hover:decoration-[#6b2f2a]">
                Spaces & Facilities
              </span>
            </Link>{" "}
            for more information on what the House can offer, or{" "}
            <Link href="/contact">
              <span className="underline decoration-[#6b2f2a]/40 hover:decoration-[#6b2f2a]">
                Contact Us
              </span>
            </Link>{" "}
            for availability and pricing.
          </p>
        </>
      ),
      image: "/images/courtyard.jpg",
      flip: false,
    },
  ];

  return (
    <main className="bg-[#f8f5ef] text-gray-800 py-12">
      {/* --- Intro Section --- */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-serif text-[#6b2f2a] mb-6">
          Your Retreat or Event at the House
        </h1>

        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            The House lends itself well to retreats for all faiths, meetings, concerts, private
            parties, wedding receptions, and non-profit or corporate events. Its Italian
            Renaissance interior is a unique setting of elegance and charm.
          </p>
          <p>
            The <strong>Reception Room</strong> is ideal for smaller meetings and parties. The{" "}
            <strong>Refectory</strong> is the perfect place for a distinguished event. The{" "}
            <strong>Library</strong> is noted for its fine acoustics for musical events, lectures,
            and wedding receptions.
          </p>
          <p>
            Please see{" "}
            <Link href="/about/facilities">
              <span className="underline decoration-[#6b2f2a]/40 hover:decoration-[#6b2f2a]">
                Spaces & Facilities
              </span>
            </Link>{" "}
            for more information, and{" "}
            <Link href="/contact">
              <span className="underline decoration-[#6b2f2a]/40 hover:decoration-[#6b2f2a]">
                contact us for information about rates
              </span>
            </Link>
            . Reduced rates are available for churches and non-profits.
          </p>
        </div>
      </section>

      {/* --- Burgundy Divider --- */}
      <div className="border-t border-[#6b2f2a]/30" />

      {/* --- Alternating Sections --- */}
      {sections.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          className={`max-w-6xl mx-auto px-6 py-16 flex flex-col ${
            s.flip ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-10 ${
            idx % 2 === 0 ? "bg-[#faf8f4]" : "bg-[#f7f3ee]"
          } transition-colors`}
        >
          {/* Text block */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-serif text-[#6b2f2a] mb-4">{s.title}</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">{s.text}</div>
          </div>

          {/* Image block */}
          <div className="md:w-1/2">
            <Image
              src={s.image}
              alt={s.title}
              width={1080}
              height={720}
              className="rounded-xl shadow-md object-cover"
              priority={idx === 0}
            />
          </div>
        </section>
      ))}
    </main>
  );
}
