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
    console.log("go left ; index", index);
    navigatorRef.current?.scrollTo({
      left: navigatorRef.current?.clientWidth*(index-1),
      behavior: "smooth"
    });
    setIndex(index-1);
  }
  const moveToRight = () => {
    console.log("go right ; index", index);
    navigatorRef.current?.scrollTo({
      left: navigatorRef.current?.clientWidth*(index+1),
      behavior: "smooth"
    });
    setIndex(index+1);
  }
  useEffect(() => {
    const navigateLeft = document.getElementById("navigateLeft");
    const navigateRight = document.getElementById("navigateRight");
    if (navigateLeft && navigateRight) {
      navigateLeft.addEventListener("click", moveToLeft);
      navigateRight.addEventListener("click", moveToRight);
    }
    return () => {
      if (navigateLeft && navigateRight) {
        navigateLeft.removeEventListener("click", moveToLeft);
        navigateRight.removeEventListener("click", moveToRight);
      }
    }
  }, [index]);
  return (
    <div className="w-[72vw] h-[84vh] relative">
      <div className="w-full h-full overflow-x-scroll overflow-y-hidden flex" ref={navigatorRef}>
        {[...Array(numberOfMedia)].map((_, index) => (
          <img src={`../../../ScreenShots/${projectName}/SS${index+1}.png`} alt={`${projectName}_SS_${index+1}`} key={index} className="w-full h-full object-contain flex-shrink-0" />
        ))}
      </div>
      <button className={index > 0 ? "" : "hidden"}>
        <ArrowLeftCircle id="navigateLeft" className="absolute left-0 top-[50%] transform -translate-y-1/2 -translate-x-full" size={50} color="white"/>
      </button>
      <button className={index < numberOfMedia-1 ? "" : "hidden"}>
        <ArrowRightCircle id="navigateRight" className="absolute right-0 top-[50%] transform -translate-y-1/2 translate-x-full" size={50} color="white"/>
      </button>
    </div>
  );
};