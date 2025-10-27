import DonationForm from './DonationForm';
import Image from "next/image";
import { Church } from 'lucide-react';
import { BookHeart } from 'lucide-react';
import { Handshake } from 'lucide-react';

export const metadata = {
  title: "Donate | House of the Redeemer",
  description:
    "Support the House of the Redeemer's mission to provide spiritual hospitality and programs that nurture the mind, body, and spirit.",
};

export default function DonatePage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[400px] md:h-[750px] overflow-hidden'>
        <Image
          src='/donation-hero.jpg' // Replace with your actual hero image
          alt='Support House of the Redeemer'
          fill
          className='object-cover object-center'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50 flex items-center'>
          <div className='max-w-7xl mx-auto px-6 w-full flex justify-center items-center"'>
            <div className='max-w-2xl text-white'>
              <h1 className='font-serif text-4xl md:text-5xl font-medium mb-4 tracking-wide flex justify-center items-center"'>
                Support Our Mission
              </h1>
              <p className='text-lg md:text-xl text-white/90 leading-relaxed'>
                Your generous donation helps us continue providing a sanctuary
                for spiritual growth, hospitality, and community programs that
                nurture the mind, body, and spirit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Form Section */}
      <div className='bg-slate-50 py-16'>
        <div className='max-w-3xl mx-auto px-6'>
          <div className='bg-[#fbf9f7] rounded-lg shadow-lg p-8 md:p-12'>
            <div className='mb-8 text-center'>
              <h2 className='font-serif text-3xl font-medium text-[#6b2f2a] mb-3'>
                Make a Donation
              </h2>
              <p className='text-slate-600'>
                Your support makes a meaningful difference in our community.
              </p>
            </div>

            <DonationForm />
          </div>

          {/* Tax Deductible Notice */}
          <div className='mt-8 text-center text-sm text-slate-600'>
            <p>
              House of the Redeemer is a 501(c)(3) nonprofit organization.
              <br />
              Your donation is tax-deductible to the extent allowed by law.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Section (Optional) */}
      <div className='bg-[#fbf9f7] py-16'>
        <div className='max-w-5xl mx-auto px-6'>
          <h2 className='font-serif text-3xl font-medium text-slate-900 text-center mb-12'>
            Your Impact
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-[#fbf9f7] text-2xl'><Church/></span>
              </div>
              <h3 className='text-xl font-medium text-[#6b2f2a] mb-2'>
                Preserve History
              </h3>
              <p className='text-slate-600'>
                Help maintain our historic 1917 Italian Renaissance mansion
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-[#fbf9f7] text-2xl'><BookHeart/></span>
              </div>
              <h3 className='text-xl font-medium text-[#6b2f2a] mb-2'>
                Support Programs
              </h3>
              <p className='text-slate-600'>
                Enable concerts, retreats, and spiritual programs
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-[#6b2f2a] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-[#fbf9f7] text-2xl'><Handshake/></span>
              </div>
              <h3 className='text-xl font-medium text-[#6b2f2a] mb-2'>
                Welcome All
              </h3>
              <p className='text-slate-600'>
                Provide hospitality and sanctuary to our community
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
