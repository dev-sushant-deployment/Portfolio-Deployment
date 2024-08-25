import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { SlimeBall } from "./SlimeBall";

interface CursorProps {
  clientX: number;
  clientY: number;
}

export const Cursor: React.FC<CursorProps> = ({ clientX, clientY }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        duration: 0,
        x: clientX,
        y: clientY,
        ease: "power4.out"
      });
    }
  }, [clientX, clientY, cursorRef]);
  return (
    <div className={`rounded-full fixed z-[9999] mix-blend-difference pointer-events-none -translate-x-1/2 -translate-y-1/2`} ref={cursorRef}>
      <Canvas>
        <SlimeBall radius={0.5} distortion={0.5} distortionSpeed={2} color={"white"} clientX={clientX} displace={false} animateScale scaleFactor={12}/>
        <ambientLight intensity={100} color={"white"}/>
      </Canvas>
    </div>
  );
};