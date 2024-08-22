import { Suspense, useEffect, useState } from "react"
import { ThreeDBackground } from "./Components/3DBackground"
import { Canvas } from "@react-three/fiber"
import { MouseFollower } from "./Components/MouseFollower"

interface AppProps {}

export const App : React.FC<AppProps> = ({}) => {
  const [clientX, setClientX] = useState<number>(0);
  const [clientY, setClientY] = useState<number>(0);
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setClientX(e.clientX);
      setClientY(e.clientY);
    });
  }, []);
  return (
    <>
      <MouseFollower clientX={clientX} clientY={clientY}/>
      <div className="fixed h-lvh w-lvw">
        <Canvas className="h-full w-full">
          <Suspense fallback={null}>
            <ThreeDBackground/>
          </Suspense>
        </Canvas>
      </div>
      <div className="h-lvh w-lvw text-white">
        <p className="">Sushant</p>
        <p className="">Wayal</p>
      </div>
    </>
  )
}

export default App
