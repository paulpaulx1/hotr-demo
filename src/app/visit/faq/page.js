"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./FAQ.module.css";

// FAQ Item component
const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-slate-200">
    <button
      className="w-full text-left py-5 px-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-slate-300 rounded"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <h3 className="text-lg font-medium text-slate-800">{question}</h3>
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

// FAQ section component
const FaqSection = ({ title, items }) => {
  const [openItems, setOpenItems] = useState([]);
  const toggleItem = (i) =>
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

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
  const generalFaqs = [
    {
      question: "Where is the House located?",
      answer:
        "House of the Redeemer is located at 7&nbsp;East&nbsp;95th&nbsp;Street, New&nbsp;York, NY&nbsp;10128 (between Fifth and&nbsp;Madison&nbsp;Avenues). For map and neighborhood information, see the <a href='/about/history' class='text-slate-800 underline hover:text-slate-600'>Carnegie Hill neighborhood</a> page.",
    },
    {
      question: "Is there access to public transportation near the House?",
      answer:
        "Yes. The closest subway stop is at Lexington&nbsp;Avenue and&nbsp;96th&nbsp;Street (#6&nbsp;train). MTA buses run north on&nbsp;Madison&nbsp;Avenue and south on&nbsp;Fifth&nbsp;Avenue. See the <a href='http://tripplanner.mta.info/MyTrip/ui_web/customplanner/TripPlanner.aspx' target='_blank' rel='noopener' class='text-slate-800 underline hover:text-slate-600'>MTA Trip Planner</a>.",
    },
    {
      question: "Are religious services held at the House?",
      answer:
        "Between&nbsp;September and&nbsp;June there is an Episcopal priest in&nbsp;residence who serves as&nbsp;Chaplain. Prayer services are held during those months twice daily (at&nbsp;8&nbsp;am and&nbsp;5:30&nbsp;pm), Monday through&nbsp;Friday, in&nbsp;the chapel on&nbsp;the second&nbsp;floor. Eucharist is celebrated at&nbsp;the Tuesday&nbsp;evening and&nbsp;Thursday&nbsp;morning service. All are welcome to&nbsp;attend. There are no services held during July and&nbsp;August.",
    },
    {
      question: "Does the House have elevators?",
      answer: "Yes, the House is equipped with two elevators.",
    },
    {
      question: "Is the House handicapped-accessible?",
      answer:
        "The House is unable to accommodate guests with ambulatory challenges, as&nbsp;the building is not fully accessible to&nbsp;those with physical challenges; also, any emergency evacuation or&nbsp;the possibility of elevator outage would include use of multiple flights of&nbsp;stairs.",
    },
  ];

  const stayingFaqs = [
    {
      question: "How do I make a reservation to stay at the House?",
      answer:
        "Email us through our <a href='/contact' class='text-slate-800 underline hover:text-slate-600'>Contact&nbsp;&amp;&nbsp;Inquiries</a> page. In your message, please include specific dates, number&nbsp;of&nbsp;people, and&nbsp;room&nbsp;types. The office usually responds within three&nbsp;business&nbsp;days. Once availability is determined, you&apos;ll need to&nbsp;telephone the&nbsp;office to&nbsp;place a&nbsp;25%&nbsp;deposit. The&nbsp;deposit is&nbsp;non-transferable and&nbsp;non-refundable. All&nbsp;payments must be made in&nbsp;U.S.&nbsp;funds.",
    },
    {
      question: "Who may stay at the House?",
      answer:
        "The House is a retreat house in the Episcopal tradition, but guests of&nbsp;all faiths are welcome. The&nbsp;House requests that all&nbsp;guests who seek accommodation are doing so for reasons of&nbsp;retreat, business with not-for-profits or&nbsp;charities, or&nbsp;for&nbsp;medical treatment — and&nbsp;not for&nbsp;purposes of&nbsp;tourism.",
    },
    {
      question: "Are walk-in stays possible?",
      answer: "No; advance reservations are required.",
    },
    {
      question: "How far in advance can I book a reservation?",
      answer:
        "The House accepts reservations up&nbsp;to&nbsp;three&nbsp;months in&nbsp;advance for private individuals. Retreat groups are given preference and&nbsp;may&nbsp;book further in&nbsp;advance.",
    },
    {
      question: "What are check-in/checkout hours at the House?",
      answer:
        "<p>Check-in is&nbsp;3&nbsp;pm; checkout is&nbsp;10&nbsp;am. Guests are required to&nbsp;check&nbsp;in Monday–Friday between&nbsp;10&nbsp;am – 5&nbsp;pm (10 am – 4 pm during July &amp; August). There are no individual guest check-ins on weekends, but arrangements can&nbsp;be&nbsp;made for&nbsp;retreat groups. Under&nbsp;no circumstances will we check&nbsp;in guests after&nbsp;8 pm. Luggage storage is&nbsp;available if&nbsp;you arrive early.</p>",
    },
    {
      question: "Is the House air-conditioned?",
      answer:
        "The House does not have central air-conditioning. During July &amp; August bookings are limited to&nbsp;rooms with individual&nbsp;A/C units. Public spaces are not available for rental during July &amp; August, and&nbsp;Chapel services are also suspended.",
    },
    {
      question: "Is the House able to accommodate children?",
      answer:
        "No&nbsp;guests under&nbsp;16 are permitted to&nbsp;stay; likewise, no&nbsp;unaccompanied guests under&nbsp;21.",
    },
  ];

  const amenitiesFaqs = [
    {
      question: "What amenities does the House provide?",
      answer:
        "The House provides single and&nbsp;double rooms, all with twin&nbsp;beds. Linens, towels, and&nbsp;soap are provided. Some rooms include private baths, but most use shared co-ed facilities.",
    },
    {
      question: "Is there Wi-Fi available at the House?",
      answer:
        "Yes, complimentary Wi-Fi is provided. A&nbsp;computer terminal (no&nbsp;printer) is also available. The&nbsp;House does not provide office services such&nbsp;as printing or&nbsp;copying.",
    },
    {
      question: "Does the House provide meals?",
      answer:
        "There is no room or&nbsp;meal service. Retreat groups may arrange food delivery. Guests may use a&nbsp;small pantry kitchen with microwave, refrigerator, freezer, coffeemaker, and&nbsp;toaster.",
    },
    {
      question: "Does the House have laundry facilities?",
      answer:
        "No, but there are laundromats and&nbsp;dry cleaners nearby.",
    },
    {
      question: "Does the House provide parking for guests?",
      answer:
        "No parking or&nbsp;bicycle storage is available on&nbsp;site.",
    },
  ];

  const guidelinesFaqs = [
    {
      question: "What is expected of guests during their stay?",
      answer: `
        <p>We ask that all guests observe and uphold the mission of&nbsp;the&nbsp;House: &ldquo;The&nbsp;House&nbsp;of&nbsp;the&nbsp;Redeemer is&nbsp;an&nbsp;oasis of&nbsp;serenity, a&nbsp;place&nbsp;apart, within&nbsp;the&nbsp;City&nbsp;of&nbsp;New&nbsp;York providing worship, hospitality, and&nbsp;spiritual renewal.&rdquo;</p>
        <p class="mt-4">To&nbsp;maintain this atmosphere of&nbsp;peace and&nbsp;tranquility, please observe the&nbsp;following guidelines:</p>
        <ul class="list-disc pl-5 mt-2 space-y-2">
          <li>No&nbsp;unregistered guests on&nbsp;guest-room floors.</li>
          <li>Please respect others in&nbsp;common areas, including attire and&nbsp;behavior.</li>
          <li>Smoking, recreational drugs, and&nbsp;alcohol are not permitted.</li>
          <li>No&nbsp;pets.</li>
          <li>Mail or&nbsp;packages for&nbsp;guests cannot be&nbsp;accepted.</li>
          <li>Quiet hours begin at&nbsp;11 pm.</li>
          <li>Keys must be&nbsp;returned at&nbsp;checkout; lost keys incur a&nbsp;$50&nbsp;charge.</li>
        </ul>
        <p class="mt-4">All&nbsp;guests are reminded that we&nbsp;maintain a&nbsp;small staff and&nbsp;that &ldquo;we&nbsp;are all servants here.&rdquo; Please keep rooms tidy and&nbsp;strip linens before&nbsp;departure.</p>
      `,
    },
    {
      question: "Is there a curfew at the House?",
      answer:
        "Upon check-in, guests receive instructions for building access. Please respect quiet hours after&nbsp;11 pm.",
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
          Find answers to common questions about the House&nbsp;of&nbsp;the&nbsp;Redeemer,
          our facilities, and&nbsp;guest guidelines.
        </p>
      </div>

      {/* Hero image */}
      <div className="mb-12 relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/house-of-the-redeemer_chapel-sm.jpg"
          alt="House of the Redeemer Chapel"
          width={1200}
          height={600}
          className="w-full h-80 object-cover object-[70%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent flex items-center">
          <div className="px-8 py-4 text-white max-w-md">
            <h2 className={`${styles.header} text-2xl mb-2`}>Our Mission</h2>
            <p className="text-white/90 italic">
              &ldquo;The&nbsp;House&nbsp;of&nbsp;the&nbsp;Redeemer is&nbsp;an&nbsp;oasis
              of&nbsp;serenity, a&nbsp;place&nbsp;apart, within&nbsp;the&nbsp;City&nbsp;of&nbsp;New&nbsp;York providing worship,
              hospitality, and&nbsp;spiritual renewal.&rdquo;
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
          If&nbsp;you couldn&apos;t find the answer to&nbsp;your question,
          please don&apos;t hesitate to&nbsp;contact us&nbsp;directly.
        </p>
        <a
          href="/contact"
          className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-md transition duration-200"
        >
          Contact&nbsp;Us
        </a>
      </div>
    </div>
  );
}
