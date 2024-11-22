import React, { useEffect, useRef, useState } from 'react';

const BackgroundCanvas = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const [focusDistance, setFocusDistance] = useState(300);

  // Resize canvas on window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollRatio = window.scrollY / maxScroll;
      setFocusDistance(100 + scrollRatio * 900);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const blurIntensity = 10;
      const imageDistance = 300;
      const distanceDifference = Math.abs(imageDistance - focusDistance);
      const blurAmount = Math.min(
        blurIntensity,
        (distanceDifference / focusDistance) * blurIntensity
      );

      const widthRatio = canvas.width / image.width;
      const heightRatio = canvas.height / image.height;
      const scale = Math.min(widthRatio, heightRatio);

      const width = image.width * scale;
      const height = image.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(image, x, y, width, height);
      ctx.filter = 'none';
    };

    image.onload = draw;
  }, [imageSrc, focusDistance]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0 }} />;
};

export default BackgroundCanvas;
