// src/components/events/CalendarSubscribeDropdown.js
'use client'; // Add client directive

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CalendarSubscribeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [baseUrl, setBaseUrl] = useState('');
  
  // Base URL for calendar feed
  const calendarFeedUrl = '/api/events/calendar.ics';
  
  // Set base URL after component mounts (client-side only)
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const fullCalendarUrl = `${baseUrl}${calendarFeedUrl}`;
  
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded transition-colors"
      >
        Subscribe to calendar
        <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 shadow-lg rounded-md z-10">
          <ul className="py-1">
            <li>
              <a 
                href={baseUrl ? `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(fullCalendarUrl)}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Google Calendar
              </a>
            </li>
            <li>
              <a 
                href={baseUrl ? `webcal://${baseUrl.replace(/^https?:\/\//, '')}${calendarFeedUrl}` : '#'}
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                iCalendar
              </a>
            </li>
            <li>
              <a 
                href={baseUrl ? `https://outlook.office.com/calendar/addcalendar?url=${encodeURIComponent(fullCalendarUrl)}` : '#'}
                target="_blank"
                rel="noopener noreferrer" 
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Outlook 365
              </a>
            </li>
            <li>
              <a 
                href={baseUrl ? `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(fullCalendarUrl)}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Outlook Live
              </a>
            </li>
            <li>
              <a 
                href={calendarFeedUrl}
                download="house-of-redeemer-events.ics"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Export .ics file
              </a>
            </li>
            <li>
              <a 
                href={calendarFeedUrl}
                download="house-of-redeemer-outlook-events.ics"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Export Outlook .ics file
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}