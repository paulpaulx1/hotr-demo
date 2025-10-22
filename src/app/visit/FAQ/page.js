"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./FAQ.module.css";

// FAQ Item component
const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200">
      <button
        className="w-full text-left py-5 px-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-slate-300 rounded"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className={`text-lg font-medium`}>{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-slate-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="py-4 px-4 text-slate-600 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </div>
  );
};

// FAQ section component (no description prop anymore)
const FaqSection = ({ title, items }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <div className="mb-16">
      <h2 className={`${styles.header} text-2xl font-medium mb-6`}>{title}</h2>
      <div className="bg-white rounded-lg shadow-sm">
        {items.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItems.includes(index)}
            onClick={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default function FAQPage() {
  // FAQ items for "About the House"
  const generalFaqs = [
    {
      question: "Where is the House located?",
      answer:
        "House of the Redeemer is located at 7 East 95th Street, New York, NY 10128 (between Fifth and Madison Avenues). For map and neighborhood information, see the <a href='/about/history' class='text-slate-800 underline hover:text-slate-600'>Carnegie Hill neighborhood</a> page.",
    },
    {
      question: "Is there access to public transportation near the House?",
      answer:
        "Yes. The closest subway stop is at Lexington Avenue and 96th Street (#6 train). MTA buses run north on Madison Avenue and south on Fifth Avenue. See the <a href='http://tripplanner.mta.info/MyTrip/ui_web/customplanner/TripPlanner.aspx' target='_blank' rel='noopener' class='text-slate-800 underline hover:text-slate-600'>MTA Trip Planner</a>.",
    },
    {
      question: "Are religious services held at the House?",
      answer:
        "Between September and June there is an Episcopal priest in residence who serves as Chaplain. Prayer services are held during those months twice daily (at 8 am and 5:30 pm), Monday through Friday, in the chapel on the second floor. Eucharist is celebrated at the Tuesday evening and Thursday morning service. All are welcome to attend. There are no services held during July and August.",
    },
    {
      question: "Does the House have elevators?",
      answer: "Yes, the House is equipped with two elevators.",
    },
    {
      question: "Is the House handicapped-accessible?",
      answer:
        "The House is unable to accommodate guests with ambulatory challenges, as the building is not fully accessible to those with physical challenges; also, any emergency evacuation or the possibility of elevator outage would include use of multiple flights of stairs.",
    },
  ];

  // FAQ items for "Staying at the House"
  const stayingFaqs = [
    {
      question: "How do I make a reservation to stay at the House?",
      answer:
        "Email us through our <a href='/contact' class='text-slate-800 underline hover:text-slate-600'>Contact & Inquiries</a> page. In your message, it would be helpful if you include specific dates of the proposed reservation, how many people your reservation will involve, and the type of room(s) you require. The office usually responds to inquiries within 3 business days. Once availability is determined, you'll need to telephone the office to place a 25% deposit to secure the reservation. The deposit is non-transferable and nonrefundable. All payments must be made in U.S. funds.",
    },
    {
      question: "Who may stay at the House?",
      answer:
        "The House is a retreat house in the Episcopal tradition, but guests of all faiths are welcome. The House does request that all guests who seek accommodation are doing so for reasons of retreat, business with not-for-profits or charities, or for medical treatment — or activities of that nature — and not for the purposes of tourism.",
    },
    {
      question: "Are walk-in stays possible?",
      answer: "No; advance reservations are required.",
    },
    {
      question: "How far in advance can I book a reservation?",
      answer:
        "The House accepts reservations up to three months in advance for private individuals. Retreat groups are given preference and may book further in advance.",
    },
    {
      question: "What are check-in/checkout hours at the House?",
      answer:
        "<p>Check-in is 3 pm; checkout is 10 am. Guests are required to check in Mondays through Fridays between the hours of 10 am and 5 pm (10 am to 4 pm during July and August). There are no individual guest check-ins on weekends, but arrangements can be made for retreat groups to check in on weekends. Under no circumstances will we check in guests after 8 pm. A space to store luggage is provided if you arrive before your room is ready for occupancy.</p>",
    },
    {
      question: "Is the House air-conditioned?",
      answer:
        "The House does not have central air-conditioning. During July and August bookings for guest rooms are limited to those rooms that contain air-conditioning units. Public spaces are not available for rental during July and August, and Chapel services are also suspended.",
    },
    {
      question: "Is the House able to accommodate children?",
      answer:
        "No guests under the age of 16 are permitted to stay at the House; likewise no unaccompanied guests under the age of 21 are permitted to stay at the House.",
    },
  ];

  // FAQ items for "Amenities & Facilities"
  const amenitiesFaqs = [
    {
      question: "What amenities does the House provide?",
      answer:
        "The House provides single rooms and double rooms. All of the beds in our facility are twin beds. Bed linens, towels, and soap are provided. Some rooms include private bathrooms, but the majority of the rooms use shared, co-ed facilities.",
    },
    {
      question: "Is there Wi-Fi available at the House?",
      answer:
        "Yes, the House provides complimentary Wi-Fi service on its own network. There is also a computer terminal (but no printer) with Internet available for guests' use. Please note that the House does not provide office services (i.e., printing and copying) for guests.",
    },
    {
      question: "Does the House provide meals?",
      answer:
        "There is no room service or meal service at the House. Retreat groups can make arrangements for food delivery from a number of local establishments. The House is within walking distance of several restaurants and markets. Guests also have access to a small pantry kitchen equipped with microwave, refrigerator, freezer, coffeemaker, and toaster.",
    },
    {
      question: "Does the House have laundry facilities?",
      answer:
        "No, but there are laundromats and dry cleaners in the neighborhood close to the House.",
    },
    {
      question: "Does the House provide parking for guests?",
      answer:
        "No, the House does not provide parking, nor does it provide bicycle storage space for guests.",
    },
  ];

  // FAQ items for "Guest Guidelines"
  const guidelinesFaqs = [
    {
      question: "What is expected of guests during their stay?",
      answer: `
        <p>We ask that all guests observe and uphold the mission of the House: "The House of the Redeemer is an oasis of serenity, a place apart, within the City of New York providing worship, hospitality, and spiritual renewal."</p>
        <p class="mt-4">To maintain this atmosphere of peace and tranquility, please observe the following guidelines:</p>
        <ul class="list-disc pl-5 mt-2 space-y-2">
          <li>No unregistered guests are permitted on the guest room floors.</li>
          <li>Please respect the presence of others when in common areas, including appropriate attire and behavior.</li>
          <li>For the comfort of all guests, smoking is not permitted in the House.</li>
          <li>Recreational drugs and alcohol are not permitted on the premises.</li>
          <li>For allergy and cleanliness reasons, we cannot accommodate pets.</li>
          <li>Mail or packages for guests cannot be accepted.</li>
          <li>To maintain an atmosphere of contemplation, we observe quiet after 11 pm.</li>
          <li>Keys must be returned upon checking out. Lost or unreturned keys incur a $50.00 charge per set.</li>
        </ul>
        <p class="mt-4">All guests are respectfully reminded that we maintain a small staff and that "we are all servants here." Please keep your rooms and bathrooms clean and tidy. When checking out by 10 am, we appreciate your assistance by stripping the linens from the bed before departure.</p>
      `,
    },
    {
      question: "Is there a curfew at the House?",
      answer:
        "Upon check-in, guests are given instructions on accessing the building. We ask that all guests respect the Guidelines and maintain an atmosphere of quiet while in the House and on the guest floors. The general rule of the House is quiet after 11 pm.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 mt-24 max-w-4xl">
      <h1 className={`${styles.header} text-3xl font-bold mb-6 text-center`}>
        Frequently Asked Questions
      </h1>

      {/* Intro */}
      <div className="mb-12 text-center">
        <p className="text-lg text-slate-600">
          Find answers to common questions about the House of the Redeemer, our
          facilities, and guidelines for guests.
        </p>
      </div>

      {/* Hero image */}
      <div className="mb-12 relative rounded-lg overflow-hidden shadow-lg">
        <img
          src="/house-of-the-redeemer_chapel-sm.jpg"
          alt="House of the Redeemer Chapel"
          className="w-full h-80 object-cover object-[70%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent flex items-center">
          <div className="px-8 py-4 text-white max-w-md">
            <h2 className={`${styles.header} text-2xl mb-2`}>Our Mission</h2>
            <p className="text-white/90 italic">
              "The House of the Redeemer is an oasis of serenity, a place apart,
              within the City of New York providing worship, hospitality, and
              spiritual renewal."
            </p>
          </div>
        </div>
      </div>

      {/* FAQ sections */}
      <div className="space-y-12">
        <FaqSection title="About the House" items={generalFaqs} />
        <FaqSection title="Staying at the House" items={stayingFaqs} />
        <FaqSection title="Amenities & Facilities" items={amenitiesFaqs} />
        <FaqSection title="Guest Guidelines" items={guidelinesFaqs} />
      </div>

      {/* Contact section */}
      <div className="mt-16 p-8 bg-slate-100 rounded-lg shadow-inner text-center">
        <h2 className={`${styles.header} text-2xl font-medium mb-8`}>
          Still Have Questions?
        </h2>
        <p className="text-slate-600 mb-6">
          If you couldn't find the answer to your question, please don't
          hesitate to contact us directly.
        </p>
        <a
          href="/contact"
          className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-md transition duration-200"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
