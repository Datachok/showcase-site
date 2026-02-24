'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/theme-context';

interface Color { r: number; g: number; b: number; a: number }

const COLORS_LIGHT: Color[] = [
  { r: 183, g: 207, b: 183, a: 0.12 },
  { r: 143, g: 184, b: 143, a: 0.10 },
  { r: 212, g: 197, b: 249, a: 0.10 },
  { r: 255, g: 218, b: 179, a: 0.08 },
  { r: 255, g: 209, b: 220, a: 0.08 },
  { r: 200, g: 230, b: 208, a: 0.10 },
];

const COLORS_DARK: Color[] = [
  { r: 74, g: 122, b: 74, a: 0.10 },
  { r: 58, g: 79, b: 58, a: 0.08 },
  { r: 80, g: 70, b: 120, a: 0.08 },
  { r: 92, g: 74, b: 53, a: 0.07 },
  { r: 90, g: 60, b: 70, a: 0.06 },
  { r: 60, g: 95, b: 70, a: 0.08 },
];

const PARTICLES_LIGHT = { r: 200, g: 180, b: 120, a: 0.25 };
const PARTICLES_DARK = { r: 180, g: 160, b: 100, a: 0.15 };

interface Petal {
  x: number; y: number; size: number; depth: number;
  rotation: number; rotSpeed: number; vx: number; vy: number;
  color: Color; scaleX: number; scaleY: number;
  wobble: number; wobbleSpeed: number; wobbleAmp: number;
  petalType: 'single' | 'double';
}

interface Particle {
  x: number; y: number; size: number; speed: number;
  angle: number; drift: number; pulse: number; pulseSpeed: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;
    let petals: Petal[] = [];
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animId: number;

    function getColors() {
      return themeRef.current === 'dark' ? COLORS_DARK : COLORS_LIGHT;
    }
    function getParticleColor() {
      return themeRef.current === 'dark' ? PARTICLES_DARK : PARTICLES_LIGHT;
    }

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    function createPetal(): Petal {
      const colors = getColors();
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 40 + Math.random() * 140;
      const depth = 0.3 + Math.random() * 0.7;
      return {
        x: Math.random() * width, y: Math.random() * height,
        size, depth, rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004 * depth,
        vx: (Math.random() - 0.5) * 0.2 * depth,
        vy: (-0.05 - Math.random() * 0.15) * depth,
        color, scaleX: 0.5 + Math.random() * 0.5,
        scaleY: 0.7 + Math.random() * 0.3,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.004 + Math.random() * 0.008,
        wobbleAmp: 0.2 + Math.random() * 0.6,
        petalType: Math.random() > 0.6 ? 'double' : 'single',
      };
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * width, y: Math.random() * height,
        size: 1 + Math.random() * 2.5, speed: 0.15 + Math.random() * 0.35,
        angle: Math.random() * Math.PI * 2, drift: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    }

    function init() {
      const count = Math.min(Math.floor((width * height) / 28000), 35);
      petals = Array.from({ length: count }, createPetal);
      const pCount = Math.min(Math.floor((width * height) / 15000), 50);
      particles = Array.from({ length: pCount }, createParticle);
    }

    function drawPetal(p: Petal) {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.scale(p.scaleX, p.scaleY);
      const s = p.size;
      const { r, g, b, a } = p.color;

      ctx!.beginPath();
      ctx!.moveTo(0, -s * 0.5);
      ctx!.bezierCurveTo(s * 0.35, -s * 0.35, s * 0.4, s * 0.1, 0, s * 0.5);
      ctx!.bezierCurveTo(-s * 0.4, s * 0.1, -s * 0.35, -s * 0.35, 0, -s * 0.5);
      ctx!.closePath();
      ctx!.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.moveTo(0, -s * 0.4);
      ctx!.quadraticCurveTo(s * 0.02, 0, 0, s * 0.4);
      ctx!.strokeStyle = `rgba(${r},${g},${b},${a * 0.4})`;
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      if (p.petalType === 'double') {
        ctx!.rotate(0.6);
        ctx!.scale(0.6, 0.7);
        ctx!.beginPath();
        ctx!.moveTo(0, -s * 0.4);
        ctx!.bezierCurveTo(s * 0.28, -s * 0.28, s * 0.32, s * 0.08, 0, s * 0.4);
        ctx!.bezierCurveTo(-s * 0.32, s * 0.08, -s * 0.28, -s * 0.28, 0, -s * 0.4);
        ctx!.closePath();
        ctx!.fillStyle = `rgba(${r},${g},${b},${a * 0.7})`;
        ctx!.fill();
      }
      ctx!.restore();
    }

    function drawParticle(p: Particle) {
      const c = getParticleColor();
      p.pulse += p.pulseSpeed;
      const alpha = c.a * (0.5 + 0.5 * Math.sin(p.pulse));
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
      ctx!.fill();
    }

    function updatePetal(p: Petal) {
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120 + (1 - p.depth) * 60;
      if (dist < radius) {
        const force = ((radius - dist) / radius) * 0.6 * p.depth;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      if (p.y < -p.size) { p.y = height + p.size; p.x = Math.random() * width; }
      if (p.y > height + p.size) { p.y = -p.size; p.x = Math.random() * width; }
      if (p.x < -p.size) p.x = width + p.size;
      if (p.x > width + p.size) p.x = -p.size;
    }

    function updateParticle(p: Particle) {
      p.x += Math.cos(p.angle) * p.speed + p.drift;
      p.y += Math.sin(p.angle) * p.speed;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      particles.forEach(p => { updateParticle(p); drawParticle(p); });
      petals.forEach(p => { updatePetal(p); drawPetal(p); });
      animId = requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();

    const onResize = () => { resize(); init(); };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  return <canvas ref={canvasRef} id="bg-canvas" />;
}
