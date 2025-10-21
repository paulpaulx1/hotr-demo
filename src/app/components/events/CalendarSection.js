// src/components/events/CalendarSection.js
import React from 'react';
import EventsCalendar from './Calendar';
import CalendarSubscribeDropdown from './CalendarSubscribeDropdown';

export default function CalendarSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-800 mb-4">
            Upcoming Events
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Join us for worship services, cultural events, and spiritual gatherings at the historic 
            House of the Redeemer. View our calendar below to find upcoming events.
          </p>
        </div>
        
        {/* Calendar component */}
        <EventsCalendar />
        
        {/* Subscribe dropdown positioned at bottom right */}
        <div className="flex justify-end mt-4">
          <CalendarSubscribeDropdown />
        </div>
        
        {/* Call to action below calendar */}
        <div className="mt-10 text-center">
          <p className="text-slate-600 mb-6">
            Looking to host your own event? The House of the Redeemer offers unique spaces for 
            retreats, weddings, and cultural gatherings.
          </p>
          <a 
            href="/events/host" 
            className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-600 border-2 border-slate-700 hover:border-slate-500 text-white font-light tracking-wide transition-all duration-300 rounded-md"
          >
            Learn About Hosting
          </a>
        </div>
      </div>
    </section>
  );
}