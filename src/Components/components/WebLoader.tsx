import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface WebLoaderProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const WebLoader : React.FC<WebLoaderProps> = ({ setLoading }) => {
  const [percentages, setPercentages] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * (5-2+1) + 2)
      setPercentages((prev) => Math.min(prev + increment, 100));
      if (percentages >= 100) {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  },[])
  useEffect(() => {
    if (percentages >= 100) {
      setTimeout(() => setLoading(false), 500)
    }
  },[percentages])
  return (
    <div className="w-lvw h-lvh flex flex-col gap-5 justify-center items-center bg-[#111111] cursor-default">
      <div className="flex text-white items-end gap-2">
        <p className="roboto-condensed-900 text-3xl -bottom-[3px] relative">S</p>
        <p className="roboto-condensed-800 text-2xl -bottom-[3px] relative">U</p>
        <p className="roboto-condensed-700 text-xl -bottom-[2px] relative">S</p>
        <p className="roboto-condensed-600 text-lg -bottom-[3px] relative">H</p>
        <p className="roboto-condensed-500 text-md -bottom-[1px] relative">A</p>
        <p className="roboto-condensed-400 text-sm -bottom-[0px] relative">N</p>
        <p className="roboto-condensed-400 text-sm -bottom-[0px] relative">T</p>
        <p className="roboto-condensed-500 text-md -bottom-[1px] relative">W</p>
        <p className="roboto-condensed-600 text-lg -bottom-[3px] relative">A</p>
        <p className="roboto-condensed-700 text-xl -bottom-[2px] relative">Y</p>
        <p className="roboto-condensed-800 text-2xl -bottom-[3px] relative">A</p>
        <p className="roboto-condensed-900 text-3xl -bottom-[3px] relative">L</p>
      </div>
      <p className="text-white text-4xl">{percentages}%</p>
      <div
        style={{
          background: `linear-gradient(to right, white 0%, white ${percentages}%, black ${percentages}%, black 100%)`,
        }}
      className="h-px w-40"></div>
    </div>
  )
}