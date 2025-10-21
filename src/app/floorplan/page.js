'use client';

import { useState, useRef, useEffect } from 'react';

export default function FloorplanMapperPage() {
  const [image, setImage] = useState(null);
  const [areas, setAreas] = useState([]);
  const [currentArea, setCurrentArea] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const updateScale = () => {
      if (!imageRef.current || !containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const newScale = containerWidth / imageRef.current.naturalWidth;
      setScale(newScale);
    };

    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
          
          if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            setScale(containerWidth / img.width);
          }
          
          setImage(img.src);
          setAreas([]);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    if (!image) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    // Check if clicking on existing area
    const clicked = areas.findIndex(area => 
      x >= area.x && x <= area.x + area.width &&
      y >= area.y && y <= area.y + area.height
    );
    
    if (clicked >= 0) {
      setSelectedArea(clicked);
      return;
    }
    
    setSelectedArea(null);
    setIsDrawing(true);
    setCurrentArea({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentArea) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    setCurrentArea(prev => ({
      ...prev,
      width: x - prev.x,
      height: y - prev.y
    }));
  };

  const handleMouseUp = () => {
    if (isDrawing && currentArea) {
      // Only add areas with positive width/height
      if (currentArea.width > 0 && currentArea.height > 0) {
        const newArea = {
          ...currentArea,
          name: `Room ${areas.length + 1}`
        };
        setAreas([...areas, newArea]);
        setSelectedArea(areas.length);
      }
    }
    setIsDrawing(false);
  };

  const updateAreaName = (index, name) => {
    const newAreas = [...areas];
    newAreas[index].name = name;
    setAreas(newAreas);
  };

  const deleteArea = (index) => {
    const newAreas = [...areas];
    newAreas.splice(index, 1);
    setAreas(newAreas);
    setSelectedArea(null);
  };

  const renderCanvas = () => {
    if (!canvasRef.current || !image) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw image
      ctx.drawImage(img, 0, 0, imageSize.width * scale, imageSize.height * scale);
      
      // Draw existing areas
      areas.forEach((area, index) => {
        ctx.strokeStyle = index === selectedArea ? '#ff0000' : '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          area.x * scale, 
          area.y * scale, 
          area.width * scale, 
          area.height * scale
        );
        
        // Draw room name
        ctx.fillStyle = index === selectedArea ? '#ff0000' : '#00ff00';
        ctx.font = '12px Arial';
        ctx.fillText(area.name, (area.x + 5) * scale, (area.y + 15) * scale);
      });
      
      // Draw current area being drawn
      if (isDrawing && currentArea) {
        ctx.strokeStyle = '#0000ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          currentArea.x * scale, 
          currentArea.y * scale, 
          currentArea.width * scale, 
          currentArea.height * scale
        );
      }
    };
    img.src = image;
  };

  useEffect(() => {
    renderCanvas();
  }, [image, areas, currentArea, isDrawing, selectedArea, scale]);

  const generateCode = () => {
    // Generate relative coordinates (percentages)
    const relativeAreas = areas.map(area => ({
      ...area,
      x: (area.x / imageSize.width * 100).toFixed(2),
      y: (area.y / imageSize.height * 100).toFixed(2),
      width: (area.width / imageSize.width * 100).toFixed(2),
      height: (area.height / imageSize.height * 100).toFixed(2)
    }));
    
    const nextJsCode = `
// FloorPlan.js
import { useState } from 'react';
import Image from 'next/image';
import styles from './FloorPlan.module.css';

const roomData = ${JSON.stringify(relativeAreas, null, 2)};

export default function FloorPlan({ floorplanImage }) {
  const [activeRoom, setActiveRoom] = useState(null);
  
  const handleRoomClick = (roomName) => {
    setActiveRoom(roomName);
  };
  
  const closeLightbox = () => {
    setActiveRoom(null);
  };
  
  return (
    <div className={styles.floorplanContainer}>
      {/* Floorplan image container */}
      <div className={styles.floorplanWrapper}>
        <Image
          src={floorplanImage}
          alt="Floorplan"
          width={1000}
          height={${Math.round(1000 * (imageSize.height / imageSize.width))}}
          style={{
            width: '100%',
            height: 'auto',
          }}
          className={styles.floorplanImage}
        />
        
        {/* Clickable room areas */}
        {roomData.map((room, index) => (
          <div
            key={index}
            className={styles.roomArea}
            style={{
              left: \`\${room.x}%\`,
              top: \`\${room.y}%\`,
              width: \`\${room.width}%\`,
              height: \`\${room.height}%\`
            }}
            onClick={() => handleRoomClick(room.name)}
            title={room.name}
          />
        ))}
      </div>
      
      {/* Lightbox */}
      {activeRoom && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeLightbox}>×</button>
            <h2>{activeRoom}</h2>
            <div className={styles.roomImageWrapper}>
              {/* Replace with actual room images based on room name */}
              <Image
                src={\`/rooms/\${activeRoom.toLowerCase().replace(/\\s+/g, '-')}.jpg\`}
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
`;
    
    const cssCode = `
/* FloorPlan.module.css */
.floorplanContainer {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.floorplanWrapper {
  position: relative;
  width: 100%;
}

.floorplanImage {
  width: 100%;
  height: auto;
  display: block;
}

.roomArea {
  position: absolute;
  cursor: pointer;
  transition: background-color 0.2s;
}

.roomArea:hover {
  background-color: rgba(255, 255, 0, 0.2);
  border: 1px dashed rgba(0, 0, 0, 0.5);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightboxContent {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
}

.closeButton {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.roomImageWrapper {
  position: relative;
  width: 100%;
  height: 70vh;
  margin-top: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .lightboxContent {
    width: 95%;
  }
  
  .roomImageWrapper {
    height: 50vh;
  }
}
`;
    
    return { nextJsCode, cssCode };
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="bg-gray-100 p-4 mb-4 rounded">
        <h1 className="text-2xl font-bold mb-4">Floorplan Area Mapper</h1>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="mb-4"
        />
        
        {selectedArea !== null && (
          <div className="bg-white p-3 rounded shadow mb-4">
            <h3 className="font-bold">Edit Area</h3>
            <div className="flex items-center mt-2">
              <label className="mr-2">Room Name:</label>
              <input
                type="text"
                value={areas[selectedArea]?.name || ''}
                onChange={(e) => updateAreaName(selectedArea, e.target.value)}
                className="border p-1 flex-grow"
              />
              <button 
                onClick={() => deleteArea(selectedArea)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
        
        <div className="text-sm mb-2">
          <p><strong>Instructions:</strong></p>
          <p>1. Upload a floorplan image</p>
          <p>2. Click and drag to draw areas around rooms</p>
          <p>3. Click on an area to edit its properties</p>
          <p>4. Generate code when finished</p>
        </div>
      </div>
      
      <div ref={containerRef} className="relative flex-grow border rounded mb-4" style={{ minHeight: "400px" }}>
        {image ? (
          <canvas
            ref={canvasRef}
            width={imageSize.width * scale}
            height={imageSize.height * scale}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="cursor-crosshair"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200" style={{ minHeight: "400px" }}>
            <p>Upload a floorplan image to begin</p>
          </div>
        )}
        {image && (
          <img
            ref={imageRef}
            src={image}
            alt="Floorplan"
            className="hidden"
          />
        )}
      </div>
      
      {areas.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated Code</h2>
          <div className="flex gap-4 flex-col">
            <div className="flex-1">
              <h3 className="font-bold">React Component (Next.js)</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-auto" style={{ maxHeight: "300px" }}>
                {generateCode().nextJsCode}
              </pre>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">CSS Module</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-auto" style={{ maxHeight: "300px" }}>
                {generateCode().cssCode}
              </pre>
            </div>
          </div>
          <div className="bg-blue-100 border-blue-300 border p-3 rounded mt-4">
            <p className="text-blue-800 text-sm">
              <strong>Implementation Notes:</strong><br/>
              1. Save the generated component as <code>FloorPlan.js</code> and CSS as <code>FloorPlan.module.css</code><br/>
              2. Prepare room images named according to the pattern: <code>/rooms/room-name.jpg</code><br/>
              3. Import and use the component in your page: <code>{`<FloorPlan floorplanImage="/path/to/floorplan.jpg" />`}</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}