import { MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useLoader } from "@react-three/fiber";
import { useSlimeBall } from "../../Context/slimeBall";

interface SlimeBallProps {
  radius: number;
  distortion: number;
  distortionSpeed: number;
  color: string;
  clientX: number;
  displace: boolean;
  position?: [number, number, number];
  animateScale?: boolean;
  texture?: string;
  scaleFactor?: number;
}

export const SlimeBall : React.FC<SlimeBallProps> = ({ radius, distortion, distortionSpeed, color, clientX, displace, position, animateScale, texture, scaleFactor }) => {
  const ballRef = useRef<THREE.Mesh>(null);
  const ballMaterialRef = useRef<any>(null);
  let textureMap;
  if (texture) textureMap = useLoader(THREE.TextureLoader, texture);
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
  const { scale } = useSlimeBall();
  useEffect(() => {
    if (ballRef.current && animateScale) {
      gsap.to(ballRef.current.position, {
        z: (scale-1)*(scaleFactor || 5),
        duration: 1,
        ease: "power4.out"
      });
    }
  }, [scale]);
  return (
    <mesh position={position || [0,0,0]} ref={ballRef}>
      <sphereGeometry args={[radius, 50*radius, 50*radius]}/>
      <MeshDistortMaterial attach="material" color={color} distort={distortion} speed={distortionSpeed} metalness={0.9} roughness={0.1} ref={ballMaterialRef} map={textureMap || undefined}/>
    </mesh>
  )
}