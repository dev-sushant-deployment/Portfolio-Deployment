import { MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { SlimeBall } from "./SlimeBall";
import { useSlimeBall } from "../../Context/slimeBall";

interface I3DBackgroundProps {
  clientX: number;
}

export const ThreeDBackground: React.FC<I3DBackgroundProps> = ({ clientX }) => {
  const { slimeBallColor } = useSlimeBall();
  const torousRef = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (torousRef.current) {
      gsap.to(torousRef.current.rotation, {
        x: Math.PI*4,
        y: Math.PI*2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, [torousRef.current]);
  const { scale } = useSlimeBall();
  useEffect(() => {
    if (torousRef.current) {
      gsap.to(torousRef.current.scale, {
        x: scale*2,
        y: scale*2,
        z: scale*2,
        duration: 1,
        ease: "power4.out"
      });
    }
  }, [scale]);
  return (
    <>
      <mesh position={[0, 0, 0]} scale={2} ref={torousRef}>
        <torusGeometry args={[1, 0.13, 50, 100]}/>
        <MeshDistortMaterial attach="material" color={slimeBallColor} distort={0.2} speed={2} metalness={0.9} roughness={0.1}/>
      </mesh>
      <SlimeBall radius={1} distortion={0.5} distortionSpeed={2} color={slimeBallColor} clientX={clientX} displace animateScale/>

      <ambientLight intensity={3} color={"white"}/>
      <spotLight position={[-3, 2, 2]} angle={10} intensity={100} color="white"/>
    </>
  );
};