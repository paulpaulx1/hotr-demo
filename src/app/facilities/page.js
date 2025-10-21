'use client';

import { useState } from 'react';
import Image from 'next/image';

// Keep using your existing inline styles
const styles = {
  floorplanContainer: {
    position: 'relative',
    width: '100%',
    margin: '0 auto'
  },
  floorplanWrapper: {
    position: 'relative',
    width: '100%'
  },
  floorplanImage: {
    width: '100%',
    height: 'auto',
    display: 'block'
  },
  roomArea: {
    position: 'absolute',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  roomAreaHover: {
    backgroundColor: 'rgba(255, 255, 0, 0.2)',
    border: '1px dashed rgba(0, 0, 0, 0.5)'
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  lightboxContent: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'none',
    fontSize: '24px',
    cursor: 'pointer'
  },
  roomImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '70vh',
    marginTop: '20px'
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  pageDescription: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    maxWidth: '800px',
    margin: '0 auto 2rem auto',
    textAlign: 'center'
  },
  floorHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center'
  }
};

// First floor room data (your existing data)
const firstFloorRoomData = [
  {
    "x": "21.17",
    "y": "5.70",
    "width": "35.19",
    "height": "31.41",
    "name": "Dining Room"
  },
  {
    "x": "57.00",
    "y": "5.59",
    "width": "13.90",
    "height": "24.91",
    "name": "Pantry"
  },

  {
    "x": "46.36",
    "y": "41.69",
    "width": "22.75",
    "height": "19.00",
    "name": "Entrance Hall"
  },
  {
    "x": "20.99",
    "y": "40.10",
    "width": "23.09",
    "height": "52.86",
    "name": "Courtyard"
  },
  {
    "x": "46.30",
    "y": "73.22",
    "width": "8.32",
    "height": "19.41",
    "name": "Vestibule"
  },
  {
    "x": "55.72",
    "y": "70.66",
    "width": "23.21",
    "height": "21.38",
    "name": "Reception Room"
  },
  {
    "x": "55.08",
    "y": "62.47",
    "width": "6.86",
    "height": "7.37",
    "name": "Bathroom"
  }
];

// Second floor room data
const secondFloorRoomData = [
  {
    "x": "19.97",
    "y": "5.37",
    "width": "56.36",
    "height": "32.28",
    "name": "Second Story Library"
  },
  {
    "x": "56.17",
    "y": "42.19",
    "width": "13.83",
    "height": "19.89",
    "name": "Second Story Hall"
  },
  {
    "x": "46.27",
    "y": "72.23",
    "width": "33.80",
    "height": "22.18",
    "name": "Drawing Room"
  }
];

// Room descriptions - you can customize these
const roomDescriptions = {
  // First floor
  "Dining Room": "An elegant dining room featuring Italian Baroque furniture with stunning Flemish landscape paintings from the 17th century.",
  "Pantry": "A spacious pantry with ample storage for fine china and silverware.",
  "Office": "A cozy private office space for administrative work.",
  "Dressing Room": "A well-appointed dressing room adjacent to the entrance hall.",
  "Entrance Hall": "The grand entrance hall welcomes visitors with its elegant architecture.",
  "Courtyard": "A beautiful outdoor courtyard featuring a car turntable for easy vehicle access.",
  "Vestibule": "The vestibule serves as a transition space between the courtyard and the interior.",
  "Reception Room": "A formal reception room for greeting and entertaining guests.",
  "Bathroom": "A convenient facilities room.",
  
  // Second floor
  "Second Story Library": "A magnificent two-story library with extensive collections and comfortable reading areas.",
  "Second Story Hall": "The second floor hall connects the library and drawing room.",
  "Drawing Room": "A spacious drawing room for social gatherings and entertainment."
};

export default function FacilitiesPage() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  
  const handleRoomClick = (roomName) => {
    setActiveRoom(roomName);
  };
  
  const closeLightbox = () => {
    setActiveRoom(null);
  };
  
  // For development purposes, we'll use a placeholder image if real images aren't available
