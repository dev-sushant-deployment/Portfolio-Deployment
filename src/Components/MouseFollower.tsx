import gsap from "gsap";
import { useEffect, useRef } from "react";

interface MouseFollowerProps {
  clientX: number;
  clientY: number;
}

export const MouseFollower: React.FC<MouseFollowerProps> = ({ clientX, clientY }) => {
  const mouseFollowerRef = useRef<HTMLDivElement>(null);
  const mouseFollowerBorderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mouseFollowerRef.current) {
      gsap.to(mouseFollowerRef.current, {
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
  }, [clientX, clientY, mouseFollowerRef, mouseFollowerBorderRef]);
  return (
    <>
      <div className="bg-white rounded-full h-5 w-5 fixed z-[9999]" ref={mouseFollowerRef}></div>
      <div className="bg-transparent rounded-full border-2 h-8 w-8 fixed z-[9999] border-white" ref={mouseFollowerBorderRef}></div>
    </>
  );
};