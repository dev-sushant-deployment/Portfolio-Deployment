import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  videoClassName?: string;
  className?: string;
}

export const VideoPlayer : React.FC<VideoPlayerProps> = ({src, videoClassName, className}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const handleMute = () => {
    if (videoRef.current) videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }
  useEffect(() => {
    const muteUnmute = document.getElementById("mute-unmute");
    muteUnmute?.addEventListener("click", handleMute);
    return () => {
      muteUnmute?.removeEventListener("click", handleMute);
    }
  }, [isMuted]);
  return (
    <div className={`${className} relative`}>
      <video className={videoClassName} src={src} autoPlay loop muted ref={videoRef}/>
      <button className="absolute bottom-1 right-1 bg-[#111111] text-white p-2 rounded-full">
        {isMuted ? <VolumeX id="mute-unmute" size={24} /> : <Volume2 id="mute-unmute" size={24} />}
      </button>
    </div>
  );
}