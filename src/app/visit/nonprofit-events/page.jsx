// src/app/visit/nonprofit-events/page.jsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Non-Profit Events & Retreats | House of the Redeemer",
};

export default function NonProfitEventsPage() {
  return (
    <main className='bg-white text-slate-800'>
      {/* Hero Section */}
      <section className='relative h-[400px] md:h-[750px] flex items-center justify-center overflow-hidden bg-slate-900 text-white'>
        <div
          className='absolute inset-0 bg-cover bg-center opacity-0 animate-[fadeInBg_1.2s_ease-out_forwards]'
          style={{ backgroundImage: "url('/images/visiting-room.jpg')" }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/70' />
        <div className='relative z-10 max-w-3xl px-6 text-center opacity-0 translate-y-4 animate-[fadeInUp_1.8s_ease-out_forwards]'>
          <h1 className='font-serif text-5xl md:text-6xl mb-4'>
            Retreats &amp; Non-Profit Events
          </h1>
          <p className='text-lg md:text-xl font-light text-white/90'>
            A serene setting for spiritual retreats, church gatherings, and
            non-profit meetings — a place apart in the heart of New York.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className='max-w-4xl mx-auto px-6 py-16 leading-relaxed text-slate-700'>
        <p className='mb-4'>
          The House lends itself well to retreats for all faiths, breakfast
          meetings, concerts, and non-profit or church events. Its Italian
          Renaissance interior is a unique setting of elegance and charm.
        </p>
        <p className='mb-4'>
          The <strong>Reception Room</strong> is ideal for smaller meetings; its
          appeal is its intimate setting in the fine Italian Baroque
          surroundings. The <strong>Refectory</strong> is the perfect place to
          hold a distinguished event, and is available for lunches, dinners,
          meetings, and gatherings. The <strong>Library</strong> is noted for
          its aesthetic appeal and fine acoustics for musical events, lectures,
          and spiritual programs.
        </p>
        <p className='mb-6'>
          Please see{' '}
          <Link
            href='/facilities'
            className='text-[#6b2f2a] hover:underline font-semibold'
          >
            Spaces &amp; Facilities
          </Link>{' '}
          for more information, and{' '}
          <Link
            href='/contact'
            className='text-[#6b2f2a] hover:underline font-semibold'
          >
            contact us
          </Link>{' '}
          for availability and rates. <strong>Reduced rates are available for
          churches and non-profit organizations.</strong>
        </p>
      </section>

      {/* Sections */}
      <Section
        id='retreats'
        title='Spiritual Retreats'
        text='House of the Redeemer is dedicated to providing peace and serenity for those who seek "a place apart" — the designation given to it by its donor, Edith Fabbri. The House offers unique spaces for all faiths, for prayer, meditation, and spiritual renewal. We welcome all to experience the unique tranquility here.'
        image='/images/visiting-room.jpg'
        reverse={false}
      />
      <Section
        id='nonprofits'
        title='Church Groups &amp; Non-Profit Organizations'
        text='The House is ideal as a venue for organizations special events or meetings. As part of the mission of The House of the Redeemer, we offer reduced rates to church groups and non-profits. The Reception Room, Refectory, and Library are available for gatherings of various sizes.'
        image='/images/library5.jpg'
        reverse={true}
      />
      <Section
        id='meetings'
        title='Meetings &amp; Conferences'
        text='Our historic spaces provide an inspiring backdrop for board meetings, conferences, and organizational gatherings. The intimate atmosphere encourages meaningful dialogue and connection, while our professional facilities ensure your event runs smoothly.'
        image='/images/courtyard.jpg'
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