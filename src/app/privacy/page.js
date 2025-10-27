import Image from "next/image";

export const metadata = {
  title: "Privacy Policy | House of the Redeemer",
  description:
    "Learn about how House of the Redeemer collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[400px] md:h-[750px] overflow-hidden'>
        <Image
          src='/privacy-hero.jpg' // Replace with your actual hero image
          alt='Privacy Policy - House of the Redeemer'
          fill
          className='object-cover object-center'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center'>
          <div className='max-w-7xl mx-auto px-6 w-full'>
            <div className='max-w-2xl text-white'>
              <h1 className='font-serif text-4xl md:text-5xl font-medium mb-4 tracking-wide'>
                Privacy Policy
              </h1>
              <p className='text-lg md:text-xl text-white/90 leading-relaxed'>
                Your privacy is important to us. Learn about how we collect, use,
                and protect your personal information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className='bg-slate-50 py-16'>
        <div className='max-w-4xl mx-auto px-6'>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            {/* Who we are */}
            <section className='mb-10'>
              <h2 className='font-serif text-2xl font-medium text-[#6b2f2a] mb-4 pb-2 border-b border-slate-200'>
                Who we are
              </h2>
              <p className='text-slate-700 leading-relaxed'>
                Houseoftheredeemer.org is the website of House of the Redeemer
                (&ldquo;the House&rdquo;), 7 East 95th Street, New York, New York
                10128, 212.289.0399
              </p>
            </section>

            {/* What personal data we collect */}
            <section className='mb-10'>
              <h2 className='font-serif text-2xl font-medium text-[#6b2f2a] mb-4 pb-2 border-b border-slate-200'>
                What personal data we collect and why we collect it
              </h2>

              {/* Contact form */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium text-slate-900 mb-3'>
                  Contact form
                </h3>
                <p className='text-slate-700 leading-relaxed'>
                  When you choose to contact us via our Contact & Inquiries page,
                  the only personal information that we require and collect is your
                  name and email address; you may choose to share your phone number
                  if you request a call-back. We collect this information in order
                  to best answer your query about the House of the Redeemer,
                  including staying at the House, holding a retreat or event at the
                  House, or using the space for a film or photo shoot.
                </p>
              </div>

              {/* Cookies and analytics */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium text-slate-900 mb-3'>
                  Cookies and analytics
                </h3>
                <p className='text-slate-700 leading-relaxed'>
                  As is common practice with almost all professional websites, this
                  site uses cookies, which are tiny files that are downloaded to
                  your computer, to improve your experience.
                </p>
              </div>

              {/* Third Party Cookies */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium text-slate-900 mb-3'>
                  Third Party Cookies
                </h3>
                <p className='text-slate-700 leading-relaxed'>
                  Houseoftheredeemer.org uses Google Analytics and cookies in order
                  to assess the effectiveness of our website in conveying the
                  information that site users look for on the site. Please see{' '}
                  <a
                    href='https://policies.google.com/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#6b2f2a] underline hover:text-[#4e1f1a]'
                  >
                    Google&apos;s privacy policy
                  </a>
                  .
                </p>
              </div>

              {/* Ticket purchases and donations */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium text-slate-900 mb-3'>
                  Ticket purchases and donations
                </h3>
                <p className='text-slate-700 leading-relaxed mb-3'>
                  When you choose to purchase tickets or RSVP for House of the
                  Redeemer events, we collect your name, email address, and phone
                  number. We do not store your credit card information;
                  Houseoftheredeemer.org uses the Stripe online payment platform to
                  process credit card transactions for events ticket purchases and
                  donations to the House. Please see{' '}
                  <a
                    href='https://stripe.com/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#6b2f2a] underline hover:text-[#4e1f1a]'
                  >
                    Stripe&apos;s Global Privacy Policy
                  </a>
                  .
                </p>
                <p className='text-slate-700 leading-relaxed'>
                  Houseoftheredeemer.org uses the Gravity Forms plugin to power the
                  Contact & Inquiries form, ticket purchases and event RSVPs, and
                  online donations. Form submissions are not sent to or stored by
                  gravityforms.com.
                </p>
              </div>

              {/* Links to other sites */}
              <div className='mb-6'>
                <h3 className='text-lg font-medium text-slate-900 mb-3'>
                  Links to other sites
                </h3>
                <p className='text-slate-700 leading-relaxed mb-3'>
                  Houseoftheredeemer.org contains links to other sites that are not
                  operated by us. If you click on a third party link, you will be
                  directed to that third party&apos;s site. We advise you to review
                  the Privacy Policy of every site you visit.
                </p>
                <p className='text-slate-700 leading-relaxed'>
                  We have no control over and assume no responsibility for the
                  content, privacy policies or practices of any third party sites or
                  services.
                </p>
              </div>
            </section>

            {/* What rights you have over your data */}
            <section>
              <h2 className='font-serif text-2xl font-medium text-[#6b2f2a] mb-4 pb-2 border-b border-slate-200'>
                What rights you have over your data
              </h2>
              <p className='text-slate-700 leading-relaxed'>
                If you have contacted the House online, or purchased tickets or
                donated to the House online, you can request that we erase any
                personal data we hold about you. This does not include any data we
                are obliged to keep for administrative, legal, or security purposes.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <div className='mt-12 bg-[#fbf9f7] rounded-lg shadow p-8 text-center'>
            <h3 className='font-serif text-xl font-medium text-[#6b2f2a] mb-3'>
              Questions About Our Privacy Policy?
            </h3>
            <p className='text-slate-600 mb-4'>
              If you have any questions or concerns about our privacy practices,
              please don&apos;t hesitate to contact us.
            </p>
            <a
              href='/contact'
              className='inline-block bg-[#6b2f2a] hover:bg-[#4e1f1a] text-white font-medium py-2 px-6 rounded-md transition-colors'
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
