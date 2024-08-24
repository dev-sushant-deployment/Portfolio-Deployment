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
  const mouseFollowerBorderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        duration: 0,
        x: clientX,
        y: clientY,
        ease: "power4.out"
      });
    }
    if (mouseFollowerBorderRef.current) {
      gsap.to(mouseFollowerBorderRef.current, {
        duration: 1,
        x: clientX-6,
        y: clientY-6,
        ease: "power4.out"
      });
    }
  }, [clientX, clientY, cursorRef, mouseFollowerBorderRef]);
  return (
    <>
      <div className="rounded-full h-5 w-5 fixed z-[9999] flex flex-col justify-center items-center mix-blend-difference" ref={cursorRef}>
        <Canvas className="h-full w-full">
          <SlimeBall radius={2.5} distortion={0.5} distortionSpeed={2} color={"white"} clientX={clientX} displace={false}/>
          <ambientLight intensity={100} color={"white"}/>
        </Canvas>
      </div>
      <div className="bg-transparent rounded-full border-2 h-8 w-8 fixed z-[9999] border-white" ref={mouseFollowerBorderRef}></div>
    </>
  );
};