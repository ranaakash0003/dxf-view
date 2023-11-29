import React, { useEffect } from 'react';
import * as THREE from 'three';
import DXFParser from 'dxf-parser';

const DXFViewer = ({ dxfFilePath }) => {

  useEffect(() => {

    fetch(dxfFilePath)
      .then((response) => response.text())
      .then((data) => {
     

        if (data)  {
        const parser = new DXFParser();
        const dxfData = parser.parse(data);
        // Use tree.js to render the DXF data
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('dxf-container').appendChild(renderer.domElement);

        // Add your rendering logic using three.js based on the parsed DXF data
            // Example: iterate over entities and create corresponding three.js objects
    dxfData.entities.forEach((entity) => {
      if (entity.type === 'LINE' && entity.vertices && entity.vertices.length === 2) {
        // Create a three.js line based on the DXF line data
        const geometry = new THREE.BufferGeometry();
       
        const vertices = new Float32Array([
          entity.vertices[0].x, entity.vertices[0].y, entity.vertices[0].z,
          entity.vertices[1].x, entity.vertices[1].y, entity.vertices[1].z,
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        
      } else if (entity.type === 'CIRCLE') {
        // Create a three.js circle based on the DXF circle data
        // ... (similar logic for other entity types)
      }
      // Add more conditions based on the entity types you want to handle
    });

        camera.position.z = 5;


        const animate = () => {
          requestAnimationFrame(animate);
          // Update your three.js scene here
          renderer.render(scene, camera);
        };

        animate();

        return () => {
          // Clean up code (if needed) when the component is unmounted
        };
      } else {
        console.error('No valid entities found in DXF data.');
      }
})
  }, [dxfFilePath]);

  return <div id="dxf-container" />;
}

export default DXFViewer;
