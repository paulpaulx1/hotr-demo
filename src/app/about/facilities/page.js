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
      x: "19.42",
      y: "3.42",
      width: "36.84",
      height: "33.12",
      name: "Refectory",
    },
    {
      x: "57.38",
      y: "3.25",
      width: "14.40",
      height: "26.45",
      name: "Pantry",
    },
    {
      x: "18.89",
      y: "42.68",
      width: "24.91",
      height: "53.13",
      name: "Courtyard",
    },
    {
      x: "45.81",
      y: "41.26",
      width: "24.14",
      height: "19.89",
      name: "Entrance Hall",
    },
    {
      x: "57.20",
      y: "30.28",
      width: "14.70",
      height: "10.04",
      name: "Bathroom",
    },
    {
      x: "55.31",
      y: "63.34",
      width: "6.79",
      height: "7.85",
      name: "Bathroom",
    },
    {
      x: "45.81",
      y: "74.97",
      width: "8.38",
      height: "11.81",
      name: "Vestibule",
    },
    {
      x: "56.08",
      y: "71.96",
      width: "23.97",
      height: "21.96",
      name: "Reception Room",
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
      name: "Chapel",
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
      Refectory: "/firstfloor/house-of-the-redeemer_dining1.jpg",
      Pantry: "/firstfloor/house-of-the-redeemer_pantry1-1024x683.jpg",
      Courtyard: "/firstfloor/house-of-the-redeemer_courtyard.jpg",
      "Entrance Hall": "/firstfloor/house-of-the-redeemer_lobby3.jpg",
      Vestibule: "/firstfloor/house-of-the-redeemer_entry1-768x512.jpg",
      "Reception Room":
        "/firstfloor/house-of-the-redeemer_reception5-768x512.jpg",
      Bathroom: "https://placehold.co/800x600?text=Bathroom",

      // Second floor rooms
      "Second Story Library": "/secondfloor/house-of-the-redeemer_library2.jpg",
      "Second Story Hall":
        "/secondfloor/house-of-the-redeemer_upstairs-hall.jpg",
      Chapel: "/secondfloor/house-of-the-redeemer_chapel2.jpg",
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
              className={`room-area ${hoveredRoom === room.name ? "room-area-active" : ""}`}
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
                if (e.key === "Enter" || e.key === " ") {
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
    <div className="container mx-auto px-4 py-8 mt-24">
      {" "}
      {/* Increased top margin from mt-12 to mt-24 */}
      <h1 className="page-title font-libre-baskerville">Spaces & Facilities</h1>
      <p className="text-lg mb-8 max-w-3xl mx-auto text-center">
        Stylistically, the House is based on Italian Renaissance prototypes. It
        shares many characteristics with Italian palazzi, such as the
        &quot;L-shaped&quot; floor plan, the courtyard, the window enframements,
        and the heavy stone cornice that crowns the building. The House was
        designated a New York City Landmark in 1974, and is considered by many
        architectural historians to be one of the most distinguished examples of
        early 20th century residential architecture in New York City.
      </p>
      {/* Instructions */}
      <div className="text-center mb-8 text-gray-600">
        <p>Click on any room in the floorplans to see photos</p>
      </div>
      {/* Side by side floorplans on desktop, stacked on mobile */}
      <div className="md:flex md:gap-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          {renderFloorplan(
            "/house-of-the-redeemer_floorplan1final.jpeg",
            firstFloorRoomData,
            "First Floor"
          )}
        </div>
        <div className="md:w-1/2">
          {renderFloorplan(
            "/house-of-the-redeemer_floorplan2final.jpeg",
            secondFloorRoomData,
            "Second Floor"
          )}
        </div>
      </div>
      {/* Enhanced Lightbox - Focused on images */}
      {/* Gallery-style Lightbox */}
      {activeRoom && (
        <div
          className="facility-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="facility-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="facility-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ×
            </button>

            <h1 className="facility-lightbox-title font-libre-baskerville">
              {activeRoom}
            </h1>

            <div className="facility-lightbox-image-frame">
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
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
