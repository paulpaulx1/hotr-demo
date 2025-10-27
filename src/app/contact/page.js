import ContactForm from './ContactForm';
import Image from "next/image";

export const metadata = {
  title: "Contact Us | House of the Redeemer",
  description:
    "Get in touch with the House of the Redeemer to inquire about retreats, events, overnight stays, or other opportunities.",
};

export default function ContactPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[400px] md:h-[750px] overflow-hidden'>
        <Image
          src='/contact-hero.jpg' // Replace with your actual hero image
          alt='Contact House of the Redeemer'
          fill
          className='object-cover object-center'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center'>
          <div className='max-w-7xl mx-auto px-6 w-full'>
            <div className='max-w-2xl text-white'>
              <h1 className='font-serif text-4xl md:text-5xl font-medium mb-4 tracking-wide'>
                Get in Touch
              </h1>
              <p className='text-lg md:text-xl text-white/90 leading-relaxed'>
                We welcome your questions and inquiries about hosting events,
                retreats, overnight stays, or any other opportunities at the
                House of the Redeemer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='bg-slate-50 py-16'>
        <div className='max-w-4xl mx-auto px-6'>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            <div className='mb-8'>
              <h2 className='font-serif text-3xl font-medium text-[#6b2f2a] mb-3'>
                Contact Us
              </h2>
              <p className='text-slate-600'>
                Please fill out the form below and we&apos;ll get back to you as
                soon as possible.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-[#fbf9f7] rounded-lg shadow p-6 text-center'>
              <div className='w-12 h-12 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-[#6b2f2a] mb-2'>Phone</h3>
              <a
                href='tel:+12122890399'
                className='text-slate-600 hover:text-slate-900'
              >
                (212) 289-0399
              </a>
            </div>

            <div className='bg-[#fbf9f7] rounded-lg shadow p-6 text-center'>
              <div className='w-12 h-12 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-[#6b2f2a] mb-2'>Email</h3>
              <a
                href='mailto:info@houseoftheredeemer.org'
                className='text-slate-600 hover:text-slate-900'
              >
                info@houseoftheredeemer.org
              </a>
            </div>

            <div className='bg-[#fbf9f7] rounded-lg shadow p-6 text-center'>
              <div className='w-12 h-12 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-[#6b2f2a] mb-2'>
                Address
              </h3>
              <p className='text-slate-600'>
                7 East 95th Street
                <br />
                New York, NY 10128
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hours Section (Optional) */}
      <div className='bg-[#fbf9f7] py-16'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <h2 className='font-serif text-3xl font-medium text-[#6b2f2a] mb-6'>
            Office Hours
          </h2>
          <p className='text-slate-600 mb-8'>
            Our office is open Monday through Friday, 9:00 AM to 5:00 PM.
            <br />
            We typically respond to inquiries within 1-2 business days.
          </p>
        </div>
      </div>
    </main>
  );
}
