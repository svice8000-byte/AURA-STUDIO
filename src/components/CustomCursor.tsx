import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorType = 'default' | 'link' | 'button' | 'card' | 'input';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer magnetic ring (buttery response, ~120ms settling)
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if the device has a mouse/fine pointer (do not render on touch devices)
    if (typeof window === 'undefined') return;
    const fineMatch = window.matchMedia('(pointer: fine)');
    setIsFinePointer(fineMatch.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    fineMatch.addEventListener('change', handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Inspect target under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveCard = target.closest('[data-cursor="card"], #servicios .glass-panel');
      const interactiveButton = target.closest('button, [data-cursor="button"], .btn-magnetic');
      const interactiveLink = target.closest('a, [data-cursor="link"]');
      const interactiveInput = target.closest('input, textarea, select');

      if (interactiveButton) {
        setCursorType('button');
        setCursorText('');
      } else if (interactiveCard) {
        setCursorType('card');
        setCursorText('VER');
      } else if (interactiveLink) {
        setCursorType('link');
        setCursorText('');
      } else if (interactiveInput) {
        setCursorType('input');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      fineMatch.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isFinePointer || !isVisible) return null;

  // Variants for the outer magnetic ring
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      borderColor: 'rgba(59, 130, 246, 0.4)',
      borderWidth: 1.5,
      scale: isClicking ? 0.8 : 1,
    },
    link: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(139, 92, 246, 0.12)',
      borderColor: 'rgba(139, 92, 246, 0.65)',
      borderWidth: 1.5,
      scale: isClicking ? 0.9 : 1,
    },
    button: {
      width: 58,
      height: 58,
      backgroundColor: 'rgba(59, 130, 246, 0.18)',
      borderColor: 'rgba(212, 175, 55, 0.7)',
      borderWidth: 1.5,
      scale: isClicking ? 0.85 : 1,
    },
    card: {
      width: 68,
      height: 68,
      backgroundColor: 'rgba(12, 12, 22, 0.75)',
      borderColor: 'rgba(212, 175, 55, 0.45)',
      borderWidth: 1.5,
      scale: isClicking ? 0.9 : 1,
    },
    input: {
      width: 24,
      height: 24,
      backgroundColor: 'transparent',
      borderColor: 'rgba(96, 165, 250, 0.5)',
      borderWidth: 1,
      scale: 0.9,
    },
  };

  return (
    <>
      {/* Precision Center Dot - Zero latency, anchored directly to mouseX / mouseY */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'button' ? 0.5 : cursorType === 'card' ? 0 : 1,
          opacity: cursorType === 'input' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
      </motion.div>

      {/* Smooth Spring-Driven Outer Magnetic Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
          mass: 0.4,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-mono tracking-widest text-[#D4AF37] font-semibold select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
