import React, { useRef, useEffect } from 'react';
import DXFParser from 'dxf-parser';

const DXFViewer = ({ dxfFilePath }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    let ctx = canvas.getContext('2d');
    console.log( 'Parsed DXF entities:',  ctx); 


    // Fetch the DXF file
    fetch(dxfFilePath)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DXFParser();
        const dxf = parser.parseSync(data);

       

        if (dxf && dxf.entities && dxf.entities.length > 0)  {
          

          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

          ctx.strokeStyle = 'black'; // Set the stroke color

          dxf.entities.forEach((entity) => {
            if (entity.type === 'LINE' && entity.vertices && entity.vertices.length === 2) {
              const startPoint = entity.vertices[0];
              const endPoint = entity.vertices[1];
              ctx.beginPath();
              ctx.moveTo(startPoint.x, startPoint.y);
              ctx.lineTo(endPoint.x, endPoint.y);
              ctx.stroke();

            }
            // Add handling for other entity types if needed
          });
        } else {
          console.error('No valid entities found in DXF data.');
        }
      })
      .catch((error) => {
        console.error('Error fetching/parsing DXF:', error);
      });
  }, [dxfFilePath]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  )
};

export default DXFViewer;
