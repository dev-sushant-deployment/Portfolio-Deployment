import { Suspense, useEffect, useState } from "react"
import { ThreeDBackground } from "./Components/components/3DBackground"
import { Canvas } from "@react-three/fiber"
import { Cursor } from "./Components/components/Cursor"
import { Navbar } from "./Components/components/Navbar"
import { Outlet } from "react-router-dom"
import { SlimeBallProvider } from "./Context/slimeBall"
// import { Footer } from "./Components/components/Footer"

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
  const [slimeBallColor, setSlimeBallColor] = useState<string>("white");
  const [scale, setScale] = useState<number>(1);
  return (
    <div>
      <SlimeBallProvider value={{slimeBallColor, setSlimeBallColor, scale, setScale}}>
        <Cursor clientX={clientX} clientY={clientY}/>
        <div className="fixed h-lvh w-lvw z-[-1] bg-[#111111]">
          <Canvas className="h-full w-full">
            <Suspense fallback={null}>
              <ThreeDBackground clientX={clientX}/>
            </Suspense>
          </Canvas>
        </div>
        <Navbar/>
        <Outlet/>
        {/* <Footer/> */}
      </SlimeBallProvider>
    </div>
  )
}

export default App
