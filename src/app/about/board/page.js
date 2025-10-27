import Image from "next/image";

export const metadata = {
  title: "Board of Trustees & Staff | House of the Redeemer",
  description:
    "Meet the Board of Trustees and Staff of the House of the Redeemer who guide our mission and operations.",
};

export default function BoardPage() {
  const trustees = [
    { name: "Percy Preston, Jr.", role: "President" },
    { name: "Alicia Benoist", role: null },
    { name: "The Rt. Rev'd. Andrew ML Dietsche", role: null },
    { name: "Robert Edgar", role: null },
    { name: "Margaret German", role: "Vice President" },
    { name: "Joanna Griner-Cawley", role: null },
    { name: "The Rt. Rev'd Matthew Heyd", role: null },
    { name: "Frederic K. Howard", role: null },
    { name: "Emily R. Kahn", role: null },
    { name: "Adam MacDonald", role: null },
    { name: "Robert Mitchell", role: null },
    { name: "Ursula Moran", role: null },
    { name: "Bettina Nelson", role: null },
    { name: "Frances R. Olivieri", role: "Vice President" },
    { name: "David L. Rowe", role: "Treasurer" },
    { name: "Leslie Rupert", role: null },
    { name: "The Rt. Rev'd. Andrew St. John", role: null },
    { name: "Nancy Treuhold", role: "Secretary" },
  ];

  const trusteesEmeritus = [
    { name: "Henry R. Garner, Jr.", role: "Trustee Emeritus" },
    { name: "The Rev'd. Dr. Adam Dunbar McCoy, OHC", role: "Trustee Emeritus" },
    { name: "Patricia Ranson", role: "Trustee Emeritus" },
    { name: "Janet Robertson", role: "Trustee Emeritus" },
  ];

  const staff = [
    { name: "Natasha Donnelly", role: "Executive Director" },
    { name: "Suzanne Martinucci", role: "Office Administrator" },
    { name: "Moumen Haffar", role: "Asst. Operations Manager" },
  ];

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[400px] md:h-[750px] overflow-hidden'>
        <Image
          src='/board-hero.jpg' // Replace with your actual hero image
          alt='Board of Trustees & Staff - House of the Redeemer'
          fill
          className='object-cover object-center'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center'>
          <div className='max-w-7xl mx-auto px-6 w-full'>
            <div className='max-w-2xl text-white'>
              <h1 className='font-serif text-4xl md:text-5xl font-medium mb-4 tracking-wide'>
                Board of Trustees & Staff
              </h1>
              <p className='text-lg md:text-xl text-white/90 leading-relaxed'>
                Meet the dedicated individuals who guide our mission and
                operations at the House of the Redeemer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Board of Trustees Section */}
      <div className='bg-slate-50 py-16'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            <h2 className='font-serif text-3xl font-medium text-[#6b2f2a] mb-8 pb-3 border-b-2 border-slate-200 text-center'>
              Trustees
            </h2>

            {/* Officers - Featured */}
            <div className='mb-10'>
              <h3 className='text-lg font-medium text-slate-900 mb-4'>
                Officers
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {trustees
                  .filter((trustee) => trustee.role)
                  .map((trustee, index) => (
                    <div
                      key={index}
                      className='bg-white p-5 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] transition-colors'
                    >
                      <h4 className='font-medium text-slate-900 text-lg mb-1'>
                        {trustee.name}
                      </h4>
                      <p className='text-[#6b2f2a] text-sm font-medium'>
                        {trustee.role}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Regular Trustees */}
            <div>
              <h3 className='text-lg font-medium text-slate-900 mb-4'>
                Members
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {trustees
                  .filter((trustee) => !trustee.role)
                  .map((trustee, index) => (
                    <div
                      key={index}
                      className='bg-white p-4 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] transition-colors'
                    >
                      <p className='font-medium text-slate-900'>
                        {trustee.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trustees Emeritus Section */}
      <div className='bg-[#fbf9f7] py-16'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='bg-white rounded-lg shadow-lg p-8 md:p-12'>
            <h2 className='font-serif text-3xl font-medium text-[#6b2f2a] mb-8 pb-3 border-b-2 border-slate-200 text-center'>
              Trustees Emeritus
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {trusteesEmeritus.map((trustee, index) => (
                <div
                  key={index}
                  className='bg-slate-50 p-5 rounded-md shadow-sm border border-slate-200'
                >
                  <h4 className='font-medium text-slate-900 text-lg mb-1'>
                    {trustee.name}
                  </h4>
                  <p className='text-slate-600 text-sm'>{trustee.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff Section */}
      <div className='bg-slate-50 py-16'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            <h2 className='font-serif text-3xl font-medium text-[#6b2f2a] mb-8 pb-3 border-b-2 border-slate-200 text-center'>
              Staff
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {staff.map((member, index) => (
                <div
                  key={index}
                  className='bg-white p-6 rounded-md shadow-sm border border-slate-200 hover:border-[#6b2f2a] transition-colors text-center'
                >
                  <div className='w-16 h-16 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <h4 className='font-medium text-slate-900 text-lg mb-1'>
                    {member.name}
                  </h4>
                  <p className='text-[#6b2f2a] text-sm font-medium'>
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className='bg-[#fbf9f7] py-16'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <h3 className='font-serif text-2xl font-medium text-[#6b2f2a] mb-4'>
            Get in Touch
          </h3>
          <p className='text-slate-600 mb-6'>
            Have questions or want to learn more about supporting our mission?
            We'd love to hear from you.
          </p>
          <a
            href='/contact'
            className='inline-block bg-[#6b2f2a] hover:bg-[#4e1f1a] text-white font-medium py-3 px-8 rounded-md transition-colors'
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
