import { MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface SlimeBallProps {
  radius: number;
  distortion: number;
  distortionSpeed: number;
  color: string;
  clientX: number;
  displace: boolean;
}

export const SlimeBall : React.FC<SlimeBallProps> = ({ radius, distortion, distortionSpeed, color, clientX, displace }) => {
  const ballRef = useRef<THREE.Mesh>(null);
  const ballMaterialRef = useRef<any>(null);
  useEffect(() => {
    if (ballRef.current && displace) {
      let displacement = clientX-(window.innerWidth/2);
      gsap.to(ballRef.current.position, {
        x: displacement/500,
        duration: 1,
        ease: "power4.out"
      });
      gsap.to(ballMaterialRef.current, {
        distort: distortion == 0 ? 0 : Math.min((Math.abs(displacement)/1.5)+distortion, 0.8),
        duration: 1,
        ease: "power4.out"
      });
    }
  }, [clientX, ballRef.current, ballMaterialRef.current]);
  return (
    <mesh ref={ballRef}>
      <sphereGeometry args={[radius, 50*radius, 50*radius]}/>
      <MeshDistortMaterial attach="material" color={color} distort={distortion} speed={distortionSpeed} metalness={0.9} roughness={0.1} ref={ballMaterialRef}/>
    </mesh>
  )
}