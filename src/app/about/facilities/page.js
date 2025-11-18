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
      x: "19.23",
      y: "3.54",
      width: "37.22",
      height: "33.00",
      name: "Refectory",
    },
    {
      x: "57.23",
      y: "3.33",
      width: "14.83",
      height: "20.11",
      name: "Pantry",
    },
    {
      x: "45.97",
      y: "41.40",
      width: "24.12",
      height: "20.35",
      name: "Entrance Hall",
    },
    {
      x: "55.68",
      y: "72.08",
      width: "24.66",
      height: "22.85",
      name: "Reception Room",
    },
    {
      x: "45.88",
      y: "75.12",
      width: "8.55",
      height: "20.30",
      name: "Vestibule",
    },
  ];

  // Second floor room data
  const secondFloorRoomData = [
    {
      x: "18.16",
      y: "2.94",
      width: "58.90",
      height: "34.25",
      name: "Second Story Library",
    },
    {
      x: "56.46",
      y: "41.78",
      width: "14.47",
      height: "20.82",
      name: "Second Story Hall",
    },
    {
      x: "45.97",
      y: "73.32",
      width: "35.68",
      height: "23.86",
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
      // Bathroom: "https://placehold.co/800x600?text=Bathroom",

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
            "/house-of-the-redeemer_floorplan1final2.jpg",
            firstFloorRoomData,
            "First Floor"
          )}
        </div>
        <div className="md:w-1/2">
          {renderFloorplan(
            "/house-of-the-redeemer_floorplan2final.jpg",
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
