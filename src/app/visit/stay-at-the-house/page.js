import Image from "next/image";

export const metadata = {
  title: "Stay at the House | House of the Redeemer",
  description:
    "Information about overnight guest rooms, booking requirements, and rates for visitors staying at the House of the Redeemer.",
};

export default function StayAtTheHousePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[750px] overflow-hidden">
        <Image
          src="/images/visiting-room.jpg"
          alt="Guest rooms at the House of the Redeemer"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6 text-white">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4 tracking-wide">
              Stay at the House
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Overnight guest rooms and booking information for visitors of the
              House of the Redeemer.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-slate-700 leading-relaxed">
            The House of the Redeemer welcomes guests for short-term stays who
            are visiting New York City for <strong>retreat</strong>,{" "}
            <strong>nonprofit or charitable work</strong>, or{" "}
            <strong>medical treatment</strong>. The House is not available for
            tourism-related visits.
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-[#fbf9f7] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-medium text-[#6b2f2a] mb-6 text-center">
            Booking Information
          </h2>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Once you&rsquo;ve reviewed our booking and check-in requirements
            (below) and decide to pursue a booking, please call the office
            directly at{" "}
            <a
              href="tel:2122890399"
              className="text-[#6b2f2a] hover:underline"
            >
              (212) 289-0399
            </a>{" "}
            to place a deposit and secure a room.
          </p>
          <p className="text-slate-700 mb-6 leading-relaxed">
            We suggest that new inquirers check our website &mdash; including
            the{" "}
            <a href="/faq" className="text-[#6b2f2a] hover:underline">
              FAQ section
            </a>{" "}
            &mdash; to learn more about the House and its mission.
          </p>
        </div>
      </div>

      {/* Guest Requirements */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-medium text-[#6b2f2a] mb-6 text-center">
            Guest Requirements
          </h2>
          <ul className="text-slate-700 space-y-3 leading-relaxed list-disc list-inside">
            <li>Arrivals must be between 10 am &ndash; 5 pm, Monday&ndash;Friday.</li>
            <li>Guests must be able to walk stairs with ease.</li>
            <li>No guests under 16 years of age.</li>
            <li>The House cannot accept package deliveries for guests.</li>
            <li>The House does not have central air-conditioning.</li>
          </ul>
        </div>
      </div>

      {/* Deposits & Rates */}
      <div className="bg-[#fbf9f7] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-medium text-[#6b2f2a] mb-6 text-center">
            Deposits &amp; Payments
          </h2>
          <p className="text-slate-700 mb-4 leading-relaxed">
            A <strong>25% deposit</strong> is required upon making a reservation,
            with the balance due upon check-in. The deposit is{" "}
            <strong>non-refundable and non-transferable</strong>.
          </p>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Effective <strong>January 2, 2026</strong>, room rates will be:
          </p>
          <ul className="text-slate-700 mb-4 space-y-2 leading-relaxed">
            <li>Single &ndash; shared bath &middot; $155 per night</li>
            <li>Single &ndash; private bath &middot; $170 per night</li>
            <li>Double &ndash; shared bath &middot; $185 per night</li>
            <li>Double &ndash; private bath &middot; $210 per night</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            A <strong>3% surcharge</strong> applies to all credit card
            transactions. Wire transfers incur an <strong>$18 fee</strong>.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl font-medium text-[#6b2f2a] mb-4">
            Contact the House
          </h3>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Please email{" "}
            <a
              href="mailto:info@houseoftheredeemer.org"
              className="text-[#6b2f2a] hover:underline"
            >
              info@houseoftheredeemer.org
            </a>{" "}
            or call{" "}
            <a
              href="tel:2122890399"
              className="text-[#6b2f2a] hover:underline"
            >
              (212) 289-0399
            </a>{" "}
            for booking inquiries.
          </p>
          <p className="text-slate-500 italic">&mdash; House Staff</p>
        </div>
      </div>
    </main>
  );
}
