// OrbitCanvas.js
import React, { useRef, useEffect, useState } from 'react';

const OrbitCanvas = ({ backgroundColor ,width, height }) => {
  const canvasRef = useRef(null);
  const [objects, setObjects] = useState([]);
  const [sunSize, setSunSize] = useState(30); // Init

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    canvas.style.backgroundColor = backgroundColor;

    const sun = {
      x: width / 2,
      y: height / 2,
      radius: sunSize,
      color: 'yellow',
    };

    // Function to draw the sun with a gradient glow
    const drawSun = () => {
      const sunGradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.radius);
      sunGradient.addColorStop(0, 'rgba(255, 204, 0, 1)');
      sunGradient.addColorStop(0.5, 'rgba(255, 204, 0, 0.8)');
      sunGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Function to draw an orbiting object
    const drawObject = (object) => {
      ctx.fillStyle = object.color;
      ctx.beginPath();
      ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      drawSun();

      objects.forEach((object, index) => {
        object.angle += object.speed;
        const distance = object.distance - object.speed * 5; // Move object towards the sun
        object.distance = distance <= 0 ? 0 : distance;
        object.x = sun.x + object.distance * Math.cos(object.angle);
        object.y = sun.y + object.distance * Math.sin(object.angle);

        // If object reaches the sun, make the sun "pulse"
        if (object.distance <= 0) {
          setSunSize(sunSize + 10);
          setTimeout(() => setSunSize(30), 100); // Reset sun size after 100ms
          objects.splice(index, 1); // Remove object from array
        } else {
          drawObject(object);
        }
      });
    };

    animate();
  }, [objects, sunSize, width, height]);

  // Expose method to add objects
  const addObject = () => {
    const newObject = {
      x: width / 2,
      y: height / 2 - 200, // Start position for new object
      radius: 10,
      color: 'blue',
      speed: 0.01,
      distance: 400, // Initial distance from the sun
      angle: 0,
    };
    setObjects([...objects, newObject]);
  };

  return (
    <>
      <canvas ref={canvasRef} />
      <button onClick={addObject}>Add Object</button>
    </>
  );
};

export default OrbitCanvas;
