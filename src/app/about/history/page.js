// src/app/about/history/page.jsx
import Image from "next/image";
import Link from "next/link";
import Neighborhood from "./Neighborhood";

export const metadata = {
  title: "History | House of the Redeemer",
  description:
    "Discover the rich history of the House of the Redeemer, a Beaux-Arts townhouse transformed into a sanctuary for reflection, retreat, and renewal.",
};

export default function HistoryPage() {
  return (
    <main className='bg-white text-slate-800'>
      {/* Hero Section */}
      <div className='relative h-[400px] md:h-[750px] overflow-hidden'>
        <Image
          src='/history-hero.jpeg'
          alt='History - House of the Redeemer'
          fill
          className='object-cover object-center'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 w-full'>
            <div className='max-w-2xl text-white'>
              <h1 className='font-serif text-3xl sm:text-4xl md:text-5xl font-medium mb-3 md:mb-4 tracking-wide'>
                History &amp; Neighborhood
              </h1>
              <p className='text-base sm:text-lg md:text-xl text-white/90 leading-relaxed'>
                A Beaux-Arts townhouse transformed into a sanctuary for
                reflection, retreat, and renewal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HISTORY SECTION */}
      <section
        id='history'
        className='max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 leading-relaxed text-slate-700 scroll-mt-24'
      >
        <h2 className='font-serif text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-6 sm:mb-8 md:mb-10'>
          History of the House
        </h2>

        <div className='prose prose-slate max-w-none'>
          {/* Portrait aside - stack on mobile, float on larger screens */}
          <figure className='w-full sm:w-[280px] md:w-[300px] mx-auto sm:float-right sm:ml-6 md:ml-8 mb-6'>
            <Image
              src='/images/house-of-the-redeemer_portrait.jpg'
              alt='Portrait of Edith Shepard Fabbri'
              width={300}
              height={436}
              className='rounded-md shadow-sm w-full h-auto'
            />
            <figcaption className='text-xs sm:text-sm text-slate-500 mt-2 text-center sm:text-left'>
              Portrait of Edith Shepard Fabbri by Benjamin C. Porter, 1895
            </figcaption>
          </figure>

          <p className='text-base sm:text-lg'>
            The House at 7 East 95th Street was built between 1914 and 1916 to
            serve as the town residence of Edith Shepard Fabbri, a
            great-granddaughter of Commodore Cornelius Vanderbilt, and her
            husband, Ernesto Fabbri, an associate of J. Pierpont Morgan. The
            house was designed by Grosvenor Atterbury, an American architect and
            town planner trained at the École des Beaux-Arts in Paris, noted for
            the 1908 restoration of New York&apos;s City Hall. The interior
            decoration, however, was executed by Egisto Fabbri, Ernesto&apos;s
            brother, who incorporated Edith Fabbri&apos;s collection of Italian
            Renaissance and Baroque furnishings and architectural fragments into
            his designs.
          </p>

          <p className='text-base sm:text-lg'>
            The House of the Redeemer&apos;s outstanding architectural feature
            is the library, a treasure built in the 1600s for a ducal palace on
            the outskirts of Urbino, Italy. The library boasts a beautifully
            painted coat of arms, dated 1605–1609, on the vaulted 25-foot-high
            ceiling. There is a monumental fireplace, exquisite paneling, a
            balustrade gallery, and even a secret passageway.
          </p>

          <p className='text-base sm:text-lg'>
            Egisto Fabbri, well versed in the historic aspects of Italian
            architecture, helped design and decorate the House when it was
            built. Whole sections of original wood ceilings and the wood
            paneling of the historic library were transported in two ships from
            Italy through U-boat-infested waters during World War I, and the
            house was designed and constructed to contain them.
          </p>

          <p className='text-base sm:text-lg'>
            The house is L-shaped to accommodate the library in one wing and to
            produce a courtyard and an adjoining but now-lost garden. Entry to
            the house is through tall oak doors. Inner marble steps lead to a
            second set of wrought-iron doors which open into the entrance hall.
            The design and position of the grand stone stairway, the earth-tone
            tile floors, and the patina on the wood tables and benches offer an
            astonishing sense of space, security, and simplicity. To the right
            lies a reception room with a coffered ceiling, and here hangs the
            portrait of Mrs. Fabbri. Opposite is the dining room, with a vaulted
            ceiling, stone fireplace, and space to seat eighty guests
            comfortably. The chapel on the second floor has another example of a
            coffered ceiling and leaded windows given in 1985 as a memorial.
          </p>

          {/* Chapel photo aside - stack on mobile, float on larger screens */}
          <figure className='w-full sm:w-[280px] md:w-[300px] mx-auto sm:float-left sm:mr-6 md:mr-8 mt-4 mb-6 clear-both sm:clear-none'>
            <Image
              src='/images/house-of-the-redeemer_sisters-in-chapel.jpg'
              alt='The Sisters of St. Mary and guests in the chapel'
              width={300}
              height={464}
              className='rounded-md shadow-sm w-full h-auto'
            />
            <figcaption className='text-xs sm:text-sm text-slate-500 mt-2 text-center sm:text-left'>
              The Sisters of St. Mary and guests in the chapel
            </figcaption>
          </figure>

          <p className='text-base sm:text-lg'>
            In 1949, inspired by a sermon preached by the Rt. Rev. Austin Pardue
            on the necessity of silence and prayer in the spiritual life, Edith
            Fabbri deeded the building to a board of trustees under the auspices
            of the Episcopal Church to be used as a religious retreat house
            under the name <em>House of the Redeemer</em>. A new corporation by
            that name was formed to receive the gift of her house and administer
            it as a &quot;place apart.&quot; The Rt. Rev. Charles K. Gilbert,
            Bishop of New York, was the first president of the board of
            trustees. A year later, Bishop Horace W. B. Donegan succeeded him
            and remained president until his death in 1991.
          </p>

          <p className='text-base sm:text-lg'>
            The house was operated by Episcopal nuns — the Sisters of St. Mary —
            from 1949 until 1980, when the first residential Warden was
            appointed to oversee the House&apos;s daily life. It was designated
            a New York City Landmark in 1974 and is now considered one of the
            finest examples of early twentieth-century residential architecture
            in the city.
          </p>

          <p className='text-base sm:text-lg'>
            Today, the House is guided by a Board of Trustees, with Episcopal
            priests-in-residence providing spiritual care. Daily operations are
            overseen by the House Manager and staff. Board Member Percy
            Preston&apos;s book <em>A Place Apart</em> is available for purchase
            at the House.
          </p>
        </div>
      </section>

      {/* NEIGHBORHOOD */}
      <Neighborhood />
    </main>
  );
}
