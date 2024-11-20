import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const StarfallEffectModal = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const maxStars = 100; // Number of stars
    const starColor = "#FFD700"; // Yellow color for stars

    // Star constructor
    function Star() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.speed = Math.random() * 1 + 0.5;

      this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = starColor;
        ctx.fill();
        ctx.closePath();
      };

      this.update = function () {
        this.y += this.speed;

        // Reset star position if it falls off the canvas
        if (this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = 0 - this.radius;
        }

        this.draw();
      };
    }

    // Initialize stars
    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => star.update());
      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup when modal closes
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      {/* Canvas for Starfall Effect */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: -1 }}
      ></canvas>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Welcome to the Starfall Modal!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This modal contains a beautiful yellow starfall effect in the
          background.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default StarfallEffectModal;