const getRoomImage = (roomName) => {
  // Combined image mappings with original filenames
  const imageMap = {
    // First floor rooms
    "Dining Room": "/firstfloor/house-of-the-redeemer_dining1.jpg",
    "Pantry": "/firstfloor/house-of-the-redeemer_pantry1-1024x683.jpg",
    "Courtyard": "/firstfloor/house-of-the-redeemer_courtyard.jpg",
    "Entrance Hall": "/firstfloor/house-of-the-redeemer_lobby3.jpg",
    "Vestibule": "/firstfloor/house-of-the-redeemer_entry1-768x512.jpg", 
    "Reception Room": "/firstfloor/house-of-the-redeemer_reception5-768x512.jpg",
    
    // Second floor rooms
    "Second Story Library": "/secondfloor/house-of-the-redeemer_library2.jpg",
    "Second Story Hall": "/secondfloor/house-of-the-redeemer_upstairs-hall.jpg",
    "Drawing Room": "/secondfloor/house-of-the-redeemer_chapel2.jpg"
  };
  
  // Return the mapped image or a placeholder with the room name
  if (imageMap[roomName]) {
    return imageMap[roomName];
  } else {
    // Generate a placeholder with the room name
    const formattedRoomName = roomName.replace(/\s+/g, '+');
    return `https://placehold.co/600x400?text=${formattedRoomName}`;
  }
};

  // Function to render a floorplan with its clickable areas
  const renderFloorplan = (floorplanImage, roomData, title) => (
    <div className="mb-8">
      <h2 style={styles.floorHeading}>{title}</h2>
      <div style={styles.floorplanContainer}>
        <div style={styles.floorplanWrapper}>
          <Image
            src={floorplanImage} 
            alt={`${title} Floorplan`}
            width={1000}
            height={1000}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          
          {/* Clickable room areas */}
          {roomData.map((room, index) => (
            <div
              key={index}
              style={{
                ...styles.roomArea,
                left: `${room.x}%`,
                top: `${room.y}%`,
                width: `${room.width}%`,
                height: `${room.height}%`,
                ...(hoveredRoom === room.name ? styles.roomAreaHover : {})
              }}
              onClick={() => handleRoomClick(room.name)}
              onMouseEnter={() => setHoveredRoom(room.name)}
              onMouseLeave={() => setHoveredRoom(null)}
              title={room.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <h1 style={styles.pageTitle}>Our Facilities</h1>
      <p style={styles.pageDescription}>
        Explore our beautiful facilities by clicking on different rooms in the floorplans below.
        Each room has been carefully designed and maintained to provide an exceptional experience.
      </p>
      
      {/* Instructions */}
      <div className="text-center mb-8 text-gray-600">
        <p>Click on any room in the floorplans to see details and photos</p>
      </div>
      
      {/* Side by side floorplans on desktop, stacked on mobile */}
      <div className="md:flex md:gap-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          {renderFloorplan("/house-of-the-redeemer_floorplan1-1.jpg", firstFloorRoomData, "First Floor")}
        </div>
        <div className="md:w-1/2">
          {renderFloorplan("/house-of-the-redeemer_floorplan2-1.jpg", secondFloorRoomData, "Second Floor")}
        </div>
      </div>
      
      {/* Lightbox */}
      {activeRoom && (
        <div 
          style={styles.lightbox}
          onClick={closeLightbox}
        >
          <div 
            style={styles.lightboxContent}
            onClick={e => e.stopPropagation()}
          >
            <button 
              style={styles.closeButton}
              onClick={closeLightbox}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">{activeRoom}</h2>
            <p className="mb-4">{roomDescriptions[activeRoom] || 'Information coming soon.'}</p>
            <div style={styles.roomImageWrapper}>
              <Image
                src={getRoomImage(activeRoom)}
                alt={activeRoom}
                fill
                sizes="(max-width: 768px) 90vw, 70vw"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}