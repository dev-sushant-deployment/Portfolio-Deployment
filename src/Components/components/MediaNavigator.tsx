import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MediaNavigatorProps {
  projectName: string;
  numberOfMedia: number;
}

export const MediaNavigator: React.FC<MediaNavigatorProps> = ({projectName, numberOfMedia}) => {
  const navigatorRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const moveToLeft = () => {
    navigatorRef.current?.scrollTo({
      left: navigatorRef.current?.clientWidth*(index-1),
      behavior: "smooth"
    });
    setIndex(index-1);
  }
  const moveToRight = () => {
    navigatorRef.current?.scrollTo({
      left: navigatorRef.current?.clientWidth*(index+1),
      behavior: "smooth"
    });
    setIndex(index+1);
  }
  useEffect(() => {
    const navigateLeft = document.getElementById("navigateLeft");
    const navigateRight = document.getElementById("navigateRight");
    const navigateLeft_ = document.getElementById("navigateLeft_");
    const navigateRight_ = document.getElementById("navigateRight_");
    navigateLeft?.addEventListener("click", moveToLeft);
    navigateRight?.addEventListener("click", moveToRight);
    navigateLeft_?.addEventListener("click", moveToLeft);
    navigateRight_?.addEventListener("click", moveToRight);
    return () => {
      navigateLeft?.removeEventListener("click", moveToLeft);
      navigateRight?.removeEventListener("click", moveToRight);
      navigateLeft_?.removeEventListener("click", moveToLeft);
      navigateRight_?.removeEventListener("click", moveToRight);
    }
  }, [index]);
  return (
    <div className="w-[90vw] sm:w-[72vw] aspect-video relative flex flex-col gap-5 items-center">
      <div className="w-full h-full overflow-x-scroll overflow-y-hidden flex" ref={navigatorRef}>
        {[...Array(numberOfMedia)].map((_, index) => (
          <img src={`../../../ScreenShots/${projectName}/SS${index+1}.webp`} alt={`${projectName}_SS_${index+1}`} key={index} className="w-full h-full object-contain flex-shrink-0" />
        ))}
      </div>
      <div className="hidden md:block">
        <button className={index > 0 ? "" : "hidden"}>
          <ArrowLeftCircle id="navigateLeft" className="absolute left-0 top-[50%] -translate-y-1/2 -translate-x-full" size={50} color="white"/>
        </button>
        <button className={index < numberOfMedia-1 ? "" : "hidden"}>
          <ArrowRightCircle id="navigateRight" className="absolute right-0 top-[50%] -translate-y-1/2 translate-x-full" size={50} color="white"/>
        </button>
      </div>
      <div className="md:hidden flex justify-center gap-5">
        <button className={index > 0 ? "" : "hidden"}>
          <ArrowLeftCircle id="navigateLeft_" size={50} color="white"/>
        </button>
        <button className={index < numberOfMedia-1 ? "" : "hidden"}>
          <ArrowRightCircle id="navigateRight_" size={50} color="white"/>
        </button>
      </div>
    </div>
  );
};