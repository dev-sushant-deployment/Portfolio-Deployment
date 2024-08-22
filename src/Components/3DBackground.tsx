import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface I3DBackgroundProps {}

export const ThreeDBackground: React.FC<I3DBackgroundProps> = ({}) => {
  const orbitControlRef = useRef<any>(null);
  useFrame((state) => {
    if (orbitControlRef.current) {
      const { x, y } = state.mouse;
      orbitControlRef.current.setAzimuthalAngle(-x * Math.PI);
      orbitControlRef.current.setPolarAngle((y+0.5) * Math.PI);
      orbitControlRef.current.update();
    }
  })
  const torousRef = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (torousRef.current) {
      gsap.to(torousRef.current.rotation, {
        x: Math.PI*2,
        y: Math.PI,
        duration: 30,
        repeat: -1,
        ease: "none"
      });
    }
  }, [torousRef.current]);
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 8]}/>
      <OrbitControls ref={orbitControlRef}/>
      <mesh position={[0, 0, 0]} scale={2} ref={torousRef}>
        <torusGeometry args={[1, 0.3, 16, 100]}/>
        <meshStandardMaterial color="white" metalness={0.6} roughness={0.1}/>
      </mesh>

      <ambientLight intensity={3} color={"white"}/>
      <spotLight position={[-2,2,1]} angle={3} intensity={3} color="gray"/>
      <spotLight position={[2,-2,-1]} angle={3} intensity={3} color="gray"/>
    </>
  );
};