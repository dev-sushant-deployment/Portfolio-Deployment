import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children?: React.ReactNode;
  height: string;
  width?: string;
  range: number;
  strength: number;
  color: string;
  className?: string;
  scale?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({children, height, width, range, strength, color, className, scale}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = ({clientX, clientY} : {
    clientX: number;
    clientY: number;
  }) => {
    const x = clientX;
    const y = clientY;
    const radius = (circleRef.current?.offsetWidth || 0) / 2;
    const circleX = (circleRef.current?.getBoundingClientRect().left || 0)+ radius;
    const circleY = (circleRef.current?.getBoundingClientRect().top || 0) + radius;
    const dx = x - circleX;
    const dy = y - circleY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < range) {
      gsap.to(circleRef.current, {
        duration: 0.5,
        scale: scale || 1.2,
        top: dy*strength,
        left: dx*strength
      });
    }
    else {
      gsap.to(circleRef.current, {
        duration: 0.5,
        scale: 1,
        top: 0,
        left: 0
      });
    }
  }
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  },[circleRef]);
  return (
    <div style={{height, width: width || height, backgroundColor: color}} className={`relative z-[10000] ${className}`} ref={circleRef}>
      {children}
    </div>
  );
};