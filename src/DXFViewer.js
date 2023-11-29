import React, { useEffect } from 'react';
import DXFParser from 'dxf-parser';

const DXFViewer = ({ dxfFilePath }) => {
  useEffect(() => {
    const canvas = document.getElementById('dxf-canvas');
    const ctx = canvas.getContext('2d');

    fetch(dxfFilePath)
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          const parser = new DXFParser();
          const dxfData = parser.parse(data);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          console.log('DXF Data`````:', dxfData);


          dxfData.entities.slice(0,6).forEach((entity,idx) => {
            console.log('hhhhhhhhhhh',idx);
            if (entity.type === 'LINE') {
              const start = entity.vertices[0];
              const end = entity.vertices[1];
              ctx.beginPath();
              ctx.moveTo(start.x, start.y);
              ctx.lineTo(end.x, end.y);
              ctx.strokeStyle = 'green';
              ctx.stroke();
            }
            
            else if (entity.type === 'CIRCLE') {
              const center = entity.center;
              const radius = entity.radius;
              ctx.beginPath();
              ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
              ctx.strokeStyle = 'blue';
              ctx.stroke();
            }

          });
        

        } else {
          console.error('No valid entities found in DXF data.');
        }
      });
  }, [dxfFilePath]);

  return <canvas id="dxf-canvas" width={window.innerWidth} height={window.innerHeight} />;
};

export default DXFViewer;
