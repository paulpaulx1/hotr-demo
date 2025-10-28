import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Worship | House of the Redeemer",
  description:
    "A serene chapel offering prayer, reflection, and sacred gatherings at the historic House of the Redeemer in New York City.",
};

export default function WorshipPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      {/* ---------- Hero Section ---------- */}
      <section className="relative min-h-[60vh] bg-slate-900 overflow-hidden flex items-center justify-center pt-24">

        {/* Background image fades in */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 animate-[fadeInBg_1.2s_ease-out_forwards]"
          style={{ backgroundImage: `url('/images/house-of-the-redeemer_chapel2.jpg')` }}
        />

        {/* Overlay gradient fades in slightly after */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-900/70 opacity-0 animate-[fadeInBg_1.6s_ease-out_forwards]" />

        {/* Text content (now truly vertically centered) */}
        <div className="relative z-10 flex items-center justify-center h-[60vh] min-h-[480px] text-center text-white px-6 opacity-0 translate-y-4 animate-[fadeInUp_1.8s_ease-out_forwards]">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl mb-4 tracking-wide">
              Worship
            </h1>
            <p className="text-lg md:text-xl font-light text-white/90">
              A quiet space for reflection, prayer, and spiritual renewal in the
              heart of the city.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Main Content ---------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <h2 className="font-serif text-3xl text-slate-900 mb-8">
              A Place for Quiet Reflection
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Offering a unique space conducive to spiritual refreshment and
              meditation, the House of the Redeemer provides the public with the
              opportunity to worship in a place that is serene and tranquil,
              allowing those in need of quiet reflection to find spiritual
              peace.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              Worship takes place in the chapel, a room which once served as
              Edith Fabbri’s Drawing Room, and which has its own historical and
              architectural significance. The chapel is open for prayer and
              meditation. Every weekday from mid-September to June, a
              priest-in-residence leads Morning and Evening Prayer.
            </p>

            <blockquote className="italic border-l-4 border-slate-300 pl-4 text-slate-600 mt-8">
              “Originally Edith Fabbri’s Drawing Room, the chapel retains its
              Renaissance ceiling and 18th-century altar.”
            </blockquote>
          </div>

          {/* Right Column */}
          <aside className="bg-white shadow-sm rounded-xl border border-slate-200 p-8 self-start">
            <h3 className="font-serif text-2xl text-slate-900 mb-3">
              Religious Offerings
            </h3>
            <p className="text-slate-600 italic mb-6">
              During the season, September through June
            </p>

            <ul className="space-y-6 text-slate-700">
              <li>
                <strong className="block text-slate-900">
                  Morning and Evening Prayer
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  Monday through Friday, 8 AM and 5:30 PM.
                  <br />
                  <span className="italic">
                    Eucharist on Tuesday evening and Thursday morning.
                  </span>
                </p>
              </li>
            </ul>

            <p className="text-slate-500 text-sm mt-8">
              Please note: there are no services in the Chapel during July and
              August.
            </p>
          </aside>
        </div>
      </section>

      {/* ---------- Optional CTA Section ---------- */}
      <section className="bg-slate-100 py-20 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-6">
            Visit the Chapel
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether for a moment of stillness, participation in prayer, or a
            quiet visit to reflect, the Chapel of the Redeemer is open to all.
          </p>
          <Link
            href="/visit/faq"
            className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-md tracking-wide transition-all duration-300"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>
    </main>
  );
}
