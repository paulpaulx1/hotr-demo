"use client";

import { useState } from "react";
import Image from "next/image";
import "./facilities.css"; // Import the separate CSS file

export default function FacilitiesPage() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // First floor room data
  const firstFloorRoomData = [
    {
      x: "21.17",
      y: "5.70",
      width: "35.19",
      height: "31.41",
      name: "Dining Room",
    },
    {
      x: "57.00",
      y: "5.59",
      width: "13.90",
      height: "24.91",
      name: "Pantry",
    },
    {
      x: "46.36",
      y: "41.69",
      width: "22.75",
      height: "19.00",
      name: "Entrance Hall",
    },
    {
      x: "20.99",
      y: "40.10",
      width: "23.09",
      height: "52.86",
      name: "Courtyard",
    },
    {
      x: "46.30",
      y: "73.22",
      width: "8.32",
      height: "19.41",
      name: "Vestibule",
    },
    {
      x: "55.72",
      y: "70.66",
      width: "23.21",
      height: "21.38",
      name: "Reception Room",
    },
    {
      x: "55.08",
      y: "62.47",
      width: "6.86",
      height: "7.37",
      name: "Bathroom",
    },
  ];

  // Second floor room data
  const secondFloorRoomData = [
    {
      x: "19.97",
      y: "5.37",
      width: "56.36",
      height: "32.28",
      name: "Second Story Library",
    },
    {
      x: "56.17",
      y: "42.19",
      width: "13.83",
      height: "19.89",
      name: "Second Story Hall",
    },
    {
      x: "46.27",
      y: "72.23",
      width: "33.80",
      height: "22.18",
      name: "Drawing Room",
    },
  ];

  const handleRoomClick = (roomName) => {
    setActiveRoom(roomName);
    setImageLoaded(false); // Reset image loaded state when opening a new room
  };

  const closeLightbox = () => {
    setActiveRoom(null);
  };

  // Image mappings with original filenames
  const getRoomImage = (roomName) => {
    const imageMap = {
      // First floor rooms
      "Dining Room": "/firstfloor/house-of-the-redeemer_dining1.jpg",
      Pantry: "/firstfloor/house-of-the-redeemer_pantry1-1024x683.jpg",
      Courtyard: "/firstfloor/house-of-the-redeemer_courtyard.jpg",
      "Entrance Hall": "/firstfloor/house-of-the-redeemer_lobby3.jpg",
      Vestibule: "/firstfloor/house-of-the-redeemer_entry1-768x512.jpg",
      "Reception Room": "/firstfloor/house-of-the-redeemer_reception5-768x512.jpg",
      Bathroom: "https://placehold.co/800x600?text=Bathroom",

      // Second floor rooms
      "Second Story Library": "/secondfloor/house-of-the-redeemer_library2.jpg",
      "Second Story Hall": "/secondfloor/house-of-the-redeemer_upstairs-hall.jpg",
      "Drawing Room": "/secondfloor/house-of-the-redeemer_chapel2.jpg",
    };

    // Return the mapped image or a placeholder with the room name
    if (imageMap[roomName]) {
      return imageMap[roomName];
    } else {
      // Generate a placeholder with the room name
      const formattedRoomName = roomName.replace(/\s+/g, "+");
      return `https://placehold.co/800x600?text=${formattedRoomName}`;
    }
  };

  // Function to render a floorplan with its clickable areas
  const renderFloorplan = (floorplanImage, roomData, title) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="floorplan-container">
        <div className="floorplan-wrapper">
          <Image
            src={floorplanImage}
            alt={`${title} Floorplan`}
            width={1000}
            height={1000}
            className="w-full h-auto"
            priority={true}
          />

          {/* Clickable room areas */}
          {roomData.map((room, index) => (
            <div
              key={index}
              className={`room-area ${hoveredRoom === room.name ? 'room-area-active' : ''}`}
              style={{
                left: `${room.x}%`,
                top: `${room.y}%`,
                width: `${room.width}%`,
                height: `${room.height}%`,
              }}
              onClick={() => handleRoomClick(room.name)}
              onMouseEnter={() => setHoveredRoom(room.name)}
              onMouseLeave={() => setHoveredRoom(null)}
              title={room.name}
              aria-label={`View ${room.name}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRoomClick(room.name);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-24"> {/* Increased top margin from mt-12 to mt-24 */}
      <h1 className="page-title font-libre-baskerville">Spaces & Facilities</h1>
      <p className="text-lg mb-8 max-w-3xl mx-auto text-center">
        Stylistically, the House is based on Italian Renaissance prototypes. It
        shares many characteristics with Italian palazzi, such as the "L-shaped"
        floor plan, the courtyard, the window enframements, and the heavy stone
        cornice that crowns the building. The House was designated a New York
        City Landmark in 1974, and is considered by many architectural
        historians to be one of the most distinguished examples of early 20th
        century residential architecture in New York City.
      </p>

      {/* Instructions */}
      <div className="text-center mb-8 text-gray-600">
        <p>Click on any room in the floorplans to see photos</p>
      </div>

      {/* Side by side floorplans on desktop, stacked on mobile */}
      <div className="md:flex md:gap-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          {renderFloorplan(
            "/house-of-the-redeemer_floorplan1-1.jpg",
            firstFloorRoomData,
            "First Floor"
          )}
        </div>
        <div className="md:w-1/2">
          {renderFloorplan(
            "/house-of-the-redeemer_floorplan2-1.jpg",
            secondFloorRoomData,
            "Second Floor"
          )}
        </div>
      </div>

      {/* Enhanced Lightbox - Focused on images */}
      {activeRoom && (
        <div 
          className="lightbox-overlay"
          onClick={closeLightbox}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ×
            </button>
            
            {/* Room Name as H1 */}
            <h1 className="lightbox-title font-libre-baskerville">{activeRoom}</h1>
            
            {/* Simplified image container - maximized for image display */}
            <div className="room-image-container">
              {/* Optional loading indicator */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="spinner"></div>
                </div>
              )}
              
              <Image
                src={getRoomImage(activeRoom)}
                alt={activeRoom}
                fill
                sizes="(max-width: 768px) 95vw, 90vw"
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
                onLoadingComplete={() => setImageLoaded(true)}
                priority={true}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}