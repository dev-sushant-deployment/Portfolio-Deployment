import { useEffect, useRef } from "react";

interface MouseFollowerProps {
  clientX: number;
  clientY: number;
}

export const MouseFollower: React.FC<MouseFollowerProps> = ({ clientX, clientY }) => {
  const mouseFollowerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mouseFollowerRef.current) {
      mouseFollowerRef.current.style.left = `${clientX}px`;
      mouseFollowerRef.current.style.top = `${clientY}px`;
    }
  }, [clientX, clientY, mouseFollowerRef]);
  return (
    <div className="bg-red-600 rounded-full h-10 w-10 fixed z-[9999]" ref={mouseFollowerRef}></div>
  );
};