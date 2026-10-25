import React, { useEffect, useRef } from 'react';

export const HeroCanvasShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with smooth interpolation
    let mouse = { x: width * 0.5, y: height * 0.4, targetX: width * 0.5, targetY: height * 0.4 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for subtle cyber constellation mesh
    const particleCount = Math.min(45, Math.floor(width / 32));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.35 + 0.15,
      hue: Math.random() > 0.6 ? 220 : 270, // Blue or Violet
    }));

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear with deep obsidian tint
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, width, height);

      // 1. Dynamic Radial Gradient centered near cursor with cyber glow
      const grad1 = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.6
      );
      grad1.addColorStop(0, 'rgba(59, 130, 246, 0.14)'); // Electric blue
      grad1.addColorStop(0.35, 'rgba(139, 92, 246, 0.08)'); // Cyber violet
      grad1.addColorStop(0.7, 'rgba(212, 175, 55, 0.02)'); // Subtle gold dust
      grad1.addColorStop(1, 'rgba(3, 3, 5, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // 2. Secondary ambient breathing light
      const cx = width * 0.7 + Math.sin(time * 0.5) * 120;
      const cy = height * 0.3 + Math.cos(time * 0.6) * 90;
      const grad2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.45);
      grad2.addColorStop(0, 'rgba(139, 92, 246, 0.09)');
      grad2.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      grad2.addColorStop(1, 'rgba(3, 3, 5, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3. Mathematical Wave Curvature (Luxurious undulating ribbons)
      ctx.lineWidth = 1;
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const yOffset = height * (0.45 + w * 0.12);
        const mouseFactor = (mouse.y - yOffset) * 0.15;
        const color =
          w === 0
            ? 'rgba(59, 130, 246, 0.18)'
            : w === 1
            ? 'rgba(139, 92, 246, 0.15)'
            : 'rgba(212, 175, 55, 0.09)';

        ctx.strokeStyle = color;

        for (let x = 0; x <= width; x += 15) {
          const distToMouse = Math.abs(x - mouse.x);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 400);
          const y =
            yOffset +
            Math.sin(x * 0.003 + time + w) * 35 +
            Math.cos(x * 0.007 - time * 0.8) * 20 +
            mouseFactor * mouseInfluence;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 4. Interactive Constellation Network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse attraction repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === 220
            ? `rgba(96, 165, 250, ${p.baseAlpha})`
            : `rgba(167, 139, 250, ${p.baseAlpha})`;
        ctx.fill();

        // Connect adjacent particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (pDist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - pDist / 130) * 0.12})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80"
    />
  );
};
