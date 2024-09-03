import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticCircleProps {
  size: string;
  range: number;
  strength: number;
  color: string;
  PrimaryText: string;
  secondaryText?: string;
  className?: string;
}

export const MagneticCircle: React.FC<MagneticCircleProps> = ({size, range, strength, color, PrimaryText, secondaryText, className}) => {
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
        scale: 1.2,
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
    <div style={{height: size, width: size, backgroundColor: color}} className={`rounded-full flex justify-center items-center flex-col relative z-[10000] text-white ${className}`} ref={circleRef}>
      <p>{PrimaryText}</p>
      {secondaryText && <p>{secondaryText}</p>}
    </div>
  );
};